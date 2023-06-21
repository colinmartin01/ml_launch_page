//import logo from './logo.svg';
import apps_logo from './apps_logo.png';
import './App.css';
import useState from "react";


function App() {

  return (
    <div className="App">

      <header className="Logo-header">
        <img src={apps_logo} className="App-logo" alt="logo" />
      </header>
      <header className="App-header">
        <h1>
          Machine Learning Safety Stock Model
        </h1>
        <a
          className="App-link"
          href="https://www.appsassociates.com/leadership-team/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our Website
        </a>
      </header>

      <div className="splitScreen">

        <div className="topPane">
          <body className="App-body-links">
            <p>
              Important Links
            </p>
            <a
              className="App-link"
              href="https://appsassc.us-east-1.snowflakecomputing.com/console/login#/?returnUrl=internal%2Fworksheet"
              target="_blank"
              rel="noopener noreferrer"
            >
              Snowflake Console
            </a>
            <p>
              SageMaker
            </p>
            <a
              className="App-link"
              href="https://aws.amazon.com/pm/sagemaker/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pre-Processing
            </a>
            <a
              className="App-link"
              href="https://aws.amazon.com/pm/sagemaker/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Studio
            </a>
            <a
              className="App-link"
              href="https://aws.amazon.com/pm/sagemaker/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Canvas
            </a>
          </body>
        </div>

        <div className="bottomPane">
          <body className="App-body-s3">
            <p>
              Enter Your Data or Request Python DataGen
            </p>
            <div className="splitScreen">
              <div className="topPane">
                <button>
                  Upload your data
                </button>
              </div>
              <div className="bottomPane">
                <button>
                  Use Apps Associates Python DataGen
                </button>
              </div>
            </div>
          </body>
        </div>

      </div>

    </div>
  );
}

export default App;


