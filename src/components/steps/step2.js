export default function Analysis({ goBack, goForward }) {
    return (
    <body className="App-body data">
        <div className="flexbox Flex-s3">
            <button className="button back" onClick={goBack}>
                Back To Step 1
            </button>
            <h3>
                Exploratory data analysis
            </h3>
        </div>
    </body>
    )
  }