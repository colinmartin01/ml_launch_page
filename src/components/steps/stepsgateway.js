export default function StepsGateway({ onClick }) {
    return (
      <div className="App-body data gateway">
        <h2>
          5 Steps To Generate Actionable Safety Stock Data
        </h2>
        <body>
          <p>
            1. Upload your data as a csv file in the proper format
          </p>
          <p>
            2. Exploratory data analysis led by our data science engineers
          </p>
          <p>
            3. Data cleaning with SageMaker Data Wrangler
          </p>
          <p>
            4. Training and testing the model to maximize predictive power
          </p>
          <p>
            5. Apply the model and get results
          </p>
        </body>
        <button className="button G-button" onClick={onClick}>Proceed to ML Steps</button>
      </div>
    )
  }