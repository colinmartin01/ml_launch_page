
// Left pane of the split-screened app body
// Displays links to Safety Stock ML pages and a "Configure Links" button, sending the user to the links config page

export default function Links({ toggleConfig, hideLinks, snowflakeLink, preprocessingLink, studioLink, canvasLink }) {
    return (
      <body className="App-body links">
        <p>
        </p>
        <div>
          <button className="button config G-button" onClick={hideLinks}>
                Hide Links
          </button>
        </div>
        <div className="flexbox">
          <button className="button back config" onClick={toggleConfig}>
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
        <div className="flexbox Flex-links">
          <p className="">
            SageMaker
          </p>
          <div className="SageMaker-links">
            <a
              className="App-link"
              href={preprocessingLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pre-Processing
            </a>
          </div>
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
        </div>
      </body>
    )
  }