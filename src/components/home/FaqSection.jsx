import React, { useState } from 'react'
import { Link } from 'react-router';

const HomeFaqSection = () => {
      const [openIdx, setOpenIdx] = useState(null);

const faqs = [
  {
    q: "What photography services does Fatography offer?",
    a: "Fatography offers wedding photography, pre-wedding shoots, fashion photography, corporate headshots, product photography, event coverage, videography, maternity sessions, and professional studio photography across Dubai and Pakistan.",
  },
  {
    q: "Where is Fatography located?",
    a: "Fatography proudly serves clients across Dubai and Pakistan. Contact us to find the nearest branch or book your photography session.",
  },
  {
    q: "What is included in post-production?",
    a: "Every project includes meticulous retouching, cinematic color grading, and a final quality review by our in-house editors. We don't just deliver raw files—we deliver polished, gallery-ready images.",
  },
  {
    q: "How many years of experience does Fatography have?",
    a: "Established in 2009, Fatography has over 15 years of professional photography and videography experience, serving clients across Dubai and Pakistan.",
  },
  {
    q: "Does Fatography offer affordable photography packages?",
    a: "Yes, Fatography offers flexible and budget-friendly photography and videography packages tailored to individuals, families, and businesses across Dubai and Pakistan without compromising on quality.",
  },
];
  return (
    <section className="fsg-faq">
      <div className="fsg-faq-top">
        <div className="fsg-section-label fsg-label--center">
          <span />
          FAQ
          <span />
        </div>
        <h2 className="fsg-faq-heading">
          <em>FAQ's</em> About Fatography Services
        </h2>
        <p className="rev-para">
          Get quick answers about Fatography services, from booking and pricing
          to location and delivery information.
        </p>
      </div>

      <div className="fsg-faq-list">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`fsg-faq-item ${openIdx === i ? "fsg-faq-item--open" : ""}`}
          >
            <button
              className="fsg-faq-q"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              aria-expanded={openIdx === i}
            >
              <span className="fsg-faq-q-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="fsg-faq-q-text">{faq.q}</span>
              <span className="fsg-faq-icon">
                <svg
                  className="fsg-faq-arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 5l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            <div className="fsg-faq-body">
              <div>
                <p className="fsg-faq-ans">{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fsg-faq-cta-row">
        <div className="fsg-faq-cta-line" />
        <span className="fsg-faq-cta-text">Still have questions?</span>
        <Link to="/contact-us" className="fsg-faq-cta-link">
          Contact Us →
        </Link>
        <div className="fsg-faq-cta-line" />
      </div>
    </section>
  );
}

export default HomeFaqSection