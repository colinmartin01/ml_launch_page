//import logo from './logo.svg';
import apps_logo from './apps_logo.png';
import './App.css';
import {useState} from "react";

function LogoHeader() {
  return (
    <header className="Logo-header">
        <img src={apps_logo} className="App-logo" alt="logo" />
    </header>
  )
}

function AppHeader() {
  return (
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
  )
}

function AppBodyLinks() {
  return (
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
  )
}

function AppBodyData({ s3OnClick, datagenOnClick }) {
  return (
    <body className="App-body-data">
      <p>
        Enter Your Data or Request Python DataGen
      </p>
      <div className="splitScreen">
        <div className="topPane">
          <button onClick={s3OnClick}>
            Upload your data
          </button>
        </div>
        <div className="bottomPane">
          <button onClick={datagenOnClick}>
            Use Apps Associates Python DataGen
          </button>
        </div>
      </div>
    </body>
  )
}

function AppBodyS3( {onClick} ) {
  return (
    <body className="App-body-data">
      <p>
        This is S3
      </p>
      <button onClick={onClick}>
        Back
      </button>
    </body>
  )
}

function AppBodyDatagen( {onClick} ) {
  return (
    <body className="App-body-data">
      <p>
        This is DataGen
      </p>
      <button onClick={onClick}>
        Back
      </button>
    </body>
  )
}

function App() {
  const [s3, setS3] = useState(false);
  const [datagen, setDatagen] = useState(false);

  function handleS3() {
    setS3(current => !current)
  }
  
  function handleDatagen() {
    setDatagen(current => !current)
  }

  return (
    <div className="App">

      <LogoHeader />

      <AppHeader />

      <div className="splitScreen">

        <div className="topPane">
          <AppBodyLinks />
        </div>

        <div className="bottomPane">
          {s3 ? (
            <AppBodyS3 onClick={handleS3}/>
          ) : datagen ? (
            <AppBodyDatagen onClick={handleDatagen}/>
          ) : (
            <AppBodyData s3OnClick={handleS3} datagenOnClick={handleDatagen}/>
          )}
        </div>

      </div>

    </div>
  );
}

export default App;


