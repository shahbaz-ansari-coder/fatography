import React, { useState } from "react";
import { Send, ChevronDown, MapPin } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/contactPage.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import Preloader from "../../components/home/Preloader";

/* ─── FAQ DATA ─── */
const FAQ_ITEMS = [
  {
    id: 0,
    q: "Where is Fatography located?",
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
      "Cinematic films within 2–3 weeks",
      "Delivered in high-resolution format",
    ],
  },
];

/* ─── CONTACT INFO ─── */
const CONTACT_INFO = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M3 3h5l2 4.5-2.5 1.5A11 11 0 0010.5 12l1.5-2.5L16 11.5V16s-2 1-4 0A15 15 0 012 4c-1-2 1-1 1-1z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Phone",
    value: "+971 XX XXX XXXX",
    href: "tel:+971XXXXXXXX",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect
          x="2"
          y="4"
          width="14"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M2 6l7 5 7-5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Email",
    value: "hello@fatography.com",
    href: "mailto:hello@fatography.com",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 2C6.24 2 4 4.24 4 7c0 4.25 5 9 5 9s5-4.75 5-9c0-2.76-2.24-5-5-5z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="9" cy="7" r="1.8" fill="currentColor" />
      </svg>
    ),
    label: "Location",
    value: "Arjan, Al Barsha South 3, Dubai",
    href: "#map",
  },
];

/* ═══════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════ */
export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const form = e.target;
    const data = new FormData(form);
    try {
      const response = await fetch("https://formspree.io/f/mnjlvppa", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
    <Preloader/>
      <Header />

      <div className="cp-page !py-5 !sm:py-10">
        {/* ambient glow blobs */}
        <div className="cp-blob cp-blob--1" />
        <div className="cp-blob cp-blob--2" />

        {/* ══ MAIN GRID ══ */}
        <div className="cp-main">
          <div className="cp-main-inner">
            {/* ── LEFT COLUMN ── */}
            <div className="cp-left">
              {/* section label */}
              <span className="cp-eyebrow">Frequently Asked</span>
              <h2 className="cp-left-title">Common Questions</h2>
              <p className="cp-left-desc">
                Everything you need to know before booking your session with
                Fatography.
              </p>

              {/* FAQ accordion */}
              <div className="cp-faq">
                {FAQ_ITEMS.map((item) => {
                  const open = activeFaq === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`cp-faq-item${open ? " cp-faq-item--open" : ""}`}
                    >
                      <button
                        className="cp-faq-btn"
                        onClick={() => setActiveFaq(open ? null : item.id)}
                      >
                        <span>{item.q}</span>
                        <ChevronDown size={17} className="cp-faq-chevron" />
                      </button>
                      <div className="cp-faq-body">
                        <ul className="cp-faq-list">
                          {item.a.map((pt, i) => (
                            <li key={i}>
                              <span className="cp-faq-dot" />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT COLUMN — FORM ── */}
            <div className="cp-right">
              <div className="cp-form-card">
                {/* card header */}
                <div className="cp-form-header">
                  <span className="cp-eyebrow">Book / Enquire</span>
                  <h2 className="cp-form-title">Send a Message</h2>
                  <p className="cp-form-sub">
                    We typically reply within a few hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="cp-form">
                  <div className="cp-form-row">
                    <div className="cp-field">
                      <label>Full Name</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="e.g. Fatimah Haroon"
                        required
                      />
                    </div>
                    <div className="cp-field">
                      <label>Email Address</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="cp-form-row">
                    <div className="cp-field">
                      <label>Phone Number</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                    <div className="cp-field">
                      <label>Event Type</label>
                      <input
                        name="eventType"
                        type="text"
                        placeholder="Wedding, Brand Shoot…"
                      />
                    </div>
                  </div>

                  <div className="cp-field cp-field--full">
                    <label>Your Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Tell us about your shoot or project — dates, location, vibe…"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="cp-submit"
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <span className="cp-submit-spinner" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>

                {/* footer info */}
                <div className="cp-form-footer">
                  <div className="cp-form-footer-item">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle
                        cx="7"
                        cy="7"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                      <path
                        d="M7 4v3.5L9 9"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Quick response
                  </div>
                  <div className="cp-form-footer-item">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 1l1.5 4h4l-3.5 2.5 1.5 4L7 9l-3.5 2.5 1.5-4L1.5 5h4z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinejoin="round"
                      />
                    </svg>
                    100% confidential
                  </div>
                  <div className="cp-form-footer-item">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7l3.5 3.5L12 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    No spam, ever
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-right" theme="dark" autoClose={4000} />
    </>
  );
}
