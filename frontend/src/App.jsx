import { useEffect, useState, useRef } from "react";
import Description from "./components/Description/Description";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Video from "./components/Video";
import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import translations from "./translations";
function App() {
  const [showVid, setShowVid] = useState(true);
  const [alreadyParticipated, setAlreadyParticipated] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [lang, setLang] = useState("fr");
  const formRef = useRef();
  // const languages = [
  //   { code: "fr", name: "Francais" },
  //   { code: "deu", name: "Deutsch" },
  // ];
  useEffect(() => {
    if (window.location.href.includes("/lang=deu")) {
      setLang("deu");
    } else {
      setLang("fr");
    }
    const getParticipant = async () => {
      const ipResponse = await axios.get("https://api64.ipify.org?format=json");
      const ipAddress = ipResponse.data.ip;
      //console.log(ipAddress);
      // Generate device fingerprint using FingerprintJS library
      const fp = await FingerprintJS.load();
      const result = await fp.get();

      // Extract a unique identifier for the device
      const deviceFingerprint = result.visitorId;
      //console.log(deviceFingerprint);
      // Include IP address and device fingerprint in the request body
      const requestData = {
        ip_address: ipAddress,
        device_fingerprint: deviceFingerprint,
      };
      const participant = await axios.get(
        "http://localhost/radiocontact/backend/get.php",
        {
          params: requestData,
        }
      );
      console.log(participant.data);
      setAlreadyParticipated(participant.data.participated);
    };

    getParticipant();
  }, []);
  useEffect(() => {
    if (videoEnded && formRef.current) {
      formRef.current.scrollIntoView();
    }
  }, [videoEnded]);
  const getTranslation = (lang, text) => {
    return translations[lang][text];
  };
  return (
    <div className="Container">
      <Header getTranslation={getTranslation} lang={lang} setLang={setLang} />
      <Description getTranslition={getTranslation} lang={lang} />
      {showVid && <Video lang={lang} setVideoEnded={setVideoEnded} />}

      {alreadyParticipated ? (
        <div>
          <h3 style={{ textAlign: "center", color: "red" }}>
            {getTranslation(lang, "alreadyParticipated")}
          </h3>
        </div>
      ) : videoEnded ? (
        <Form
          getTranslation={getTranslation}
          lang={lang}
          showVid={showVid}
          setShowVid={setShowVid}
          videoEnded={videoEnded}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
