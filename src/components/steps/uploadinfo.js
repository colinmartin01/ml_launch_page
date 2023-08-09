
// Right pane of the split-screened app body
// Gives user the option to make use of Apps Associates Python DataGen or upload their own data

export default function UploadInfo({ s3OnClick, datagenOnClick }) {
    return (
      <body className="App-body data">
        <h3>
          Step 1: Upload your data
        </h3>
        <p>
          Upon upload, your data will be sent to a secure AWS S3 bucket,
        </p>
        <p>
          then moved to our Snowflake cloud database where it can be accessed from SageMaker
        </p>
        <p>
        </p>
        <button className="button" onClick={s3OnClick}>
          Upload data
        </button>
      </body>
    )
  }

// Python DataGen version of the site
/*
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
*/