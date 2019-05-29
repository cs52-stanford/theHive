import tweepy
from tweepy import OAuthHandler
import copy
import firebase_admin
from firebase_admin import credentials, db
import random
import re
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

def main(request):
    credentials_arr = read_credentials(request) # returns array of dicts, each dict represents one login
    apis = get_apis(request, credentials_arr) # returns array of api objects

    ref = db.reference()
    makeQueries(request, apis, ref)

def limit_handled(request, cursor, index):
    while True:
        try:
            yield cursor.next()
        except tweepy.TweepError:
            print("Limit reached on api " + index)
            continue
        except StopIteration:
            break

def runQuery(request, index, api, ref, added):
    for tweet in limit_handled(request, tweepy.Cursor(api.search, q=random.choice(queries), lang="en", geocode="39.8,-95.583068847656,2500km", tweet_mode='extended').items(), index):
        tweet_ref = ref.child('Tweets-Real')

        # ignores retweets
        if (hasattr(tweet, 'retweeted_status')):
            continue

        text = tweet.full_text
        new_tweet = tweet_ref.push()

        if (text, tweet.user.name) not in added:
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
            else:
                tweetLong = None
                tweetLat = None

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

        added.append((text, tweet.user.name))

def makeQueries(request, apis, ref):
    added = []
    for index, api in enumerate(apis):
        runQuery(request, index, api, ref, added)

def get_apis(request, credentials_arr):
    apis = []
    for dict in credentials_arr:
        auth = OAuthHandler(dict['consumer_key'], dict['consumer_secret'])
        auth.set_access_token(dict['access_token'], dict['access_token_secret'])
        apis.append(tweepy.API(auth))
    return apis

def read_credentials(request):
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
    if (not len(firebase_admin._apps)):
        cred = credentials.Certificate("firebase-cred.json")
        firebase_admin.initialize_app(cred, {
                'databaseURL': 'https://hive-258ce.firebaseio.com/'
        })
    return credentials_arr
