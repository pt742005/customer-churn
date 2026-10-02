import pandas as pd
import joblib

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    roc_auc_score
)

# Load dataset
df = pd.read_csv("data/WA_Fn-UseC_-Telco-Customer-Churn.csv")

# Cleaning
df["TotalCharges"] = pd.to_numeric(
    df["TotalCharges"],
    errors="coerce"
)

df["Churn"] = df["Churn"].map({
    "No": 0,
    "Yes": 1
})


# Remove customer ID
df = df.drop("customerID", axis=1)


# X and y
X = df.drop("Churn", axis=1)
y = df["Churn"]


# Numerical and categorical columns
numerical = X.select_dtypes(
    include=["int64", "float64"]
).columns

categorical = X.select_dtypes(
    include=["str", "object"]
).columns


# Preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ("num", "passthrough", numerical),
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical
        )
    ]
)


# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# Random Forest
rf = RandomForestClassifier(
    random_state=42
)


# Pipeline
pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", rf)
])


# Parameters for GridSearch
param_grid = {
    "classifier__n_estimators": [100, 200],
    "classifier__max_depth": [None, 10, 20],
    "classifier__min_samples_split": [2, 5],
    "classifier__min_samples_leaf": [1, 2]
}


# GridSearchCV
grid_search = GridSearchCV(
    pipeline,
    param_grid,
    cv=5,
    scoring="f1",
    n_jobs=-1,
    verbose=1
)


# Training
grid_search.fit(X_train, y_train)


# Best parameters
print("\nBest Parameters:")
print(grid_search.best_params_)


# Best CV score
print("\nBest CV F1 Score:")
print(grid_search.best_score_)


# Prediction on test data
y_pred = grid_search.predict(X_test)


# Test accuracy
print("\nTest Accuracy:")
print(accuracy_score(y_test, y_pred))


# Classification report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))


# Save best model
joblib.dump(
    grid_search.best_estimator_,
    "model/churn_model.pkl"
)

print("\nBest model saved successfully!")
# Prediction
y_pred = grid_search.predict(X_test)

# Probability of churn
y_prob = grid_search.predict_proba(X_test)[:, 1]

# Accuracy
print("\nTest Accuracy:")
print(accuracy_score(y_test, y_pred))

# Classification Report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Confusion Matrix
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# ROC-AUC
print("\nROC-AUC Score:")
print(roc_auc_score(y_test, y_prob))
y_prob = grid_search.predict_proba(X_test)[:, 1]