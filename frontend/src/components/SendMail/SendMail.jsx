import React, { useState } from "react";
import "./SendMail.css";
import axios from "axios";
const SendMail = ({ lang, getTranslations, code }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError !== "") {
      return false;
    }
    const response = await axios.post(
      "http://localhost/radiocontact/backend/sendMail.php",
      {
        lang,
        code,
        email,
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    setIsLoading(true);
    if (response.statusCode === 200) {
      setIsFinished(true);
    }
    if (response.statusCode === 400) {
      setIsFinished(false);
    }
    console.log(isFinished);
    console.log(response);
  };
  const handleChange = (e) => {
    if (!e.target.value) {
      setEmailError("Email is required");
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
      setEmailError("Invalid Email Address");
    } else {
      setEmailError("");
      setEmail(e.target.value);
    }
  };
  return (
    <div className="SendMail">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="">Email: </label>
        <input type="" name="email" id="" autoFocus onChange={handleChange} />
        {emailError && <span style={{ color: "red", margin:"1rem auto"}}>{emailError}</span>}

        <button>
          {isLoading ? "loading..." : getTranslations(lang, "send")}
          {isFinished ? "Sent" : ""}
        </button>
      </form>
    </div>
  );
};

export default SendMail;
