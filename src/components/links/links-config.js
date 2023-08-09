
// Links configuration page, the flip side of the links page on the left pane of the split screen

import links from '../../links.json';

// Global link defaults
var defaultSnowflakeLink = links["snowflake"]
var defaultPreprocessingLink = links["preprocessing"]
var defaultStudioLink = links["studio"]
var defaultCanvasLink = links["canvas"]

export default function Config({ onClick, snowflakeLink, setSnowflakeLink, 
    preprocessingLink, setPreprocessingLink, 
    studioLink, setStudioLink, 
    canvasLink, setCanvasLink }) {

    // Set new links upon submission of input form
    function handleSubmit(e) {

        // Prevent the browser from reloading the page
        e.preventDefault();
        
        // Read the form datas
        const form = e.target;
        const formData = new FormData(form);
        
        // Get input data from JSON object
        const formJson = Object.fromEntries(formData.entries());
        
        // Set local storage to user input
        localStorage.setItem("snowflake", formJson["Snowflake"])
        localStorage.setItem("preprocessing", formJson["Pre-Processing"])
        localStorage.setItem("studio", formJson["Studio"])
        localStorage.setItem("canvas", formJson["Canvas"])
        
        // Set links to user input
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