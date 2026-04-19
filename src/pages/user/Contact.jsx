import React, { useState } from "react";
import {
  Mail,
  Phone,
  Send,
  ChevronDown,
  MapPin,
  MessageSquare,
} from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../style/contactPage.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";

export default function ContactPage() {
  const [activeFaqId, setActiveFaqId] = useState(0);

  const faqItems = [
    {
      id: 0,
      q: "Where is Fatography located in Dubai?",
      a: [
        "Located in Arjan, Al Barsha South 3",
        "Inside Al Fahed Contracting Co. Building",
        "Easy access from major Dubai roads",
        "Parking available for visitors",
      ],
    },
    {
      id: 1,
      q: "What photography services do you provide?",
      a: [
        "Wedding Photography & Cinematic Films",
        "Corporate Event Coverage",
        "Studio Portrait Photography",
        "Commercial & Brand Shoots",
        "Drone Photography & Videography",
      ],
    },
    {
      id: 2,
      q: "How does pricing work?",
      a: [
        "Flexible packages based on project scope",
        "Custom pricing for events & commercial shoots",
        "Drone and cinematic equipment included",
        "Transparent pricing with no hidden charges",
      ],
    },
    {
      id: 3,
      q: "How long does delivery take?",
      a: [
        "Sneak peek images within 48 hours",
        "Full gallery within 2 weeks",
        "Cinematic films within 2-3 weeks",
        "Delivered in high-resolution format",
      ],
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/mnjlvppa", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      toast.success("Message sent successfully!");
      form.reset();
    } else {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <>
    <Header/> 
    <div className="cp-premium-wrapper">
      <div className="cp-noise-overlay"></div>
      <div className="cp-spotlight"></div>

      <div className="cp-container">
        <div className="cp-grid">
          {/* LEFT SIDE */}
          <div className="cp-info-section">
            <div className="cp-badge">CONNECT WITH US</div>

            <h1 className="cp-title">
              Let's Turn <br />
              <span>Your Moments</span> Into Stories
            </h1>

            <p className="cp-description">
              Tell us about your event, brand, or creative vision. Our team will
              craft stunning photography and cinematic visuals that capture
              every moment beautifully.
            </p>

            {/* FAQ */}
            <div className="cp-faq-list">
              {faqItems.map((item) => (
                <div
                  key={item.id}
                  className={`cp-faq-item ${
                    activeFaqId === item.id ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() =>
                      setActiveFaqId(activeFaqId === item.id ? null : item.id)
                    }
                  >
                    {item.q} <ChevronDown size={18} />
                  </button>

                  <div className="cp-faq-ans">
                    <ul>
                      {item.a.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* MAP */}
            <div className="cp-mini-map">
              <div className="map-tag">
                <MapPin size={14} /> Arjan, Dubai
              </div>
              <iframe
                title="Fatography Dubai Location"
                src="https://www.google.com/maps?q=Fatography%20Photography%20%26%20Videography%20Studio%20Dubai&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />{" "}
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="cp-form-card">
            <div className="form-glass">
              <h3>Send a Message</h3>

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div className="input-group">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                  />
                </div>

                <div className="input-group">
                  <input name="phone" type="tel" placeholder="Phone Number" />
                </div>

                <div className="input-group">
                  <input
                    name="eventType"
                    type="text"
                    placeholder="Event Type (Wedding, Brand, Event)"
                  />
                </div>

                <div className="input-group">
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell us about your shoot or project..."
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">
                  SEND MESSAGE <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" theme="dark" autoClose={4000} />
    </div>
    <Footer/>
    </>
  );
}
