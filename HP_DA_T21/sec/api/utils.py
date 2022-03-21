import pandas as pd
from dotenv import load_dotenv
import os
import pymongo
from sklearn.linear_model import LinearRegression
from xml.etree import ElementTree as et
load_dotenv()
MONGODB_URI = os.environ['MONGODB_URI']
import numpy as np
import sys
import subprocess
headers={'user-agent':'Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36'}
try:
    import tensorflow as tf
except:
    subprocess.check_call([sys.executable, '-m','pip', 'install', 'tensorflow'])
    import tensorflow as tf

def xy_data(dataset):
    X_train=[]
    y_train=[]
    T = 5
    for t in range(len(dataset)-T):
        X_train.append(dataset[t:t+T])
        y_train.append(dataset[t+T])
    return X_train,y_train

def create_model(X_train,y_train):
    X_train = np.array(X_train).reshape(-1,5,1)
    y_train = np.array(y_train)
    # print(X_train.shape)
    model = tf.keras.Sequential()
    model.add(tf.keras.layers.LSTM(5))
    model.add(tf.keras.layers.Dense(1,activation = 'relu'))
    model.compile(loss='mse',optimizer = tf.keras.optimizers.Adam(learning_rate=0.05))
    callback = tf.keras.callbacks.EarlyStopping(monitor='val_loss',mode='min',patience=20,restore_best_weights=True)
    n = list(X_train.shape)[0]
    model.fit(X_train[int(0.2*n):],y_train[int(0.2*n):],epochs=200,validation_data=(X_train[:int(0.2*n)],y_train[:int(0.2*n)]),steps_per_epoch=5,callbacks=[callback])
    return model
    
def predict(model,X):
    pred = []
    for _ in range(12):
        # print(X[-5:])
        data = np.array(X[-5:]).reshape(1,5,1)
        # print(data.shape)
        p = float(model.predict(data))
        X.append(p)
        pred.append(p)
    return pred
    
def get_pred(Ticker,dataset):
    ind = list(dataset['Ticker']).index(Ticker) 
    X_train,y_train = xy_data(list(dataset.transpose()[ind])[1:])
    model = create_model(X_train,y_train)
    predict_year = predict(model,list(dataset.transpose()[ind])[1:])
    return predict_year

def get_dict(preds):
    y=2022
    m=4
    dates = {}
    for i in range(12):
        dates[f'{y}-{m}-01'] = preds[i]
        if m==12:
            m = 1
            y +=1
        else:
            m+=1
    return dates
    
def normalized(a, axis=-1, order=2):
    l2 = np.atleast_1d(np.linalg.norm(a, order, axis))
    l2[l2==0] = 1
    return a / np.expand_dims(l2, axis)

def fetchCompanyMetrics(cik,startDate,endDate):
    client = pymongo.MongoClient(MONGODB_URI)
    mydb = client['tech-meet']
    form_data = mydb['form-data']
    find_q = {
        "cik": int(cik),
        "$and": [
            {"date": {"$gte": startDate}},
            {"date": {"$lte": endDate}}
        ]
    }
    docs = form_data.find(find_q).sort('date',1)
    #To get common attribs
    sample_10q = form_data.find_one({"cik": cik, "form": "10-Q"}) 

    resdata = {}
    resdata['date'] = []
    for key in sample_10q['data'].keys():
        if key == 'units':
            continue
        resdata[key] = []
    for doc in docs:
        for key in resdata.keys():
            if key == 'date':
                continue
            try:
                resdata[key].append(doc['data'][key])
            except:
                resdata[key].append(None)
        resdata['date'].append(doc['date'])
    return resdata

def generateDF(cik,nval,startDate,endDate = "2024-01-01"):
    '''
    Generates a dataframe from the data fetched from the API
    '''
    metrics = fetchCompanyMetrics(cik,startDate,endDate)
    datdf = pd.DataFrame.from_dict(metrics)
    finaldict = {}
    for col in datdf.columns:
        if col == 'date':
            finaldict[col] = []
            for q in range(nval):
                try:
                    finaldict[col].append( str(int(datdf['date'].iloc[-4+q][:4])+1)+"-"+str(datdf['date'].iloc[-4+q][5:]) )
                    # print(finaldict[col])
                except:
                    print("Insufficient Values, cannot predict")
                    break
            continue
        init = [ x for x in datdf[col] if  not pd.isnull(x) ]
        datdf[col] = datdf[col].fillna(0)
        finaldict[col] = getMLR(init,int(len(init)/6),nval)
    outdf = pd.DataFrame.from_dict(finaldict)
    datdf = pd.concat([datdf,outdf],ignore_index=True)
    return datdf

def getMLR(series,inp_dim,out_length):
    features = []
    target = []
    for i in range(len(series) - inp_dim):
        features.append(series[i:i+inp_dim])
        target.append(series[i+inp_dim])
    features = np.array(features)
    target = np.array(target)

    model = LinearRegression()
    model.fit(features,target)

    out = []

    for _ in range(out_length):
        npout = model.predict( [ series[-inp_dim:] ] )
        out.append( np.abs(npout[0]) )
        series.append(out[-1])

    return out

#function to convert dataframes to json
#newfile is dataframe assuming column names are the keys
def convertToJson(newfile):  
    res=[]
    mapping=[]
    for r in newfile:
        mapping.append(r)
    for i in range(newfile.shape[0]):
        dic={}
        for keys in mapping:
            dic[keys]=newfile.iloc[i][keys]
        res.append(dic)
    return res