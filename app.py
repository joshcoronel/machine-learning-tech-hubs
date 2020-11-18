# We import Flask
from flask import Flask, request, render_template, jsonify
import json
from pymongo import MongoClient
from connections import readMongoCloud
import pickle
import pandas as pd
import numpy as np
import os 

port = int(os.environ.get('PORT', 5000)) 
#app.run(host='0.0.0.0', port=port)

# We create a Flask app and deserialize the machine learning model 
app = Flask(__name__)
model = pickle.load(open('models/model.pickle', 'rb'))

# We establish a Flask route so that we can serve HTTP traffic on that route 
@app.route('/')
def home():
    # We hardcode some information to be returned
    return render_template('index.html')

# App route to run our machine learning predictions
@app.route('/predict',methods=['POST'])
def predict():

    zipcode = request.form.values()

    ## Code to call all the feature values for the requested zip code
    df = pd.read_csv("https://techhubml.s3.amazonaws.com/Master.csv", encoding="ISO-8859-1", converters={'zipcode': lambda x: str(x)})
    zipcode = df.loc[df['zipcode'] == zipcode].values[0]
    final_features = np.delete(zipcode,[0])

    prediction = model.predict(final_features)

    if prediction == 1:
        output = "Yes"
    else:
        output = "No"

    return render_template('ML.html', prediction_text = 'Tech Hub Status: ${}'.format())

@app.route('/map')
def map():
    # We hardcode some information to be returned
    return render_template('map.html')

@app.route('/team')
def team():
    # We hardcode some information to be returned
    return render_template('team.html')

@app.route('/blog')
def blog():
    # We hardcode some information to be returned
    return render_template('blog.html')
	
@app.route('/techjobs')
def jobs():
    # We hardcode some information to be returned
    return render_template('jobs.html')

@app.route("/readData")
def read():
    # Replace arguments with the name of your database and collection on mongodb
    db_df = readMongoCloud("techjobs","techjobs")
    return jsonify(db_df.to_dict('records'))

# Get setup so that if we call the app directly (and it isn't being imported elsewhere)
# it will then run the app with the debug mode as True
# More info - https://docs.python.org/3/library/__main__.html
if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='0.0.0.0', port=port)
