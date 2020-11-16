Welcome to our App!
===================

[Tech Hub Website](https://tech-hub-wars.herokuapp.com/)
--------------------------------------------------------

 

Project Proposal
----------------

Our team set out to identify the factors that contribute to the success of
existing tech cities in the United States with the long-term goal of finding the
next emerging tech hub. In tackling this project, we analyzed the following
well-known tech hubs:

-   San Francisco, California

-   Chicago, Illonois

-   New York City, New York

-   Austin, Texas

-   Atlanta Georgia

We selected the following features to analyze:

-   [Census report
    API](https://github.com/censusreporter/census-api/blob/master/API.md) (Age,
    education, ethnic group, median salary) 

-   [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm) (Real estate
    data)

-   FBI (criminal activity)

 

Gathering data
--------------

Our objective was to find usable data from the data sources listed above and
make readable in a JSON format to work with our JavaScript visualization
libraries. Our approach starts with identify the level of detail for location
(city, neighborhood, zip codes, etc.) that is consistent across our data
sources. Web APIs will then be used to pull data for NYC regions to feed into an
unsupervised learning model.

 

Data Manipulation
-----------------

PySpark is used to manipulate the data into setting each of the rows to a region
and the columns into the features identified above.

 

Machine Learnings
-----------------

Unsupervised k-mean machine learning

1.  Create clusters (5-15) of NYC data to define the parameters of a tech hub.
    This will serve as a training set

2.  Create a new column to identify the location as a tech hub or not

Supervised logistic regression machine learning:

1.  Split NYC data into training and testing sets

2.  Train a logistical regression model based on outputs defined from our
    unsupervised machine learning model.

3.  Use this model to predict which locations across the US are tech hubs

4.  Export trained logistical training model?

 

Data Loading
------------

From here, all the data was loaded in an AWS database.

 

Data Visualization
------------------

### Leaflet.js Map

#### Choropleth Layer

The geojson for each neighborhood was merged with a data frame. This data was
used to plot a choropleth overlay on Leaflet.

1.  Predicted tech hubs (indicated by color on the map)

2.  Toggle/dropdown to map data for each machine learning feature with a color
    spectrum (Age, education, ethnicity, salary, real estate)

 

#### Interactions

-   Clusters

-   Markers

-   Drop down

-   Toggle Later

 
