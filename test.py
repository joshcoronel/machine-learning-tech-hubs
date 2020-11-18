import pandas as pd

df = pd.read_csv("https://techhubml.s3.amazonaws.com/Master.csv", encoding="ISO-8859-1", converters={'zipcode': lambda x: str(x)})
# features = df.loc[df['zipcode'] == "590"].values[0]

print("94025" in list(df["zipcode"]))