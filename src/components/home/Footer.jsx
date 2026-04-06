import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaEnvelopeOpenText, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { IoCallSharp, IoLocationSharp } from "react-icons/io5";

import '../../style/footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="custom-footer">
      <div className="footer-container">
        {/* Logo & About Section */}
        <div className="footer-section about">
          <h2 className="footer-logo flex items-center gap-6">
            <img src="logo.png" className="w-16" alt="" />
            <h1>
              Fato<span>graphy</span>
            </h1>
          </h2>
          <p className="footer-description">
            Fatography captures moments with creativity, precision, and heart —
            turning them into timeless stories you’ll cherish.
          </p>
          <div className="social-icons">
            <a href="#" target="_blank" className="social-link">
              <FaFacebookF />
            </a>
            <a href="#" target="_blank" className="social-link">
              <FaWhatsapp />
            </a>
            <a href="#" target="_blank" className="social-link">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" className="social-link">
              <FaYoutube />
            </a>
            <a href="#" target="_blank" className="social-link">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">About Us</a>
            </li>
            <li>
              <a href="/">Reviews</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="footer-section links">
          <h3>Services</h3>
          <ul>
            <li>
              <a href="/">Wedding Events</a>
            </li>
            <li>
              <a href="/"> Product Photography</a>
            </li>
            <li>
              <a href="/">Event Coverage</a>
            </li>
            <li>
              <a href="/">Corporate Shoots</a>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        {/* Contact Us Section */}
        <div className="footer-section contact-info">
          <h3 className="section-heading">Contact Us</h3>
          <div className="contact-list">
            <div className="contact-card">
              <div className="contact-icon-box">
                <FaEnvelopeOpenText />
              </div>
              <div className="contact-card-text">
                <small>Our Email</small>
                <p>info@fatography.co</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-box">
                <IoCallSharp />
              </div>
              <div className="contact-card-text">
                <small>Phone Number</small>
                <p>+971 509396784</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-box">
                <IoLocationSharp />
              </div>
              <div className="contact-card-text">
                <small>Our Address</small>
                <p>Arjan Al Barsha South - Dubai - UAE</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <p>
          &copy; {currentYear} <strong>Fatography</strong>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
