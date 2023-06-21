//import logo from './logo.svg';
import apps_logo from './apps_logo.png';
import './App.css';

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

      <body className="App-body">
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
  );
}

export default App;
