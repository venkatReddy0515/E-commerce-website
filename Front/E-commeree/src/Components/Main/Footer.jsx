import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Information */}
        <div className="footer-section">
          <h3>Stylish Info</h3>
          <h5>
            Your go-to destination for stylish clothing for men, women, and kids.
            We deliver quality and style, always.
          </h5>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="/faq">FAQs</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>
              <FontAwesomeIcon icon={faPhone} /> +1 123 456 7890
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} /> support@stylishinfo.com
            </li>
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Fashion St, New York,
              NY
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-section">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for exclusive deals and updates!</p>
          <form action="#" className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
