import { useState } from "react";
import { Send } from "lucide-react";
import "../../style/ContactSection.css";
const ContactSection = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    e.target.reset();
  };

  return (
    <>
      <section className="cs-section">
        {/* <div className="cs-blob cs-blob--1" /> */}
        {/* <div className="cs-blob cs-blob--2" /> */}

        <div className="cs-inner">
          {/* Header */}
          <div className="reviews-header">
            <p className="rev-eyebrow">Get In Touch</p>
            <h2 className="rev-title">
              Frame Your <em>Moments</em> With Us
            </h2>
          </div>
          {/* Card */}
          <div className="cs-card">
            <div className="cs-card-top" />

            <div className="cs-form-wrap">
              {sent && (
                <div className="cs-success">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 8l4 4 8-8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Message sent! We'll be in touch shortly.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Row 1: Name · Email · Phone */}
                <div className="cs-row-3">
                  <div className="cs-field">
                    <label>Full Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="e.g. Fatimah Haroon"
                      required
                    />
                  </div>
                  <div className="cs-field">
                    <label>Email Address</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Service · Date */}
                <div className="cs-row-2">
                  <div className="cs-field">
                    <label>Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                  <div className="cs-field">
                    <label>Service Type</label>
                    <select name="serviceType" defaultValue="">
                      <option value="" disabled>
                        Select a service…
                      </option>
                      <option>Fashion Photography</option>
                      <option>Pre Wedding Shoots</option>
                      <option>Wedding Events</option>
                      <option>Lifestyle Photography</option>
                      <option>Food Photography</option>
                      <option>Black &amp; White</option>
                      <option>Maternity Photography</option>
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

                {/* Row 3: Message */}
                <div className="cs-row-full">
                  <div className="cs-field">
                    <label>Your Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell us about your shoot — location, vibe, mood board ideas…"
                      required
                    />
                  </div>
                </div>

                {/* Bottom: submit + trust badges */}
                <div className="cs-bottom">
                  <button
                    type="submit"
                    className="cs-submit"
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <span className="cs-spinner" /> Sending…
                      </>
                    ) : (
                      <>
                        Send Message <Send size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="cs-divider" />

            <div className="cs-card-footer">
              <div className="cs-badges">
                <div className="cs-badge">
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
                <div className="cs-badge">
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
                <div className="cs-badge">
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
      </section>
    </>
  );
};

export default ContactSection;