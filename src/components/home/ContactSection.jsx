import { useState } from "react";
import { Send } from "lucide-react";
import "../../style/ContactSection.css";

const ContactSection = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xykoykdw", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSent(true);
        form.reset();

        setTimeout(() => {
          setSent(false);
        }, 4000);
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="cs-section">
        <div className="cs-inner">
          {/* Header */}
          <div className="reviews-header">
            <p className="rev-eyebrow">Get In Touch</p>
            <h2 className="rev-title">
              Let us <em>capture</em> your memories
            </h2>
          </div>

          {/* Card */}
          <div className="cs-card">
            <div className="cs-card-top" />

            <div className="cs-form-wrap">
              {/* SUCCESS MESSAGE */}
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
                {/* ROW 1 */}
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

                {/* ROW 2 */}
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
                      <option>Black & White</option>
                      <option>Maternity Photography</option>
                      <option>Product Photography</option>
                      <option>Family Photography</option>
                      <option>Event Coverage</option>
                      <option>Neon Photography</option>
                      <option>Corporate & LinkedIn</option>
                      <option>Retouching Guide</option>
                      <option>Fitness Photography</option>
                      <option>Real Estate</option>
                    </select>
                  </div>
                </div>

                {/* MESSAGE */}
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

                {/* SUBMIT */}
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

            {/* DIVIDER */}
            <div className="cs-divider" />

            {/* FOOTER BADGES */}
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