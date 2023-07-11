//import logo from './logo.svg';
import apps_logo from './apps_logo.png';
import './App.css';
import { useState } from "react";
import { Storage } from "@aws-amplify/storage";
import links from './links.json';

// Global link defaults
var defaultSnowflakeLink = links["snowflake"]
var defaultPreprocessingLink = links["preprocessing"]
var defaultStudioLink = links["studio"]
var defaultCanvasLink = links["canvas"]

// Header featuring the Apps Associates Logo 
function LogoHeader() {
  return (
    <header className="Logo-header">
        <img src={apps_logo} className="App-logo" alt="logo" />
    </header>
  )
}

// Sub-header featuring the website title and link to Apps website
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

// Left pane of the split-screened app body
// Displays links to Safety Stock ML pages and a "Configure Links" button, sending the user to the links config page
function AppBodyLinks({ onClick, snowflakeLink, preprocessingLink, studioLink, canvasLink}) {
  return (
    <body className="App-body links">
      <div className="flexbox">
        <button className="button back config" onClick={onClick}>
            Configure links
        </button>
        <h3>
          Important Links
        </h3>
      </div>
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

// Links configuration page, the flip side of the links page on the left pane of the split screen
function AppBodyConfig({ onClick, snowflakeLink, setSnowflakeLink, 
                                  preprocessingLink, setPreprocessingLink, 
                                  studioLink, setStudioLink, 
                                  canvasLink, setCanvasLink }) {
  
  // Set new links upon submission of input form
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // Get input data from JSON object
    const formJson = Object.fromEntries(formData.entries());

    // Set links to input in local storage
    localStorage.setItem("snowflake", formJson["Snowflake"])
    localStorage.setItem("preprocessing", formJson["Pre-Processing"])
    localStorage.setItem("studio", formJson["Studio"])
    localStorage.setItem("canvas", formJson["Canvas"])

    // Set links to input
    setSnowflakeLink(formJson["Snowflake"])
    setPreprocessingLink(formJson["Pre-Processing"])
    setStudioLink(formJson["Studio"])
    setCanvasLink(formJson["Canvas"])
  }
  
  // Reset links to global defaults
  // **NOTE** Must return to "Important Links" page with the "Back" button for changes to take effect
  function resetDefaults() {
    setSnowflakeLink(defaultSnowflakeLink)
    setPreprocessingLink(defaultPreprocessingLink)
    setStudioLink(defaultStudioLink)
    setCanvasLink(defaultCanvasLink)

    localStorage.setItem("snowflake", defaultSnowflakeLink)
    localStorage.setItem("preprocessing", defaultPreprocessingLink)
    localStorage.setItem("studio", defaultStudioLink)
    localStorage.setItem("canvas", defaultCanvasLink)
  }

  return (
    <body className="App-body links">
      <div className="flexbox Flex-config">
        <button className="button back config" onClick={onClick}>
            Back
        </button>
        <h3>
          Configure Links
        </h3>
      </div>
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

// Right pane of the split-screened app body
// Gives user the option to make use of Apps Associates Python DataGen or upload their own data
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

// The S3 flip-side of the right pane of the split screen
// Manages file submission, requiring a .csv or .xlsx file before allowing user to submit
// Submission is sent to the S3 bucket associated with the corresponding Apps Amplify project
function AppBodyS3( { onClick } ) {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // When file picked, set selected file and notify that file has been picked
  const handleFile = (event) => {
		setSelectedFile(event.target.files[0]);
    setIsFilePicked(true)
	};

  // On submission await upload to S3 bucket
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
      <div className="flexbox Flex-s3">
        <button className="button back" onClick={onClick}>
            Back
        </button>
        <h3>
          S3 Bucket Upload
        </h3>
      </div>
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

// The DataGen flip-side of the right pane of the split screen
// Not currently in use (as of 7/10/2023)
function AppBodyDatagen( { onClick } ) {
  return (
    <body className="App-body data">
      <div className="flexbox Flex-datagen">
        <button className="button datagen back" onClick={onClick}>
            Back
        </button>
        <h3>
          This is DataGen
        </h3>
      </div>
    </body>
  )
}

// Main file sets up link state variables, and state variables to handle what pages to display
// Puts together the pages of the app 
function App() {
  const [s3, setS3] = useState(false);
  const [datagen, setDatagen] = useState(false);
  const [config, setConfig] = useState(false);

  const [snowflakeLink, setSnowflakeLink] = useState(localStorage.getItem("snowflake"))
  const [preprocessingLink, setPreprocessingLink] = useState(localStorage.getItem("preprocessing"))
  const [studioLink, setStudioLink] = useState(localStorage.getItem("studio"))
  const [canvasLink, setCanvasLink] = useState(localStorage.getItem("preprocessing"))

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


