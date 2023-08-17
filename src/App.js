//import logo from './logo.svg';
import './App.css';
import { useState } from "react";

import DataGen from "./components/steps/datagen.js";

import LogoHeader from "./components/logoheader.js";
import TitleHeader from "./components/titleheader.js";

import Welcome from "./components/welcome.js";
import StepsGateway from "./components/steps/stepsgateway.js";
import LinksGateway from "./components/links/linksgateway.js";

import Links from "./components/links/links.js";
import LinksConfig from "./components/links/links-config.js";
import UploadInfo from "./components/steps/uploadinfo.js";
import Step1 from "./components/steps/step1.js";
import Step2 from "./components/steps/step2.js";

// Main file sets up link state variables, and state variables to handle what pages to display
// Puts together the pages of the app 
function App() {
  const [datagen, setDatagen] = useState(false);

  const [config, setConfig] = useState(false);
  const [steps, setSteps] = useState(false);
  const [links, setLinks] = useState(false);
  const [welcome, setWelcome] = useState(true);

  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const [snowflakeLink, setSnowflakeLink] = useState(localStorage.getItem("snowflake"))
  const [preprocessingLink, setPreprocessingLink] = useState(localStorage.getItem("preprocessing"))
  const [studioLink, setStudioLink] = useState(localStorage.getItem("studio"))
  const [canvasLink, setCanvasLink] = useState(localStorage.getItem("preprocessing"))
  
  function handleDatagen() {
    setDatagen(current => !current)
  }

  function toggleWelcome() {
    setWelcome(current => !current)
  }
  function toggleStepsGateway() {
    setSteps(current => !current)
  }
  function toggleLinksGateway() {
    setLinks(current => !current)
  }

  function toggleConfig() {
    setConfig(current => !current)
  }

  function toggleStep1() {
    setStep1(current => !current)
  }
  function toggleStep2() {
    setStep1(current => !current)
    setStep2(current => !current)
  }
  function toggleStep3() {
    setStep2(current => !current)
    setStep3(current => !current)
  }

  return (
    <div className="App">

      <LogoHeader />

      { welcome ? (
        <Welcome onClick={toggleWelcome}/>
      ) : (
        <div>

          <TitleHeader />

          {steps ? (
            step1 ? (
            <Step1 goBack={toggleStep1} goForward={toggleStep2}/>
            ) : step2 ? (
              <Step2 goBack={toggleStep2} goForward={toggleStep3}/>
            ) : (
              <UploadInfo
               s3OnClick={toggleStep1} datagenOnClick={handleDatagen}/>
            )) : (
              <StepsGateway onClick={toggleStepsGateway}/>
          )}

          {links ? (
            config ? (
            <LinksConfig onClick={toggleConfig} 
                        snowflakeLink={snowflakeLink} setSnowflakeLink={setSnowflakeLink} 
                        preprocessingLink={preprocessingLink} setPreprocessingLink={setPreprocessingLink}
                        studioLink={studioLink} setStudioLink={setStudioLink}
                        canvasLink={canvasLink} setCanvasLink={setCanvasLink}/>
            ) : (
              <Links toggleConfig={toggleConfig} 
                        hideLinks={toggleLinksGateway}
                        snowflakeLink={snowflakeLink} 
                        preprocessingLink={preprocessingLink}
                        studioLink={studioLink} 
                        canvasLink={canvasLink} />
            )) : (
              <LinksGateway onClick={toggleLinksGateway}/>
          )}

        </div>
      )}

    </div>
  );
}

export default App;


// ML Steps with DataGen
/*
{steps ? (
  step1 ? (
  <DataS3 goBack={toggleStep1} moveForward={toggleStep2}/>
  ) : datagen ? (
    <DataGen onClick={handleDatagen}/>
  ) : (
    <BodyData
     s3OnClick={toggleStep1} datagenOnClick={handleDatagen}/>
  )) : (
    <StepsGateway onClick={toggleStepsGateway}/>
)}
*/

// The Original Split Screen
/*
<div className="splitScreen">
    
  <div className="topPane">
    {toConfig ? (
      config ? (
      <BodyConfig onClick={handleConfig} 
                  snowflakeLink={snowflakeLink} setSnowflakeLink={setSnowflakeLink} 
                  preprocessingLink={preprocessingLink} setPreprocessingLink={setPreprocessingLink}
                  studioLink={studioLink} setStudioLink={setStudioLink}
                  canvasLink={canvasLink} setCanvasLink={setCanvasLink}/>
    ) : (
      <BodyLinks onClick={handleConfig} 
                snowflakeLink={snowflakeLink} 
                preprocessingLink={preprocessingLink}
                studioLink={studioLink} 
                canvasLink={canvasLink} />
    )) : (
      <ConfigGateway onClick={toggleConfigGateway}/>
    )}
  </div>

  <div className="bottomPane">
    {mlSteps ? (
      s3 ? (
      <DataS3 onClick={handleS3}/>
    ) : datagen ? (
      <DataGen onClick={handleDatagen}/>
    ) : (
      <BodyData s3OnClick={handleS3} datagenOnClick={handleDatagen}/>
    )) : (
      <MLGateway onClick={toggleMlGateway}/>
    )
    }
  </div>
</div>
*/

