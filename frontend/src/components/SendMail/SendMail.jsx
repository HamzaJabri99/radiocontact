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

    setIsLoading(true);

    try {
      const response = await axios.post(
        "/api/sendMail.php",
        { lang, code, email },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response.status === 200) {
        setIsFinished(true);
      }
    } catch (error) {
      console.error("Error sending mail:", error);
    }

    setIsLoading(false); 
  };

  const handleChange = (e) => {
    const emailValue = e.target.value;

    if (!emailValue) {
      setEmailError("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)) {
      setEmailError("Invalid Email Address");
    } else {
      setEmailError("");
      setEmail(emailValue);
    }
  };

  return (
    <div className="SendMail">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          autoFocus
          onChange={handleChange}
        />
        {emailError && (
          <span style={{ color: "red", margin: "1rem auto" }}>
            {emailError}
          </span>
        )}

        <button disabled={isFinished}>
          {isLoading
            ? `${getTranslations(lang, "loading")} ...`
            : isFinished
            ? getTranslations(lang, "sent")
            : getTranslations(lang, "send")}
        </button>
      </form>
    </div>
  );
};

export default SendMail;
