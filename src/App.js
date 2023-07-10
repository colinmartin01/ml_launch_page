//import logo from './logo.svg';
import apps_logo from './apps_logo.png';
import './App.css';
import { useState } from "react";
import { Storage } from "@aws-amplify/storage";

var defSnowflakeLink = "https://appsassc.us-east-1.snowflakecomputing.com/console/login#/?returnUrl=internal%2Fworksheet"
var defPreprocessingLink = "https://us-west-2.console.aws.amazon.com/sagemaker/home?region=us-west-2#/landing"
var defStudioLink = "https://d-n44eyyqq6wfk.studio.us-west-2.sagemaker.aws/jupyter/default/"
var defCanvasLink = "https://d-n44eyyqq6wfk.studio.us-west-2.sagemaker.aws/canvas/default/models"

function LogoHeader() {
  return (
    <header className="Logo-header">
        <img src={apps_logo} className="App-logo" alt="logo" />
    </header>
  )
}

function AppHeader() {
  return (
    <header className="App-body header">
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

function AppBodyLinks({ onClick, snowflakeLink, preprocessingLink, studioLink, canvasLink}) {
  return (
    <body className="App-body links">
      <h3>
        <button className="button back config" onClick={onClick}>
          Configure links
        </button>
        Important Links
      </h3>
      <a
        className="App-link"
        href={snowflakeLink}
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
        href={preprocessingLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Pre-Processing
      </a>
      <a
        className="App-link"
        href={studioLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Studio
      </a>
      <a
        className="App-link"
        href={canvasLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        Canvas
      </a>
    </body>
  )
}

function AppBodyConfig({ onClick, snowflakeLink, setSnowflakeLink, 
                                  preprocessingLink, setPreprocessingLink, 
                                  studioLink, setStudioLink, 
                                  canvasLink, setCanvasLink }) {
  
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    setSnowflakeLink(formJson["Snowflake"])
    setPreprocessingLink(formJson["Pre-Processing"])
    setStudioLink(formJson["Studio"])
    setCanvasLink(formJson["Canvas"])
  }
  
  function resetDefaults() {
    setSnowflakeLink(defSnowflakeLink)
    setPreprocessingLink(defPreprocessingLink)
    setStudioLink(defStudioLink)
    setCanvasLink(defCanvasLink)
  }

  return (
    <body className="App-body links">
      <h3>
        <button className="button back config" onClick={onClick}>
          Back
        </button>
        Configure Links
      </h3>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Snowflake Console: <input name="Snowflake" type="text" size="50" defaultValue={snowflakeLink}></input>
        </label>
        <p>
          SageMaker
        </p>
        <div>
          <label>
            Pre-Processing: <input name="Pre-Processing" type="text" size="50" defaultValue={preprocessingLink}></input>
          </label>
        </div>
        <div>
          <label>
            Studio: <input name="Studio" type="text" size="50" defaultValue={studioLink}></input>
          </label>
        </div>
        <div>
          <label>
            Canvas: <input name="Canvas" type="text" size="50" defaultValue={canvasLink}></input>
          </label>
        </div>
        <p>
          <button className="button config" type="submit">Save Changes</button>
          <button className="button config" type="button" onClick={resetDefaults}>Reset Defaults</button>
        </p>
      </form>
    </body>
  )
}

function AppBodyData({ s3OnClick, datagenOnClick }) {
  return (
    <body className="App-body data">
      <h3>
        Enter Your Data or Request Python DataGen
      </h3>
      <div className="splitScreen">
        <div className="topPane">
          <button className="button" onClick={s3OnClick}>
            Upload your data
          </button>
        </div>
        <div className="bottomPane">
          <button className="button datagen" onClick={datagenOnClick}>
            Use Apps Associates Python DataGen
          </button>
        </div>
      </div>
    </body>
  )
}

function AppBodyS3( { onClick } ) {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFile = (event) => {
		setSelectedFile(event.target.files[0]);
    setIsFilePicked(true)
	};

  async function handleSubmit(e) {
    try {
      await Storage.put(selectedFile.name, selectedFile, {
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        }
      })
      setIsSubmitted(true)
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <body className="App-body data">
      <h3>
        <button className="button back" onClick={onClick}>
        Back
        </button>
        S3 Bucket Upload
      </h3>
      <input className="button" type="file" name="file" onChange={handleFile} />
      {isFilePicked ? (
        selectedFile.name.split('.').pop() == "csv" || selectedFile.name.split('.').pop() == "xlsx" ? (
          <div>
            <p className="fileInfo">Filename: {selectedFile.name}</p>
            <p className="fileInfo">Filetype: {selectedFile.type}</p>
            <p className="fileInfo">Size in bytes: {selectedFile.size}</p>
            <p className="fileInfo">
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
            <button className="button" onClick={handleSubmit}>Submit</button>
          </div>
        ) : (
          <p>Error: incorrect file type, please submit a .xlsx or .csv file</p>
        )
			) : isSubmitted ? (
				<p>Data upload success!</p>
			) : (
        <p>Select a csv or excel file for upload to SageMaker</p>
      )}
    </body>
  )
}

function AppBodyDatagen( { onClick } ) {
  return (
    <body className="App-body data">
      <h3>
        <button className="button datagen back" onClick={onClick}>
          Back
        </button>
        This is DataGen
      </h3>
    </body>
  )
}

function App() {
  const [s3, setS3] = useState(false);
  const [datagen, setDatagen] = useState(false);
  const [config, setConfig] = useState(false);
  const [snowflakeLink, setSnowflakeLink] = 
        useState("https://appsassc.us-east-1.snowflakecomputing.com/console/login#/?returnUrl=internal%2Fworksheet")
  const [preprocessingLink, setPreprocessingLink] = 
        useState("https://us-west-2.console.aws.amazon.com/sagemaker/home?region=us-west-2#/landing")
  const [studioLink, setStudioLink] = 
        useState("https://d-n44eyyqq6wfk.studio.us-west-2.sagemaker.aws/jupyter/default/")
  const [canvasLink, setCanvasLink] = 
        useState("https://d-n44eyyqq6wfk.studio.us-west-2.sagemaker.aws/canvas/default/models")

  function handleS3() {
    setS3(current => !current)
  }
  
  function handleDatagen() {
    setDatagen(current => !current)
  }

  function handleConfig() {
    setConfig(current => !current)
  }

  return (
    <div className="App">

      <LogoHeader />

      <AppHeader />

      <div className="splitScreen">

        <div className="topPane">
          {config ? (
            <AppBodyConfig onClick={handleConfig} 
                           snowflakeLink={snowflakeLink} setSnowflakeLink={setSnowflakeLink} 
                           preprocessingLink={preprocessingLink} setPreprocessingLink={setPreprocessingLink}
                           studioLink={studioLink} setStudioLink={setStudioLink}
                           canvasLink={canvasLink} setCanvasLink={setCanvasLink}/>
          ) : (
            <AppBodyLinks onClick={handleConfig} 
                          snowflakeLink={snowflakeLink} 
                          preprocessingLink={preprocessingLink}
                          studioLink={studioLink} 
                          canvasLink={canvasLink} />
          )}
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


