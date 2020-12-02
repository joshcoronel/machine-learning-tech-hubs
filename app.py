# We import Flask
from flask import Flask, request, render_template, jsonify
import json
from pymongo import MongoClient
from connections import readMongoCloud
import pickle
import pandas as pd
import numpy as np
from dotenv import load_dotenv
import os 

# Set env vars
load_dotenv()

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

    zipcode = [str(x) for x in request.form.values()]


    ## Code to call all the feature values for the requested zip code
    df = pd.read_csv("https://techhubml.s3.amazonaws.com/Master.csv", encoding="ISO-8859-1", converters={'zipcode': lambda x: str(x)})

    if zipcode[0] in list(df["zipcode"]):
        features = df.loc[df['zipcode'] == zipcode[0]].values[0]
        city = features[2]
        state = features[1]
        final_features = np.delete(features,[0,1,2,3])

        prediction = model.predict([final_features])

        if prediction == '1':
            output = "Yes"
        else:
            output = "No"

        results = [f"Move your next start up here? {output}!", f"{city}, {state} {zipcode[0]}", f"Average Real Estate: ${final_features[0]}",f"Income per capita: ${final_features[1]}",f"Percentage of Population with Bachelors: {round(100*final_features[4],2)}%", f"Percentage of population that use public transportation: {round(100*final_features[5],2)}%", f"Median Age Female: {final_features[2]}", f"Median Age Male: {final_features[3]}"] 
    else:
        results = ["Invalid zip code. Try again."]

    return render_template('ML.html', prediction_text = results)

@app.route('/ML')
def ML():
    # We hardcode some information to be returned
    return render_template('ML.html')

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
    db_df = readMongoCloud("bls","tech_jobs")
    return jsonify(db_df.to_dict('records'))

# Get setup so that if we call the app directly (and it isn't being imported elsewhere)
# it will then run the app with the debug mode as True
# More info - https://docs.python.org/3/library/__main__.html
if __name__ == '__main__':
    app.run(debug=True)