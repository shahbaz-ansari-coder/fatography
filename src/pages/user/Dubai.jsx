import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

// CSS Imports
import "swiper/css";
import "../../style/service.css";

// Home Components
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import Preloader from "../../components/home/Preloader";
import ContactSection from "../../components/home/ContactSection";
import SEO from "../../components/home/SEO";
import DomeGallery from "../../components/react-bits/DomeGallery";

const API_BASE = "https://fatography-backend.vercel.app/api/services";

const SERVICE_ORDER = [
  "Fashion Photography",
  "Pre Wedding Shoots",
  "Wedding Events",
  "Lifestyle Photography",
  "Food Photography",
  "Black & White",
  "Maternity Photography",
  "Product Photography",
  "Family Photography",
  "Event Coverage",
  "Real Estate",
  "Neon Photography",
  "Corporate & LinkedIn",
  "Fitness Photography",
  "Retouching Guide",
];

// ==========================================
// 1. SERVICE CARD SUB-COMPONENT
// ==========================================
function ServiceCard({ data }) {
  const displayImages =
    data?.thumbnails?.length > 0
      ? data.thumbnails.map((t) => t.url)
      : [data?.banner?.url];

  const slug = data?.title?.toLowerCase().trim().replace(/\s+/g, "-");
  const link = `/${slug}`;

  return (
    <Link to={`/dubai${link}`}>
      <article className="service-card">
        <Swiper
          className="card-inner-swiper"
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={displayImages.length > 1}
        >
          {displayImages.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src.replace(
                  "/upload/",
                  "/upload/w_400,f_auto,q_auto:low/",
                )}
                alt={data.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="card-overlay">
          <div className="card-name">{data.title}</div>
        </div>
      </article>
    </Link>
  );
}

// ==========================================
// MAIN DUBAI PAGE COMPONENT
// ==========================================
const DubaiPage = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [portfolioLoading, setPortfolioLoading] = useState(true);
  const [minRadius, setMinRadius] = useState(350);

  // Responsive Radius for DomeGallery
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setMinRadius(150);
      else if (w < 768) setMinRadius(220);
      else setMinRadius(350);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Fetch Services & Portfolio Images
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_BASE}/get-data`);
        const apiServices = res?.data?.data || [];
        const sorted = [...apiServices].sort((a, b) => {
          const aIndex = SERVICE_ORDER.indexOf(a.title);
          const bIndex = SERVICE_ORDER.indexOf(b.title);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
        setServices(sorted);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setServicesLoading(false);
      }
    };

    const fetchPortfolioImages = async () => {
      try {
        const res = await axios.get(
          "https://fatography-backend.vercel.app/api/shoot-images/all",
        );
        if (res.data?.success) {
          const formatted = res.data.data.flatMap((item) =>
            (item.images || []).map((img) => ({
              src: img,
              alt: item.alt || "photoshoot",
            })),
          );
          setPortfolioImages(formatted);
        }
      } catch (err) {
        console.error("API Error portfolio:", err);
      } finally {
        setPortfolioLoading(false);
      }
    };

    fetchServices();
    fetchPortfolioImages();
  }, []);

  // Professional Dubai Specific FAQs
  const faqs = [
    {
      q: "What commercial and creative photography services do you offer in Dubai?",
      a: "Fatography offers high-end visual production across Dubai, including editorial fashion weeks, luxury real estate shoots, premium product campaigns, international corporate headshots, and luxury destination wedding coverages.",
    },
    {
      q: "Do you handle outdoor location scouting and permits in Dubai?",
      a: "Yes, we fully assist clients with indoor studio management and guide them through the process of setting up commercial shoots in icon locations, desert landscapes, or corporate zones across the UAE.",
    },
    {
      q: "How early should we book our media production slot with your Dubai team?",
      a: "To ensure adequate planning, equipment alignment, and conceptual development, we recommend booking your campaign or event space at least 1 to 2 weeks in advance.",
    },
    {
      q: "What is the official procedure to schedule a booking in Dubai?",
      a: (
        <span>
          You can lock your dates by filling out our online booking portal, emailing your project details to{" "}
          <a
            href="mailto:info@fatography.co"
            style={{ textDecoration: "underline", display: "inline" }}
          >
            info@fatography.co
          </a>
          , or instantly ringing our creative desk at{" "}
          <a
            href="tel:+971509396784"
            style={{ textDecoration: "underline", display: "inline" }}
          >
            +971 50 939 6784
          </a>
          . Our production strategist will coordinate with you inside 24 hours.
        </span>
      ),
    },
  ];

  return (
    <>
      <SEO
        title="Luxury Photography & Videography Services Dubai | Fatography"
        description="Discover elite visual storytelling and media execution in Dubai by Fatography. Delivering professional corporate, luxury fashion, product, and wedding visual packages."
      />
      <Preloader />
      <Header />
      
      <main className="!py-5 !sm:py-10">
        
        {/* ==========================================
            SERVICES SECTION
           ========================================== */}
        <section className="service" id="service">
          <div className="service-container">
            <div className="reviews-header">
              <p className="rev-eyebrow">Our Services</p>
              <h2 className="rev-title">
                Professional <em>Photography</em> Solutions in Dubai
              </h2>
              <p className="rev-para">
                From corporate brand identity updates to premium fashion runways, we bring unmatched modern standards, clean symmetry, and elite visual asset creation to Dubai.
              </p>
            </div>
            
            {servicesLoading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#fff" }}>Loading Services...</div>
            ) : (
              <div className="services-grid">
                {services.map((service) => (
                  <ServiceCard key={service._id} data={service} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ==========================================
            PORTFOLIO/DEMO IMAGES SECTION
           ========================================== */}
        <section className="portfolio-section" style={{ marginTop: "60px" }}>
          <div className="reviews-header">
            <p className="rev-eyebrow">Our Portfolio</p>
            <h2 className="rev-title">
              Stories Captured Through Our Lens <em>Professional</em>
            </h2>
            <p className="rev-para">
              Every canvas highlights genuine raw emotion, meticulous production detail, and bespoke visual curation. Dive into our global archive.
            </p>
          </div>
          
          {portfolioLoading ? (
            <div style={{ color: "white", textAlign: "center", marginTop: "20px", padding: "40px" }}>
              Loading Gallery Portfolio...
            </div>
          ) : (
            <div style={{ width: "100vw", height: "55vh" }} id="all-pictures">
              {/* <BurgerGallery */}
              <DomeGallery
                images={portfolioImages}
                fit={1}
                minRadius={minRadius}
                maxVerticalRotationDeg={0}
                segments={34}
                dragDampening={20}
                grayscale
              />
            </div>
          )}
        </section>

      </main>

      <ContactSection />

      {/* ==========================================
          FAQ SECTION
         ========================================== */}
      <section className="fsg-faq">
        <div className="fsg-faq-top">
          <div className="fsg-section-label fsg-label--center">
            <span />
            FAQ
            <span />
          </div>
          <h2 className="fsg-faq-heading">
            <em>FAQ's</em> About Our Services in Dubai
          </h2>
          <p className="rev-para">
            Get instant clarity regarding our commercial workflow, timelines, permits, and corporate production setups in Dubai.
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
                  <div className="fsg-faq-ans">{faq.a}</div>
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

export default DubaiPage;