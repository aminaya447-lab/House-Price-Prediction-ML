# House-Price-Prediction
Machine Learning House Price Prediction Project
# House Price Prediction

A machine learning web application for predicting house prices using FastAPI (Backend) and React (Frontend).

## Project Structure

```
House-Price-Prediction-ML/
│── backend/
│── frontend/
│── model/
│── notebook/
```

## Requirements

- Python 3.14
- Node.js
- Git LFS

## Clone the Project

```bash
git clone https://github.com/aminaya447-lab/House-Price-Prediction-ML.git
cd House-Price-Prediction-ML

git lfs install
git lfs pull
```

## Backend

```bash
cd backend
pip install fastapi uvicorn joblib pandas scikit-learn
uvicorn app:app --reload
```

The backend will run at:

```
http://127.0.0.1:8000
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

## Features

- Predict house prices using a trained Random Forest model.
- REST API built with FastAPI.
- React user interface.
- Machine learning model stored using Git LFS.
