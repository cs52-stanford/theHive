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

def main():
    process = psutil.Process(os.getpid())
    credentials_arr = read_credentials() # returns array of dicts, each dict represents one login
    apis = get_apis(credentials_arr) # returns array of api objects

    csvOutput = open('saved-tweets.csv', 'a')
    csvWriter = csv.writer(csvOutput)

    # ref = db.reference()
    # makeQueries(apis, ref)
    retrieveData()
    print(process.memory_info().rss)

def retrieveData():
    ref = db.reference('Tweet-More')
    # tweets = ast.literal_eval(ref.get())
    # array = [np.array(tweet) for tweet in tweets["tweet"]]
    result = ref.get()
    arr = np.array(list(result.items()))
    print(arr)




def limit_handled(cursor, index):
    while True:
        try:
            yield cursor.next()
        except tweepy.RateLimitError:
            print("Limit reached on api " + index)
            continue
        except StopIteration:
            break

def runQuery(index, api, ref):
    print("Task executed on thread " + str(index))
    # print("Rate limit status for api " + str(index) + ": " + api.rate_limit_status())
    for tweet in limit_handled(tweepy.Cursor(api.search, q="#refugee", lang="en", geocode="39.8,-95.583068847656,2500km", tweet_mode="extended").items(), index):
        # print (tweet.created_at, tweet.text, tweet.user.location)
        # csvWriter.writerow([tweet.created_at, tweet.text.encode('utf-8')])
        tweet_ref = ref.child('Tweet-More')
        new_tweet = tweet_ref.push()
        # if (tweet.place):
        #     tweetCountry = tweet.place.country
        #     print(tweetCountry)
        if (tweet.retweeted):
            print(str(tweet.retweeted_status))
        # print(tweet.full_text)
        new_tweet.set({
            'Date': str(tweet.created_at),
            'Tweet': str(tweet.full_text),
            'User location': tweet.user.location, #where the user is based, not where they tweeted from
            #'Tweet coordinates': tweet.place.coordinates,
            # 'Country': tweet.place.country,
            'Retweets': tweet.retweet_count,
            'Replies': tweet.reply_count,
            'Liked': tweet.favorite_count,
            'User': tweet.user.name,
            'Handle': tweet.user.screen_name,
            'Followers': tweet.user.followers_count,
            'Total Tweets by user': tweet.user.statuses_count,
            # 'Tweet URL': re.search("(?P<url>https?://[^\s]+)", tweet.text).group("url"),
            # 'Tweets Per Day by User': tweet.user.statuses_count / (datetime.utcnow() - datetime(tweet.user.created_at)).days()
        })
    print("Task finished on thread " + str(index))

def makeQueries(apis, ref):
    # print("Starting threads...")
    # executor = ThreadPoolExecutor(max_workers = len(apis))
    for index, api in enumerate(apis):
        # print("Rate limit status for api " + str(index) + ": " + str(api.rate_limit_status()))
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
