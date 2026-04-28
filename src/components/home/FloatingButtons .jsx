import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import "../../style/floatingButtons.css";

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">
      {/* WhatsApp */}
      <a
        href="https://wa.me/971509396784?text=Hey!%20I%20am%20interested%20in%20your%20photography%20services.%20Can%20you%20please%20share%20more%20details%20about%20packages%20and%20availability?"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        <FaWhatsapp />
      </a>

      {/* Call */}
      <a href="tel:+971509396784" className="call-btn">
        <FaPhoneAlt />
      </a>
    </div>
  );
};

export default FloatingButtons;
