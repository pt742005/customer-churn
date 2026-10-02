import { useState } from "react"
import "./App.css"

function App() {
  const [formData, setFormData] = useState({
    gender: "Male",
    SeniorCitizen: 0,
    Partner: "Yes",
    Dependents: "No",
    tenure: 12,
    PhoneService: "Yes",
    MultipleLines: "No",
    InternetService: "DSL",
    OnlineSecurity: "No",
    OnlineBackup: "Yes",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "No",
    StreamingMovies: "No",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 50.5,
    TotalCharges: 600
  })

  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      ...formData,
      SeniorCitizen: Number(formData.SeniorCitizen),
      tenure: Number(formData.tenure),
      MonthlyCharges: Number(formData.MonthlyCharges),
      TotalCharges: Number(formData.TotalCharges)
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const prediction = await response.json()

     setResult({
  result: prediction.result,
  probability: prediction.churn_probability,
  featureImportance: prediction.feature_importance
})
    } catch (error) {
      console.error(error)
      alert("Backend se connection nahi ho pa raha.")
    }
  }

  return (
    <div className="container">

      <div className="title">
        <h1>Customer Churn Prediction</h1>
        <p>
          Predict whether a customer is likely to leave the service
        </p>
      </div>

      <div className="form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="field">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="field">
              <label>Senior Citizen</label>
              <select
                name="SeniorCitizen"
                value={formData.SeniorCitizen}
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="field">
              <label>Partner</label>
              <select
                name="Partner"
                value={formData.Partner}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="field">
              <label>Dependents</label>
              <select
                name="Dependents"
                value={formData.Dependents}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="field">
              <label>Tenure (Months)</label>
              <input
                type="number"
                name="tenure"
                value={formData.tenure}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="field">
              <label>Phone Service</label>
              <select
                name="PhoneService"
                value={formData.PhoneService}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="field">
              <label>Multiple Lines</label>
              <select
                name="MultipleLines"
                value={formData.MultipleLines}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
                <option>No phone service</option>
              </select>
            </div>

            <div className="field">
              <label>Internet Service</label>
              <select
                name="InternetService"
                value={formData.InternetService}
                onChange={handleChange}
              >
                <option>DSL</option>
                <option>Fiber optic</option>
                <option>No</option>
              </select>
            </div>

            <div className="field">
              <label>Online Security</label>
              <select
                name="OnlineSecurity"
                value={formData.OnlineSecurity}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
                <option>No internet service</option>
              </select>
            </div>

            <div className="field">
              <label>Online Backup</label>
              <select
                name="OnlineBackup"
                value={formData.OnlineBackup}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
                <option>No internet service</option>
              </select>
            </div>

            <div className="field">
              <label>Device Protection</label>
              <select
                name="DeviceProtection"
                value={formData.DeviceProtection}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
                <option>No internet service</option>
              </select>
            </div>

            <div className="field">
              <label>Tech Support</label>
              <select
                name="TechSupport"
                value={formData.TechSupport}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
                <option>No internet service</option>
              </select>
            </div>

            <div className="field">
              <label>Streaming TV</label>
              <select
                name="StreamingTV"
                value={formData.StreamingTV}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
                <option>No internet service</option>
              </select>
            </div>

            <div className="field">
              <label>Streaming Movies</label>
              <select
                name="StreamingMovies"
                value={formData.StreamingMovies}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
                <option>No internet service</option>
              </select>
            </div>

            <div className="field">
              <label>Contract</label>
              <select
                name="Contract"
                value={formData.Contract}
                onChange={handleChange}
              >
                <option>Month-to-month</option>
                <option>One year</option>
                <option>Two year</option>
              </select>
            </div>

            <div className="field">
              <label>Paperless Billing</label>
              <select
                name="PaperlessBilling"
                value={formData.PaperlessBilling}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="field">
              <label>Payment Method</label>
              <select
                name="PaymentMethod"
                value={formData.PaymentMethod}
                onChange={handleChange}
              >
                <option>Electronic check</option>
                <option>Mailed check</option>
                <option>Bank transfer (automatic)</option>
                <option>Credit card (automatic)</option>
              </select>
            </div>

            <div className="field">
              <label>Monthly Charges</label>
              <input
                type="number"
                step="0.01"
                name="MonthlyCharges"
                value={formData.MonthlyCharges}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Total Charges</label>
              <input
                type="number"
                step="0.01"
                name="TotalCharges"
                value={formData.TotalCharges}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            className="predict-button"
            type="submit"
          >
            Predict Churn
          </button>

        </form>

        {result && (
          <div className="result">

            <h2>{result.result}</h2>

            <p>Churn Probability</p>

            <div className="probability">
              {(result.probability * 100).toFixed(1)}%
            </div>

            <div className="progress">

              <div
                className="progress-bar"
                style={{
                  width: (result.probability * 100) + "%"
                }}
              ></div>

            </div>

          </div>
        )}

      </div>

    </div>
  )
}

export default App