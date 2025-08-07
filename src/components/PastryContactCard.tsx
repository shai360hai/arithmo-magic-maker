import React from "react";
import "./PastryContactCard.css";

const PastryContactCard = () => {
  return (
    <div className="pastry-container">
      <img src="/images/logo.jpeg" alt="logo" className="logo" />
      <img src="/images/mixer.png" alt="מיקסר" className="mixer" />

      <div className="contact">
        <div className="icons">
          <a href="tel:0506897798">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/phone.png"
              alt="Call"
            />
          </a>
          <a href="https://wa.me/972506897798" target="_blank" rel="noreferrer">
            050-6897798
          </a>
        </div>

        <div className="instagram">
          <a
            href="https://www.instagram.com/haisasonker"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png"
              alt="Instagram"
            />
            @haisasonker
          </a>
        </div>
      </div>
    </div>
  );
};

export default PastryContactCard;
