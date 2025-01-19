import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faTruck, faShieldAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

function PolicySection() {
  return (
    <section className="policy-section">
      <div className="policy-container">
        {/* 7-Day Return Policy */}
        <div className="policy-item">
          <FontAwesomeIcon icon={faUndo} size="2x" />
          <h4>7-Day Return Policy</h4>
          <p>Shop with confidence! Return or exchange your products within 7 days.</p>
        </div>

        {/* No Delivery Charges */}
        <div className="policy-item">
          <FontAwesomeIcon icon={faTruck} size="2x" />
          <h4>No Delivery Charges</h4>
          <p>Enjoy free shipping on all your orders, no hidden fees or extra charges.</p>
        </div>

        {/* Trusted Services */}
        <div className="policy-item">
          <FontAwesomeIcon icon={faShieldAlt} size="2x" />
          <h4>Trusted Services</h4>
          <p>We are committed to providing top-quality products and exceptional service.</p>
        </div>

        {/* More Information */}
        <div className="policy-item">
          <FontAwesomeIcon icon={faInfoCircle} size="2x" />
          <h4>Need More Info?</h4>
          <p>Have questions? Contact our support team for detailed assistance.</p>
        </div>
      </div>
    </section>
  );
}

export default PolicySection;
