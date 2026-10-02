```python
from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Load trained model
model = joblib.load("model/churn_model.pkl")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    input_data = pd.DataFrame([data])

    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0][1]

    if prediction == 1:
        result = "Customer will churn"
    else:
        result = "Customer will not churn"

    # Feature importance
    feature_names = model.named_steps["preprocessor"].get_feature_names_out()
    importances = model.named_steps["classifier"].feature_importances_

    top_features = sorted(
        zip(feature_names, importances),
        key=lambda x: x[1],
        reverse=True
    )[:5]

    return jsonify({
        "prediction": int(prediction),
        "churn_probability": round(float(probability), 2),
        "result": result,
        "feature_importance": [
            {
                "feature": feature.replace("cat__", "").replace("num__", ""),
                "importance": round(float(importance), 3)
            }
            for feature, importance in top_features
        ]
    })


if __name__ == "__main__":
    app.run(debug=True)

