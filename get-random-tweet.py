import firebase_admin
from firebase_admin import credentials, db
import os
import random
import json

def main(request):
    dir_path = os.path.abspath(os.path.dirname(__file__))
    if (not len(firebase_admin._apps)):
        cred = credentials.Certificate(dir_path + "/firebase-cred.json")
        firebase_admin.initialize_app(cred, {
                'databaseURL': 'https://hive-258ce.firebaseio.com/'
        })
    tweet_path = 'Tweets-Real'
    ref = db.reference()
    tweets = ref.child(tweet_path).get(shallow=True)
    random_tweet_name = random.choice(list(tweets.keys()))
    tweet = ref.child(tweet_path + '/' + random_tweet_name).get()
    return json.dumps(tweet)

if __name__ == '__main__':
    main()
