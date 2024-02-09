import React, { useState } from "react";
import "./SendMail.css";
import axios from "axios";
const SendMail = ({lang,getTranslations}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost/radiocontact/backend/sendMail.php",
      {},
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
    console.log(response.data);
    console.log(e.target.email.value);
  };
  return (
    <div className="SendMail">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="">Email: </label>
        <input type="email" name="email" id="" autoFocus />
        <button>
          {isLoading ? "loading..." : getTranslations(lang,'send')}
          {isFinished ? "Sent" : ""}
        </button>
      </form>
    </div>
  );
};

export default SendMail;
