import React, { useState } from "react";
import Service from "../../components/home/Service";
import DemoImges from "../../components/home/DemoImges";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import Preloader from "../../components/home/Preloader";
import ContactSection from "../../components/home/ContactSection";
import SEO from "../../components/home/SEO";
import { Link } from "react-router";

const AllServicesPage = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = [
    {
      q: "What photography services does Fatography offer in Dubai?",
      a: `Fatography offers 15+ professional photography services in Dubai including wedding photography, pre-wedding shoots, fashion photography, lifestyle photography, corporate headshots, product photography, food photography, maternity photography, family photography, real estate photography, neon photography, black and white photography, fitness photography, event coverage, and fashion week photography.`,
    },
    {
      q: " Does Fatography offer videography services in Dubai?",
      a: "Yes, Fatography provides professional videography services in Dubai for weddings, corporate events, fashion films, brand campaigns, and social media content creation.",
    },
    {
      q: "How do I book a photography service with Fatography in Dubai?",
      a: (
        <span>
          You can book a photography session with Fatography by filling out the
          contact form on the services page, emailing{" "}
          <a
            href="mailto:info@fatography.co"
            style={{ textDecoration: "underline", display: "inline" }}
          >
            info@fatography.co
          </a>
          , or calling the studio directly at{" "}
          <a
            href="tel:+971509396784"
            style={{ textDecoration: "underline", display: "inline" }}
          >
            +971 50 939 6784
          </a>
          . The team responds within 24 hours.
        </span>
      ),
    },
  ];
  return (
    <>
      <SEO
        title="Dubai Photography & Videography Services | Fatography"
        description="Explore a full range of photography and videography services in Dubai by Fatography. From fashion to weddings, events, products & more. Book your service today!"
      />
      <Preloader />
      <Header />
      <main className="!py-5 !sm:py-10">
        <Service />

        <DemoImges />
      </main>
      <ContactSection />
      <section className="fsg-faq">
        <div className="fsg-faq-top">
          <div className="fsg-section-label fsg-label--center">
            <span />
            FAQ
            <span />
          </div>
          <h2 className="fsg-faq-heading">
            <em>FAQ's</em> About Photography & Videography Services
          </h2>
          <p className="rev-para">
            Get quick answers about Fatography services, from booking and
            pricing to location and delivery information.
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
      <Footer />
    </>
  );
};

export default AllServicesPage;
