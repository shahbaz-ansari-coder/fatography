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
        <div className="footer-section">
          <div className="footer-logo flex items-center gap-6">
            <img src="logo.png" className="w-16" alt="Fatography logo" />
            <h2>
              Fato<span>graphy</span>
            </h2>
          </div>

          <p className="footer-description">
            Fatography captures moments with creativity, precision, and heart —
            turning them into timeless stories you’ll cherish.
          </p>

          <div className="social-icons">
            <a
              href="https://www.facebook.com/fatography.co/"
              target="_blank"
              className="social-link"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/971509396784"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/fatography.co"
              target="_blank"
              className="social-link"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@fatographyco"
              target="_blank"
              className="social-link"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.linkedin.com/company/fatography/"
              target="_blank"
              className="social-link"
            >
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
            <a href="mailto:info@fatography.co" target="_blank">
            <div className="contact-card">
              <div className="contact-icon-box">
                <FaEnvelopeOpenText />
              </div>
              <div className="contact-card-text">
                <small>Our Email</small>
                <p>info@fatography.co</p>
              </div>
            </div>
            </a>
            <a href="tel:+971509396784">
              <div className="contact-card">
                <div className="contact-icon-box">
                  <IoCallSharp />
                </div>
                <div className="contact-card-text">
                  <small>Phone Number</small>
                  <p>+971 509396784</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.google.com/maps/place/Fatography+%E2%80%93+Photography+%26+Videography+Studio+Dubai/@25.062861,55.234648,16z/data=!4m6!3m5!1s0x46860ec2445a01:0xc2187e2e4de6e4f2!8m2!3d25.0628609!4d55.2346483!16s%2Fg%2F11y4bhk8sx?hl=en&entry=ttu&g_ep=EgoyMDI2MDQxNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
            >
              <div className="contact-card">
                <div className="contact-icon-box">
                  <IoLocationSharp />
                </div>
                <div className="contact-card-text">
                  <small>Our Address</small>
                  <p>Arjan Al Barsha South - Dubai - UAE</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom flex items-center justify-between footer-container">
        <p>
          &copy; {currentYear} <strong>Fatography</strong>. All Rights Reserved.
        </p>
        <div className="">
          <img className="w-[270px] !mt-4" src="/payment.png" alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
