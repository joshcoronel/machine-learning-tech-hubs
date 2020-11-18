import pandas as pd
import numpy as np
import pickle

model = pickle.load(open('models/model.pickle', 'rb'))

df = pd.read_csv("https://techhubml.s3.amazonaws.com/Master.csv", encoding="ISO-8859-1", converters={'zipcode': lambda x: str(x)})
zipcode = df.loc[df['zipcode'] == "94025"].values[0]
final_features = np.delete(zipcode,[0])
# print(final_features)

prediction = model.predict([final_features])

print(prediction)