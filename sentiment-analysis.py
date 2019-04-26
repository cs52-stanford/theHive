import numpy as np
import csv
import tweepy
from tweepy import OAuthHandler
import pyrebase
import copy

import firebase_admin
from firebase_admin import credentials, db

kRequests = 450 #450 searches per 15/mins limit

def main():
    credentials_arr = read_credentials() # returns array of dicts, each dict represents one login
    apis = get_apis(credentials_arr) # returns array of api objects

    csvOutput = open('saved-tweets.csv', 'a')
    csvWriter = csv.writer(csvOutput)

    ref = db.reference()
    for api in apis:
        for tweet in tweepy.Cursor(api.search, q="#refugee", count=10, lang="en", geocode="39.8,-95.583068847656,2500km").items():
            print (tweet.created_at, tweet.text, tweet.user.location)
            csvWriter.writerow([tweet.created_at, tweet.text.encode('utf-8')])
            tweet_ref = ref.child('Tweets')
            new_tweet = tweet_ref.push()
            new_tweet.set({
                'Date:': str(tweet.created_at),
                'Tweet': tweet.text,
                'Location': tweet.user.location,
            })

def get_apis(credentials):
    apis = []
    for dict in credentials:
        auth = OAuthHandler(dict['consumer_key'], dict['consumer_secret'])
        auth.set_access_token(dict['access_token'], dict['access_token_secret'])
        apis.append(tweepy.API(auth))
    return apis

def read_credentials():
    # Twitter API setup
    keyFile = open('/Users/jkhunt/github/theHive/credentials.txt', 'r')
    credentials_arr = []
    titles = ['consumer_key', 'consumer_secret', 'access_token', 'access_token_secret']
    creds_dict = {}
    for index, line in enumerate(keyFile):
        creds_dict[titles[index % 4]] = line.rstrip()
        if index % 4 == 3:
            credentials_arr.append(copy.copy(creds_dict))
            creds_dict.clear()
    keyFile.close()

    # Firebase setup
    cred = credentials.Certificate("/Users/jkhunt/github/theHive/firebase-cred.json")
    firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://hive-258ce.firebaseio.com/'
    })
    return credentials_arr

class MyStreamListener(tweepy.StreamListener):

    def on_status(self, data):
        all_data = json.loads(data)
        tweet = all_data["text"]
        username = all_data["user"]["screen_name"]
        print(data.text)

    def on_error(self, status_code):
        if status_code == 420:
            #returning False in on_data disconnects the stream
            return False

if __name__ == '__main__':
    main()
