import pickle
import os

with open("model/model.pkl", "rb") as f:
    model = pickle.load(f)

def predict_client_risk(features: dict) -> bool:
    # Ex: {"nb_invoices": 10, "avg_late_days": 4, ...}
    input_data = [[
        features["nb_invoices"],
        features["avg_late_days"],
        features["on_time_ratio"],
        features["country_code"]
    ]]
    return model.predict(input_data)[0]  # 0 ou 1
