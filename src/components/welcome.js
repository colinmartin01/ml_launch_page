export default function Welcome({ onClick }) {
    return (
      <div>
        <div className="App-body welcome">
          <div className="Welcome-title">
            <h1>
                Welcome to the Apps Associates
            </h1>
            <h2>
              Machine Learning Safety Stock Prediction Tool
            </h2>
          </div>
        </div>
        <div className="Welcome-text">
          <p>
            Constructed in AWS SageMaker by top data scientists, our model is flexible, powerful and easy to use
          </p>
          <p>
            In just 5 steps your organization can take full advantage of the operational benefits of ML-powered forecasting
          </p>
          <button className="button G-button" onClick={onClick}>Get started</button>
        </div>
      </div>
    )
  }