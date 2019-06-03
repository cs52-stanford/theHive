import firebase_admin
from firebase_admin import credentials, db
import json

def main(request):
    cred = credentials.Certificate("firebase-cred.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://hive-258ce.firebaseio.com/'
    })

    k = 100
    ref_influencers = db.reference('/Influencers')
    influencers = ref_influencers.order_by_child('Influencer-Score').limit_to_last(k)
    arr = influencers.get() # complete dictionary
    sorted_keys = list(arr.keys())[::-1]

    n = int(k / 4)
    split_keys = [sorted_keys[i:i + n] for i in range(0, len(sorted_keys), n)]

    output = {}
    output_keys = ['star', 'macro', 'mid', 'micro']
    for index, keys in enumerate(split_keys):
        output[output_keys[index]] = {}
        for user in keys:
            output[output_keys[index]][user] = arr[user]

    return json.dumps(output)

if __name__ == '__main__':
    main()
