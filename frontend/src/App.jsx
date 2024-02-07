import { useEffect, useState } from "react";
import Description from "./components/Description/Description";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Video from "./components/Video";
import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
function App() {
  const [showVid, setShowVid] = useState(true);
  const [alreadyParticipated, setAlreadyParticipated] = useState(false);
  useEffect(() => {
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
  return (
    <div className="Container">
      <Header />
      <Description />
      {showVid && <Video />}

      {alreadyParticipated ? (
        <div>
          <p style={{textAlign:'center',color:'red',}}>Désolé Vous avez deja Participer a la prochaine !</p>
        </div>
      ) : (
        <Form showVid={showVid} setShowVid={setShowVid} />
      )}
    </div>
  );
}

export default App;
