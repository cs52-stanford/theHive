import firebase_admin
from firebase_admin import credentials, db
import json
import copy

def main(request):
    if (not len(firebase_admin._apps)):
        cred = credentials.Certificate("firebase-cred.json")
        firebase_admin.initialize_app(cred, {
                'databaseURL': 'https://hive-258ce.firebaseio.com/'
        })

    k = 200
    ref_influencers = db.reference('/Influencers')
    influencers = ref_influencers.order_by_child('Influencer-Score').limit_to_last(k)
    arr = influencers.get() # complete dictionary
    sorted_keys = list(arr.keys())[::-1]

    output_keys = ['star', 'macro', 'mid', 'micro']
    scores = [2000000, 500000, 100000, 1000]
    output = {'star': {}, 'macro': {}, 'mid': {}, 'micro': {}}

    for user in sorted_keys:
        user_dict = copy.copy(arr[user])
        for i in range(len(scores)):
            if user_dict['Followers'] >= scores[i]:
                output[output_keys[i]][user] = user_dict
                break

    return json.dumps(output)

if __name__ == '__main__':
    main()
