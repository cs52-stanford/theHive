import numpy as np
import pandas as pd
import csv
from concurrent.futures import ThreadPoolExecutor
import threading
import tweepy
from tweepy import OAuthHandler
import json
import pyrebase
import copy
import datetime
import firebase_admin
from firebase_admin import credentials, db
import re
import os
import psutil
import ast
import numpy as np
import geocoder




kRequests = 450 #450 searches per 15/mins limit
queries = ['#refugee', '#immigrants','#withrefugees', 'USA for UNHCR',
            '@UNRefugeeAgency', '@UNHCRUSA','@Refugees', '#RefugeesWelcome',
            '#home', '#unhcr','#refugees','#immigrants','#war','#israel',
            '#migrants','#refugee','#muslim','#rohingyarefugees','#countries',
            '#rohingya','#asylumseekers','#million', '#illegals','#country',
            '#turkey','#seekers','#american','#helping','#years','#year',
            '#asylum', '#lebanon','#syria','#syrianrefugees','#europe',
            'Assimilation', 'Assisted', 'Voluntary', 'Return', 'Border',
            'management','Brain drain', 'Brain gain', 'Capacity building',
            'Circular migration', 'Country of origin', 'Emigration',
            'Facilitated migration', 'Forced migration', 'Freedom of movement',
            'Immigration', 'Internally displaced person','Naturalization',
            'International minimum standards','Irregular migration',
            'Labour migration', 'Migration', 'Migration management',
            'Orderly migration', 'Push-pull factors', 'Receiving country',
            'Repatriation','Remittances', 'Resettlement', 'Smuggling',
            'Stateless person', 'Technical cooperation', 'Trafficking in persons',
            'Xenophobia', 'Alien', 'Illegal Immigrant', 'Illegals', 'Undocumented',
            'Caravan', 'UNHCR', 'UN', 'Refugees', 'ICE', 'deportation',
            'border wall', 'illegal border crossing']

mapAPIKey = ""

def main():
    process = psutil.Process(os.getpid())
    credentials_arr = read_credentials() # returns array of dicts, each dict represents one login
    apis = get_apis(credentials_arr) # returns array of api objects

    mapFile = open('mapAPI.txt', 'r')
    for line in mapFile:
        mapAPIKey = line.rstrip()
    mapFile.close()

    csvOutput = open('saved-tweets.csv', 'a')
    csvWriter = csv.writer(csvOutput)

    ref = db.reference()
    makeQueries(apis, ref)

def toJSON(self):
    return json.dumps(self, default=lambda o: o.__dict__,
        sort_keys=True, indent=4)

def limit_handled(cursor, index):
    while True:
        try:
            yield cursor.next()
        except tweepy.TweepError:
            print("Limit reached on api " + index)
            continue
        except StopIteration:
            break

def runQuery(index, api, ref):
    print("Task executed on thread " + str(index))
    # print("Rate limit status for api " + str(index) + ": " + api.rate_limit_status())
    for tweet in limit_handled(tweepy.Cursor(api.search, q="#refugee", lang="en", geocode="39.8,-95.583068847656,2500km", tweet_mode='extended').items(), index):
        # print (tweet.created_at, tweet.text, tweet.user.location)
        # csvWriter.writerow([tweet.created_at, tweet.text.encode('utf-8')])

        tweet_ref = ref.child('Tweet-NoRT')

        # ignores retweets
        if (hasattr(tweet, 'retweeted_status')):
            continue
        else:
            text = tweet.full_text

        new_tweet = tweet_ref.push()

        # gets coordinates from tweet, or users location
        if (tweet.place != None):
            tweetCoords = tweet.place.bounding_box.coordinates
            tweetLong = (tweetCoords[0][0][0] + tweetCoords[0][1][0] + tweetCoords[0][2][0] + tweetCoords[0][3][0])/4
            tweetLat = (tweetCoords[0][0][1] + tweetCoords[0][1][1] + tweetCoords[0][2][1] + tweetCoords[0][3][1])/4
        elif (tweet.user.location != None):
            # converts user location from string to coordinates
            coords = geocoder.arcgis(tweet.user.location)
            if(coords != None):
                tweetLong = coords.latlng[0]
                tweetLat = coords.latlng[1]
            else:
                tweetLong = None
                tweetLat = None

            print(tweet.user.location, tweetLong, tweetLat)
        else:
            tweetLong = None
            tweetLat = None


        text = tweet.full_text
        
        # obtains URL of tweet
        if(re.search("(?P<url>https?://[^\s]+)", text)):
            url = re.search("(?P<url>https?://[^\s]+)", text).group("url")
        else:
            url = None


        new_tweet.set({
            'Date': str(tweet.created_at),
            'Tweet': text, #text
            'Tweet longitude': tweetLong,
            'Tweet latitude': tweetLat,
            'User location': tweet.user.location, #where the user is based, not where they tweeted from
            'Retweets': tweet.retweet_count,
            'Liked': tweet.favorite_count,
            'User': tweet.user.name,
            'Handle': tweet.user.screen_name,
            'Followers': tweet.user.followers_count,
            'Total Tweets by user': tweet.user.statuses_count,
            'Tweet URL': url,
        })
    print("Task finished on thread " + str(index))

def makeQueries(apis, ref):
    for index, api in enumerate(apis):
        print("Api " + str(index) + " started")
        runQuery(index, api, ref)
        print("Api " + str(index) + " finished")

def get_apis(credentials):
    apis = []
    for dict in credentials:
        auth = OAuthHandler(dict['consumer_key'], dict['consumer_secret'])
        auth.set_access_token(dict['access_token'], dict['access_token_secret'])
        apis.append(tweepy.API(auth))
    return apis

#
def read_credentials():
    # Twitter API setup
    keyFile = open('credentials.txt', 'r')
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
    cred = credentials.Certificate("firebase-cred.json")
    firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://hive-258ce.firebaseio.com/'
    })
    return credentials_arr

if __name__ == '__main__':
    main()
