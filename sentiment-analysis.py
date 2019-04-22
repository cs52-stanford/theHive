import numpy as np
import json
import sys
import urllib
import os
import twitter
import tweepy
from tweepy import OAuthHandler



def main():
    url = urllib.request("http://search.twitter.com/search.json?q="+"refugee")
    data = json.load(url)
    print (len(data), "tweets")

    for tweet in data["results"]:
        print (tweet["text"])

if __name__ == '__main__':
    main()
