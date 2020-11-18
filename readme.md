Welcome to our App!
===================

[Tech Hub Website](https://tech-hub-predictor.herokuapp.com/)
--------------------------------------------------------

 

Project Outline
----------------

Our group set out to develop a machine learning model that can predict whether a zip code is a tech hub or not. 

Data Sources
----------------

-   [Census report
    API](https://github.com/censusreporter/census-api/blob/master/API.md) (Age,
    education, ethnic group, median salary) 

-   [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm) (Real estate
    data)


Gathering data
--------------

Our objective was to find usable data from the data sources listed above and
make readable in a JSON format to work with our JavaScript visualization
libraries. Our approach starts with identify the level of detail for location
(city, neighborhood, zip codes, etc.) that is consistent across our data
sources. Web APIs will then be used to pull data for NYC regions to feed into an
unsupervised learning model.

 

Data Wrangling
-----------------

Used Pandas for ETL. Cleaned the data, and gathered the specific features that we wanted. Merged the census and zillow dataframes, using zip code as our key. 

 

Machine Learning
-----------------

Unsupervised k-mean machine learning

1.  Created five clusters, using the elbow method, to define the parameters of a tech hub.
    This served as our training set.

2.  Analyzed each cluster to determine which cluster we would use to determine tech hub   viability.

3.  Created a new column to identify the zip codes as a tech hub or not.

Supervised logistic regression machine learning:

1.  Split data into training and testing sets.

2.  Trained a logistical regression model based on outputs defined from our
    unsupervised machine learning model.

3.  Used this model to predict which locations across the US are tech hubs

4.  Exported trained logistical model through pickle in order to run our model through flask application

 

Data Loading
------------

From here, all the data was loaded in an AWS database by creating an S3 bucket. This allows for our data to be stored remotely, which allows for anybody to run our model without needing to download all the data locally. 

Then, using a provided API which we used on our Flask app 



Flask Application 
------------


Depolyment 
------------

Once the website was running as intended, we depoloyed our application through Heroku 
