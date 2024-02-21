import React, { useEffect, useState } from "react";
import "./ConsentForm.css";
import { createPortal } from "react-dom";
const ConsentForm = ({lang,getTranslation}) => {
  const [consented, setConsented] = useState(false);
  const mountElement = document.getElementById("consent-form");
  useEffect(()=>{
    if(localStorage.getItem("consent")==='false'||localStorage.getItem("consent")==null){
      setConsented(false);
    }
    else{
      setConsented(true)
    }
  })
  const handleConsent = () => {
    setConsented((prev)=>{
    localStorage.setItem("consent", JSON.stringify(!prev));
    return !prev;
    });
    
  };

      
  const handleDecline = () => {
    localStorage.setItem("consent", JSON.stringify(consented));
    if (window.history.back.length <= 1) {
      window.location.href = "https://google.com";
    }
    else{
        window.history.back();
    }
  };
localStorage.getItem('consent');
  return (
    <>
      {consented===false? createPortal(
        <div className="consent-modal">
          <div className="consent-form">
            <h2>{getTranslation(lang,'dataCollectionHeader')}</h2>
            <div className="content">
              <div className="left">
                <p>
                 {getTranslation(lang,'consentFormDescription')}
                </p>
              </div>

              <div className="consent-form-btn-group right">
                <button onClick={handleConsent}>{getTranslation(lang,'consent')}</button>
                <button onClick={handleDecline}>{getTranslation(lang,'notConsent')}</button>
              </div>
            </div>
          </div>
        </div>,
        mountElement
      ):""}
    </>
  );
};

export default ConsentForm;
