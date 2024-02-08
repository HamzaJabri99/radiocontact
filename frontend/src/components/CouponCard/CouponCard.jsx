import { useState } from "react";
import "./CouponCard.css"; // Import CSS file

const CouponCard = ({ voucherCode, percent, voucherAmount }) => {
  const copyCode = () => {
    const copyText = document.getElementById("copyvalue");
    copyText.select();
    document.execCommand("copy");
    // You might want to provide some feedback to the user after copying
    alert("Copied the code: " + copyText.value);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="main">
          <div className="co-img">
            <img
              src="https://static.becharge.be/img/brands/571_500w.jpg"
              alt=""
            />
          </div>
          <div className="vertical"></div>
          <div className="content">
            <h2>Becharge</h2>
            <h1>
              {voucherAmount} <span>Coupon</span>
            </h1>
          </div>
        </div>
        <div className="copy-button">
          <input id="copyvalue" type="text" readOnly value={voucherCode} />
          <button onClick={copyCode} className="copybtn">
            COPY
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
