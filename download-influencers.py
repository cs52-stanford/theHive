import numpy as np
import pandas as pd
import json
import copy
import datetime
import firebase_admin
import math
from firebase_admin import credentials, db


def main():
    cred = credentials.Certificate("firebase-cred.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://hive-258ce.firebaseio.com/'
    })

    retrieveData()

def retrieveData():
    ref = db.reference('/Influencers/')
    result = ref.get()
    data = pd.DataFrame(columns=['Followers', 'Handle','Influencer-Score', 'Latitude', 'Longitude','Total Tweets by user', 'Tweet', 'User', 'User location'])
    for i,key in enumerate(result.keys()):
        data.loc[i] = (result[key]['Followers'] if 'Followers' in result[key] else np.NaN,
        result[key]['Handle'] if 'Handle' in result[key] else np.NaN,
        result[key]['Influencer-Score'] if 'Influencer-Score' in result[key] else np.NaN,
        result[key]['Latitude'] if 'Latitude' in result[key] else np.NaN,
        result[key]['Longitude'] if 'Longitude' in result[key] else np.NaN,
        result[key]['Total Tweets by user'] if 'Total Tweets by user' in result[key] else np.NaN,
        result[key]['Tweet'] if 'Tweet' in result[key] else np.NaN,
        result[key]['User'] if 'User' in result[key] else np.NaN,
        result[key]['User location'] if 'User location' in result[key] else np.NaN)
    data = data.assign(Tier= data.apply(tier, axis=1))
    print(data)
    data.to_csv(path_or_buf = 'influencers.csv', sep = ',')


    # df['Influencer-Tier'] = np.select(conditions, choices, default='Micro')



def tier(row):
    if row['Followers'] >= 2000000:
        return "Star"
    elif row['Followers'] >= 500000:
        return "Macro"
    elif row['Followers'] >= 100000:
        return "Mid"
    else:
        return "Micro"


if __name__ == '__main__':
    main()
