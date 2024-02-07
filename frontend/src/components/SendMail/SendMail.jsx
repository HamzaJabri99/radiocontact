import React from "react";
import "./SendMail.css";
import axios from "axios";
const SendMail = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost/radiocontact/backend/sendMail.php",
      {},        {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log(response.data);
    console.log(e.target.email.value);
  };
  return (
    <div className="SendMail">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="">Email: </label>
        <input type="email" name="email" id="" autoFocus />
        <button>Send</button>
      </form>
    </div>
  );
};

export default SendMail;
