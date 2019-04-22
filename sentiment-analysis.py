import numpy as np
import csv
import tweepy
from tweepy import OAuthHandler

kRequests = 450 #450 searches per 15/mins limit

def main():
    credentials = read_credentials()
    auth = OAuthHandler(credentials['consumer_key'], credentials['consumer_secret'])
    auth.set_access_token(credentials['access_token'], credentials['access_token_secret'])
    api = tweepy.API(auth)

    # user = api.me()
    # print('Name: ' + user.name)
    # print('Location: ' + user.location)
    # print('Friends: ' + str(user.friends_count))

    # myStreamListener = MyStreamListener()
    # myStream = tweepy.Stream(auth = api.auth, listener= MyStreamListener())
    # myStream.filter(track=['refugee'])

    csvOutput = open('saved-tweets.csv', 'a')
    csvWriter = csv.writer(csvOutput)

    for tweet in tweepy.Cursor(api.search, q="#refugee", count=10, lang="en", geocode="39.8,-95.583068847656,2500km").items():
        print (tweet.created_at, tweet.text)
        csvWriter.writerow([tweet.created_at, tweet.text.encode('utf-8')])
        print(tweet.place)

    # url = urllib.request("http://search.twitter.com/search.json?q="+"refugee")
    # data = json.load(url)
    # print (len(data), "tweets")
    #
    # for tweet in data["results"]:
    #     print (tweet["text"])

def read_credentials():
    keyFile = open('credentials.txt', 'r')
    credentials = {}
    credentials['consumer_key'] = keyFile.readline().rstrip()
    credentials['consumer_secret'] = keyFile.readline().rstrip()
    credentials['access_token'] = keyFile.readline().rstrip()
    credentials['access_token_secret'] = keyFile.readline().rstrip()
    return credentials

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
