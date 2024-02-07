import "./Form.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Wheel1 from "../Wheel1";
const Form = ({ showVid, setShowVid }) => {
  const wheelRef = useRef(null);
  const [showErrorGif, setShowErrorGif] = useState(false);
  const [answers, setAnswers] = useState({
    mainQuestion: "",
    secondQuestion: "",
  });
  const [errors, setErrors] = useState({
    mainQuestion: "",
    secondQuestion: "",
    emailResponse: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmptyForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (answers.mainQuestion.length === 0) {
      newErrors.mainQuestion = "Ce champ est obligatoire";
      valid = false;
    } else {
      newErrors.mainQuestion = "";
    }

    if (answers.secondQuestion.length === 0) {
      newErrors.secondQuestion = "Ce champ est obligatoire";
      valid = false;
    } else {
      newErrors.secondQuestion = "";
    }

    setErrors(newErrors);
    return valid;
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (answers.mainQuestion !== "6") {
      newErrors.mainQuestion = "Incorrect answer. Please try again.";
      valid = false;
    } else {
      newErrors.mainQuestion = "";
    }

    if (answers.secondQuestion !== "1000") {
      newErrors.secondQuestion = "Incorrect answer. Please try again.";
      valid = false;
    } else {
      newErrors.secondQuestion = "";
    }

    setErrors(newErrors);
    return valid;
  };
  useEffect(() => {
    if (successMsg) {
      setShowVid(false);
    } else {
      setShowVid(true);
    }
  }, [successMsg, setShowVid]);
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    console.log(requestData);



    if (validateForm()) {
      // Logic for submitting the form goes here
      // For demonstration purposes, I'm just setting a success message
      const insertResult = await axios.post(
        "http://localhost/radiocontact/backend/create.php",
        requestData,{
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }
      );
      setSuccessMsg("Answers are correct!");
    } else if (!validateEmptyForm()) {
      setSuccessMsg("");
    } else {
      const insertResult = await axios.post(
        "http://localhost/radiocontact/backend/create.php",
        requestData,{
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }
      );
      setShowErrorGif(true);
      setSuccessMsg("");
    }
  };

  return (
    <div className="Form container">
      {showErrorGif ? (
        <div style={{ textAlign: "center" }}>
          <p>Desole une de votre reponse est incorrecte! a la prochaine.</p>
          <img src="https://media1.giphy.com/media/UrcXN0zTfzTPi/200w.gif" />
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="questions">
              {!successMsg && (
                <>
                  <div className="question_section">
                    <label htmlFor="mainQuestion">What is 2 + 4?</label>
                    <input
                      type="text"
                      name="mainQuestion"
                      id="mainQuestion"
                      value={answers.mainQuestion}
                      onChange={handleChange}
                    />
                    <span className="error">{errors.mainQuestion}</span>
                  </div>
                  <div className="question_section">
                    <label htmlFor="secondQuestion">What is 100 + 900?</label>
                    <input
                      type="text"
                      name="secondQuestion"
                      id="secondQuestion"
                      value={answers.secondQuestion}
                      onChange={handleChange}
                    />
                    <span className="error">{errors.secondQuestion}</span>
                  </div>
                  <button type="submit">Submit</button>
                </>
              )}
            </div>
          </form>
          <div>
            <p
              className="success"
              ref={wheelRef}
              style={{ textAlign: "center", margin: "1rem auto" }}
            >
              {successMsg}
            </p>

            {successMsg && <Wheel1 />}
          </div>
          <span className="error">{errors.emailResponse}</span>
        </>
      )}
    </div>
  );
};

export default Form;
