import requests
import pandas as pd

def create_url(base_url, tables, geo):
    return f"{base_url}?get={tables}&for={geo}"

HOST = "https://api.census.gov/data"
year = "2018"
dataset = "acs/acs5"
base_url = "/".join([HOST, year, dataset])
tables = {"B19301_001E":"Income per capita",
            "B01002_002E":"Median Age Male",
            "B01002_003E":"Median Age Female",
            "B15003_022E":"Bachelor's degree > 25", 
            "B15003_001E":"Total Education",# Will need to divide by total pop >25 B15003_001E
            "B25077_001E":"Median Home Value",
            "B08301_010E":"Public transportation",
            "B08301_001E":"Total transportation"} # Will need to divide by total B08301_001E

table_str = ",".join(tables.keys())
geo = "zip%20code%20tabulation%20area:*"

url = create_url(base_url,table_str,geo)

r = requests.get(url)

# Create a list of human-readable text
col_names = list(tables.values())
col_names.append("Zip Code")

df = pd.DataFrame(columns = col_names, data = r.json()[1:])

# Set zip code to index
df.set_index("Zip Code",inplace=True)

# Convert columns to a numeric data types
df = df.apply(pd.to_numeric,errors="coerce")

# Convert education and transportation to a percentage of the population
df["Bachelor's degree > 25"] = df["Bachelor's degree > 25"]/df["Total Education"]
df["Public transportation"] = df["Public transportation"]/df["Total transportation"]
df.drop(["Total Education","Total transportation"],axis=1, inplace=True)
print(df.head())