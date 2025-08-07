import React from "react";
import "./PastryContactCard.css";

const PastryContactCard = () => {
  return (
    <div className="pastry-card">
      <div className="pastry-card__header">
        <img src="/images/logo.jpeg" alt="Pastry Magic Logo" className="pastry-card__logo" />
        <img src="/images/mixer.png" alt="Mixer illustration" className="pastry-card__mixer" />
      </div>
      <div className="pastry-card__contact">
        <div className="pastry-card__contact-item">
          <a href="tel:0506897798" className="pastry-card__icon-link" title="Call">
            <img src="https://img.icons8.com/ios-filled/50/000000/phone.png" alt="Call Phone" />
          </a>
          <a href="https://wa.me/972506897798" target="_blank" rel="noreferrer" className="pastry-card__contact-number">
            050-6897798
          </a>
        </div>
        <div className="pastry-card__contact-item">
          <a
            href="https://www.instagram.com/haisasonker"
            target="_blank"
            rel="noreferrer"
            className="pastry-card__icon-link"
            title="Instagram"
          >
            <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram profile" />
            <span className="pastry-card__instagram">@haisasonker</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PastryContactCard;
