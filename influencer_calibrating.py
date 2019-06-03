import numpy as np
import firebase_admin
from firebase_admin import credentials, db
import datetime
import pandas as pd

def main():
    # save_data()
    read_data()

def read_data():
    data = pd.read_csv('influencer_testing')
    log_tweet_count = np.log(data['Total Tweets by user'].astype('float'))
    data['Influencer-Score'] = (data['Followers'] * (data['Retweets']+1) * log_tweet_count * (data['Liked']+1)) / 10**9
    influencers = data.loc[data['Influencer-Score'] >= 1]
    sorted_influencers = influencers.sort_values(by=['Influencer-Score'], ascending=False)
    print(sorted_influencers[['User', 'Handle', 'Influencer-Score', 'Followers', 'Retweets', 'Liked', 'Total Tweets by user']])

def save_data():
    cred = credentials.Certificate("firebase-cred.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://hive-258ce.firebaseio.com/'
    })

    ref_tweets = db.reference('/Tweets-Folder/' + str(datetime.date.today()) + '/')
    result = ref_tweets.get()
    data = pd.DataFrame(columns=['Date', 'Tweet', 'Tweet latitude', 'Tweet longitude', 'User', 'User location', 'Retweets', 'Replies', 'Liked', 'Handle', 'Followers', 'Total Tweets by user'])
    for i,key in enumerate(result.keys()):
        data.loc[i] = (result[key]['Date'] if 'Date' in result[key] else np.NaN,
        result[key]['Tweet'] if 'Tweet' in result[key] else np.NaN,
        result[key]['Tweet latitude'] if 'Tweet latitude' in result[key] else np.NaN,
        result[key]['Tweet longitude'] if 'Tweet longitude' in result[key] else np.NaN,
        result[key]['User'] if 'User' in result[key] else np.NaN,
        result[key]['User location'] if 'User location' in result[key] else np.NaN,
        result[key]['Retweets'] if 'Retweets' in result[key] else np.NaN,
        result[key]['Replies'] if 'Replies' in result[key] else np.NaN,
        result[key]['Liked'] if 'Liked' in result[key] else np.NaN,
        result[key]['Handle'] if 'Handle' in result[key] else np.NaN,
        result[key]['Followers'] if 'Followers' in result[key] else np.NaN,
        result[key]['Total Tweets by user'] if 'Total Tweets by user' in result[key] else np.NaN)
    data.fillna(0)
    data.to_csv('influencer_testing')

if __name__ == '__main__':
    main()
