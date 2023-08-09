
// The S3 flip-side of the right pane of the split screen
// Manages file submission, requiring a .csv or .xlsx file before allowing user to submit
// Submission is sent to the S3 bucket associated with the corresponding Apps Amplify project

import { useState } from "react";
import { Storage } from "@aws-amplify/storage";
import axios from "axios";

export default function UploadData( { goBack, goForward } ) {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSnowLoaded, setIsSnowLoaded] = useState(false);
    const [snowFailed, setSnowFailed] = useState(false);
  
    // When file picked, set selected file and notify that file has been picked
    const handleFile = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true)
    };

    // Post filename to Flask server to launch sql scripts for S3 to Snowflake transfer
    function makePostRequest(path, fileName) {
        axios.post(path, fileName).then(
            (response) => {
                let result = response.data;
                console.log(result);
                setIsSnowLoaded(true);
            },
            (error) => {
                console.log(error);
                setSnowFailed(true);
            }
        );
    }

    // On submission await upload to S3 bucket
    async function handleSubmit(e) {
      try {
        // Delete all current items in bucket
        // Warning: Will cause no file upload if trying to upload file that already exists in bucket
        /*
        Storage.list('')
          .then((response) => {
            response.results.forEach(obj => {
              Storage.remove(obj.key)
          })
        });
        */
        await Storage.put(selectedFile.name, selectedFile, {
          progressCallback(progress) {
            console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
          }
        })
        setIsSubmitted(true)
        setIsFilePicked(false)
        try {
            makePostRequest('https://flask-service.er3jrrh823v96.us-east-1.cs.amazonlightsail.com/', { 'name': selectedFile.name });
        }
        catch (error) {
            console.log("Error posting to Python: ", error);
        }
      } catch (error) {
        console.log("Error uploading file: ", error);
      }
    }

    // If file is picked, check if file has the correct extension (csv or xlsx)
    // If not, error message "incorrect file type"
    // If yes, display file info and submit button
    // If file is not picked check if it is submitted
    // If not, display upload prompt
    // If yes, submission must have been successful, display upload success message
    return (
      <body className="App-body data">
        <div className="flexbox Flex-s3">
          <button className="button back" onClick={goBack}>
              Back
          </button>
          <h3>
            S3 Bucket to Snowflake Cloud Upload
          </h3>
        </div>
        <input className="button" type="file" name="file" onChange={handleFile} />
        { isFilePicked ? (
          selectedFile.name.split('.').pop() == "csv" ? (
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
            <p>Error: incorrect file type, please submit a .csv file</p>
          )
              ) : isSubmitted ? (
                isSnowLoaded ? (
                  <div>
                    <p>Data loaded to Snowflake success!</p>
                    <button className="button" onClick={goForward}>Move to Step 2</button>
                  </div>
                ) : snowFailed ? (
                  <div>
                    <p>Error: upload to Snowflake failed, please try again</p>
                  </div>
                ) : (
                  <div>
                    <p>Data upload to S3 success!</p>
                  </div>
                )
              ) : (
          <div>
            <h4>Select a csv file for upload to Snowflake</h4>
            <p>The selected file must have the correct number of columns,</p>
            <p>in the correct order, with the correct names</p>
          </div>
        ) }
      </body>
    )
  }