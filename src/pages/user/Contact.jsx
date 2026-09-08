import React, { useState, useRef, useEffect } from "react";
import { Send, ChevronDown, MapPin } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/contactPage.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import Preloader from "../../components/home/Preloader";
import SEO from "../../components/home/SEO";

/* ─── FAQ DATA ─── */
const FAQ_ITEMS = [
  {
    id: 0,
    q: "Where is Fatography located?",
    a: `<p>
        Fatography is located inside the Al Fahed Contracting Co. Building in Arjan,
        Al Barsha South 3, Dubai, UAE. We are easily accessible from major Dubai roads
        including Sheikh Mohammed Bin Zayed Road and Al Khail Road, with parking available
        on-site for all visitors.
      </p>`,
  },
  {
    id: 1,
    q: "What photography services do you provide?",
    a: `<p>Fatography offers a comprehensive range of professional photography and videography services in Dubai, including:</p>
      <ul>
        <li>Wedding Photography &amp; Videography</li>
        <li>Pre-Wedding Shoots</li>
        <li>Fashion Photography</li>
        <li>Corporate &amp; LinkedIn Headshots</li>
        <li>Product Photography</li>
        <li>Food Photography</li>
        <li>Family Photography</li>
        <li>Maternity Photography</li>
        <li>Lifestyle Photography</li>
        <li>Event Coverage</li>
        <li>Real Estate Photography</li>
        <li>Neon Photography</li>
        <li>Black &amp; White Photography</li>
        <li>Fitness Photography</li>
        <li>Celebrity Photography</li>
        <li>Fashion Week Coverage</li>
        <li>Studio Sessions</li>
      </ul>
      <p>Whether you need a one-hour studio session or full-day event coverage,
        we have a package to suit your vision and budget.</p>`,
  },
  {
    id: 2,
    q: "How does pricing work?",
    a: `<p>Our pricing is flexible and tailored to your project needs. Packages vary based on shoot type,
        duration, locations, and editing requirements.</p>
      <ul>
        <li>Custom pricing for every project</li>
        <li>Event &amp; commercial packages available</li>
        <li>Transparent pricing (no hidden charges)</li>
        <li>Drone &amp; cinematic equipment included where needed</li>
      </ul>
      <p>To get an accurate quote, simply contact us and we'll respond within 24 hours.</p>`,
  },
  {
    id: 3,
    q: "How long does delivery take?",
    a: `<p>Delivery timelines depend on project type:</p>
      <ul>
        <li>Portrait &amp; Headshots: 2–3 days</li>
        <li>Pre-Wedding &amp; Lifestyle: 5–7 days</li>
        <li>Wedding Photography: 7–10 days</li>
        <li>Commercial Shoots: 3–5 days</li>
        <li>Event Coverage: 5–10 days</li>
      </ul>
      <p>We always try to deliver faster if possible and also handle urgent requests.</p>`,
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

/* ─── FAQ ITEM with auto-height ─── */
function FaqItem({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className={`cp-faq-item${isOpen ? " cp-faq-item--open" : ""}`}>
      <button className="cp-faq-btn" onClick={onToggle}>
        <span>{item.q}</span>
        <ChevronDown size={17} className="cp-faq-chevron" />
      </button>
      <div
        className="cp-faq-body"
        style={{ maxHeight: height ? `${height}px` : "0px" }}
      >
        <div
          ref={bodyRef}
          className="cp-faq-body-inner"
          dangerouslySetInnerHTML={{ __html: item.a }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════ */
export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [sending, setSending] = useState(false);

  const handleToggle = (id) => {
    setActiveFaq((prev) => (prev === id ? null : id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const form = e.target;
    const data = new FormData(form);
    try {
      const response = await fetch("https://formspree.io/f/xykoykdw", {
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
      <SEO
        title="Contact Photography Session in Dubai | Fatography"
        description="Get in touch with Fatography Dubai's 5-star photography studio. Book weddings, fashion, corporate & more. We reply within hours. Send your enquiry today!"
      />
      <Preloader />
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
              <span className="cp-eyebrow">Contact Fatography</span>
              <h2 className="cp-left-title">
                FAQ's About Contacting Fatography
              </h2>
              <p className="cp-left-desc">
                Everything you need to know before booking your session with
                Fatography — answered clearly and honestly.
              </p>

              {/* FAQ accordion */}
              <div className="cp-faq">
                {FAQ_ITEMS.map((item) => (
                  <FaqItem
                    key={item.id}
                    item={item}
                    isOpen={activeFaq === item.id}
                    onToggle={() => handleToggle(item.id)}
                  />
                ))}
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
                      <label>Service Type</label>
                      <select name="serviceType" defaultValue="">
                        <option value="" disabled>
                          Select Service Type
                        </option>
                        <option>Fashion Photography</option>
                        <option>Pre Wedding Shoots</option>
                        <option>Wedding Events</option>
                        <option>Lifestyle Photography</option>
                        <option>Food Photography</option>
                        <option>Black &amp; White</option>
                        <option>Product Photography</option>
                        <option>Family Photography</option>
                        <option>Event Coverage</option>
                        <option>Neon Photography</option>
                        <option>Corporate &amp; LinkedIn</option>
                        <option>Retouching Guide</option>
                        <option>Fitness Photography</option>
                        <option>Real Estate</option>
                      </select>
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
