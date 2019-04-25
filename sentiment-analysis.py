import numpy as np
import csv
import tweepy
from tweepy import OAuthHandler
import pyrebase

import firebase_admin
from firebase_admin import credentials, db




kRequests = 450 #450 searches per 15/mins limit

def main():
    creds = read_credentials()
    auth = OAuthHandler(creds['consumer_key'], creds['consumer_secret'])
    auth.set_access_token(creds['access_token'], creds['access_token_secret'])
    api = tweepy.API(auth)

    csvOutput = open('saved-tweets.csv', 'a')
    csvWriter = csv.writer(csvOutput)

    ref = db.reference()
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

def read_credentials():
    # Twitter API setup
    keyFile = open('credentials.txt', 'r')
    creds = {}
    creds['consumer_key'] = keyFile.readline().rstrip()
    creds['consumer_secret'] = keyFile.readline().rstrip()
    creds['access_token'] = keyFile.readline().rstrip()
    creds['access_token_secret'] = keyFile.readline().rstrip()

    # firebase setup
    cred = credentials.Certificate("firebase-cred.json")
    firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://hive-258ce.firebaseio.com/'
    })
    return creds

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
