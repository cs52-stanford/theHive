# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
import json
import os


# In[2]:

print ('done')
path_to_jsons = './'
json_files = [pos_json for pos_json in os.listdir(path_to_jsons) if pos_json.endswith('refugee_twitter.ldjson')]
jsons = []
for js in json_files:
    with open(os.path.join(path_to_jsons, js)) as json_file:
        # do something with your json; I'll just print
        for line in json_file:
            jsons.append(json.loads(line))
print ('done')

# In[3]:


def flattenDict(d, result=None):
    '''
    Creates pandas dataframe from nested dictionary
    '''
    if result is None:
        result = {}
    for key in d:
        value = d[key]
        if isinstance(value, dict):
            value1 = {}
            for keyIn in value:
                value1[".".join([key,keyIn])]=value[keyIn]
            flattenDict(value1, result)
        elif isinstance(value, (list, tuple)):
            for indexB, element in enumerate(value):
                if isinstance(element, dict):
                    value1 = {}
                    for keyIn in element:
                        newkey = ".".join([key,keyIn])
                        value1[".".join([key,keyIn])]=value[indexB][keyIn]
                    for keyA in value1:
                        flattenDict(value1, result)
        else:
            result[key]=value
    return result

print ('done')
# In[ ]:


tweetdf = pd.DataFrame([flattenDict(tweet) for tweet in jsons])

print ('completed')
# In[ ]:


tweetdf.to_csv('tweetdf.csv',index=False)

print ('csv-ed')
