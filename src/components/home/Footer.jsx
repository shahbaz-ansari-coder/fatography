import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import { IoCallSharp, IoLocationSharp } from "react-icons/io5";

import "../../style/footer.css";
import FloatingButtons from "./FloatingButtons ";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <FloatingButtons />
      <footer className="custom-footer">
        {/* Section 1 */}
        <div className="footer-top-section">
          {/* Left Content */}
          <div className="training-content">
            <div className="camera-icon">
              <img src="/logo.png" alt="icon" />
            </div>

            <h2 className="serif-title">Learn Photography with Us</h2>
            <h2 className="main-title">Master the Art Behind the Lens</h2>

            <p className="description-text">
              Join our hands-on photography training and discover the skills,
              techniques, and creative vision that make every shot stand out.
              Whether you're a beginner or looking to refine your craft.
            </p>

            <Link href="/contact">
              <button className="details-btn">Get More Details</button>
            </Link>
          </div>

          {/* Map */}
          <div className="map-box">
            <iframe
              src="https://www.google.com/maps?q=Fatography%20Photography%20%26%20Videography%20Studio%20Dubai&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Social Icons */}
        <div className="social-icon-wrapper">
          <div className="large-social-icons">
            <a
              href="https://www.facebook.com/fatography.co/"
              target="_blank"
              rel="noreferrer"
              className="big-circle"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://wa.me/971509396784"
              target="_blank"
              rel="noreferrer"
              className="big-circle"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.instagram.com/fatography.co"
              target="_blank"
              rel="noreferrer"
              className="big-circle"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.linkedin.com/company/fatography/"
              target="_blank"
              rel="noreferrer"
              className="big-circle"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://www.youtube.com/@fatographyco"
              target="_blank"
              rel="noreferrer"
              className="big-circle"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Main Footer */}
        <div className="footer-main-content">
          {/* Brand */}
          <div className="brand-info">
            <img
              src="/text_logo.png"
              alt="Fatography"
              className="footer-logo-img"
            />

            <p>
              Fatography captures moments with creativity, precision, and heart
              — turning them into timeless stories you'll cherish.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>

            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/reviews">Reviews</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links">
            <h3>Services</h3>

            <ul>
              <li>
                <a href="/services">Wedding Photography</a>
              </li>
              <li>
                <a href="/services">Product Photography</a>
              </li>
              <li>
                <a href="/services">Event Coverage</a>
              </li>
              <li>
                <a href="/services">Corporate Shoots</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="contact-details">
            <a href="mailto:info@fatography.co" className="contact-item">
              <div className="icon-sq">
                <FaEnvelopeOpenText />
              </div>
              <div className="text-sq">
                <small>Email</small>
                <p>info@fatography.co</p>
              </div>
            </a>

            <a href="tel:+971509396784" className="contact-item">
              <div className="icon-sq">
                <IoCallSharp />
              </div>
              <div className="text-sq">
                <small>Phone</small>
                <p>+971 509396784</p>
              </div>
            </a>

            <a
              href="https://www.google.com/maps/dir/32.6480365,74.2120629/Fatography+Photography+%26+Videography+Studio+Dubai"
              target="_blank"
              rel="noreferrer"
              className="contact-item"
            >
              <div className="icon-sq">
                <IoLocationSharp />
              </div>
              <div className="text-sq">
                <small>Address</small>
                <p>Arjan Al Barsha South - Dubai - UAE</p>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <div className="bottom-line"></div>

          <div className="bottom-flex">
            <p>
              © {currentYear} <strong>Fatography</strong>. All Rights Reserved.
            </p>

            <img src="/payment.png" alt="Payment" className="payment-img" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;