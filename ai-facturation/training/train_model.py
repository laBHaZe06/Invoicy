import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pickle

# Charger un CSV ou lire via DB
df = pd.read_csv("client_behavior.csv")

X = df[["nb_invoices", "avg_late_days", "on_time_ratio", "country_code"]]
X["country_code"] = X["country_code"].astype("category").cat.codes  # encode pays
y = df["will_pay_late"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestClassifier()
model.fit(X_train, y_train)

with open("../model/model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Modèle entraîné et sauvegardé.")
