from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import json
from pathlib import Path

app = FastAPI()

# السماح لـ React بالاتصال بالـ Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# تحديد مسار المشروع
BASE_DIR = Path(__file__).resolve().parent.parent

# تحميل الموديل
model = joblib.load(BASE_DIR / "model" / "house_price.pkl")

# تحميل الأماكن
with open(BASE_DIR / "model" / "locations.json", "r") as f:
    locations = json.load(f)


# بيانات الإدخال
class HouseData(BaseModel):
    carpet_area_sqft: float
    floor_num: int
    bathroom: int
    balcony: int
    location: str
    furnishing: str
    transaction: str
    ownership: str
    facing: str


@app.get("/")
def home():
    return {"message": "House Price Prediction API is Running"}


@app.get("/locations")
def get_locations():
    return {"locations": locations}


@app.post("/predict")
def predict(data: HouseData):
    try:
        input_df = pd.DataFrame([{
            "carpet_area_sqft": data.carpet_area_sqft,
            "floor_num": data.floor_num,
            "Bathroom": data.bathroom,
            "Balcony": data.balcony,
            "location": data.location,
            "Furnishing": data.furnishing,
            "Transaction": data.transaction,
            "Ownership": data.ownership,
            "facing": data.facing,
        }])

        prediction = model.predict(input_df)[0]

        return {
            "predicted_price": round(float(prediction), 2)
        }

    except Exception as e:
        return {
            "error": str(e)
        }