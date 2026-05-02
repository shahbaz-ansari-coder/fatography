import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../style/servicePage.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import { ArrowUpToLine } from "lucide-react";
import ContactSection from "../../components/home/ContactSection";

/* ═══════════════════════════════════
   WHY POINTS
═══════════════════════════════════ */
const WHY_POINTS = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 3L25 8v7c0 5.52-4.72 10.67-11 12C7.72 25.67 3 20.52 3 15V8L14 3z"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 14l3.5 3.5L19 11"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Premium Post-Production",
    desc: "Meticulous retouching and cinematic colour grading by our in-house editors.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
        <rect
          x="3"
          y="6"
          width="22"
          height="16"
          rx="2"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
        />
        <path
          d="M11 10.5l6 3.5-6 3.5V10.5z"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Cinematic Storytelling",
    desc: "We craft visual narratives that go far beyond ordinary photography.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
        <circle
          cx="14"
          cy="14"
          r="5"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
        />
        <path
          d="M14 3v3M14 22v3M3 14h3M22 14h3M6.22 6.22l2.12 2.12M19.66 19.66l2.12 2.12M6.22 21.78l2.12-2.12M19.66 8.34l2.12-2.12"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Industry-Leading Visuals",
    desc: "Award-winning equipment and technique — putting your brand at the top.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
        <path
          d="M4 22L10 16M10 16l4-8 4 8M10 16h8"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="22"
          cy="7"
          r="3"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
        />
      </svg>
    ),
    label: "Professional Art Direction",
    desc: "From concept boards to final delivery, every frame is intentionally composed.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
        <circle
          cx="10"
          cy="10"
          r="4"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
        />
        <circle
          cx="19"
          cy="10"
          r="4"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
        />
        <path
          d="M3 23c0-3.31 3.13-6 7-6s7 2.69 7 6M16 17c2.21 0 6 1.34 6 6"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Dedicated Creative Team",
    desc: "A full-service crew that works around your vision, timeline, and goals.",
  },
];

/* ═══════════════════════════════════
   LIGHTBOX
═══════════════════════════════════ */
function Lightbox({ src, onClose }) {
  useEffect(() => {
    if (!src) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  if (!src) return null;
  return (
    <div className="ftg-lb-overlay" onClick={onClose}>
      <button className="ftg-lb-close" onClick={onClose}>
        ✕
      </button>
      <img
        src={src}
        alt="preview"
        className="ftg-lb-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ═══════════════════════════════════
   SHOOT SLIDER
═══════════════════════════════════ */
function ShootSlider({ shoot, onImageClick }) {
  const images = shoot.images || [];
  if (images.length === 0) return null;

  return (
    <div className="ftg-shoot-block">
      {shoot.title && (
        <div className="ftg-shoot-header">
          <span className="ftg-shoot-tag" />
          <h3 className="ftg-shoot-title">{shoot.title}</h3>
          <span className="ftg-shoot-count">{images.length} Photos</span>
        </div>
      )}
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1.4}
        spaceBetween={14}
        loop={true}
        speed={1500}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={images.length > 3}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 2.8, spaceBetween: 20 },
          1024: { slidesPerView: 3.5, spaceBetween: 24 },
          1280: { slidesPerView: 4.2, spaceBetween: 26 },
        }}
        className="ftg-shoot-swiper"
      >
        {images.map((img, i) => (
          <SwiperSlide key={img._id || i}>
            <div
              className="ftg-slide-card"
              onClick={() => onImageClick(img.url)}
            >
              <img src={img.url} alt={`slide-${i + 1}`} loading="lazy" />
              <div className="ftg-slide-overlay">
                <div className="ftg-slide-icon">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3.75 9h10.5M9 3.75l5.25 5.25L9 14.25"
                      stroke="#000"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

/* ═══════════════════════════════════
   FAQ SECTION
═══════════════════════════════════ */
function FaqSection({ serviceTitle }) {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "What makes Fatography different from other studios?",
      a: `For ${serviceTitle || "this service"}, we combine cinematic post-production, professional art direction, and a dedicated creative team to deliver imagery that goes far beyond ordinary photography. Every project is a visual story.`,
    },
    {
      q: "How do I book a session?",
      a: "Simply click 'Book a Session' on any service page or visit our Contact page. We'll schedule a discovery call to understand your vision, goals, and timeline before anything else.",
    },
    {
      q: "What is included in post-production?",
      a: "Every project includes meticulous retouching, cinematic colour grading, and a final quality review by our in-house editors. We don't just deliver raw files — we deliver polished, gallery-ready images.",
    },
    {
      q: "How long does delivery take?",
      a: "Turnaround depends on the package and scope, but most projects are delivered within 5–10 business days after the shoot. Rush delivery options are available on request.",
    },
    {
      q: "Do you travel for shoots outside Dubai?",
      a: "Yes. While we are based in Dubai, UAE, we regularly travel for destination weddings, celebrity shoots, and commercial projects. Travel packages can be discussed during your discovery call.",
    },
    {
      q: "Can I customise a package for my needs?",
      a: "Absolutely. We offer fully flexible packages designed around your creative needs, timeline, and budget — without ever compromising on quality.",
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
          Frequently Asked <em>Questions</em>
        </h2>
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

/* ═══════════════════════════════════
   MAIN PAGE
═══════════════════════════════════ */
export default function ServicePage() {
  const { title } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const heroRef = useRef(null);
  const handleClose = useCallback(() => setLightboxSrc(null), []);

  useEffect(() => {
    if (!title) {
      setLoading(false);
      return;
    }

    const fetchService = async () => {
      try {
        const res = await fetch(
          `https://fatography-backend.vercel.app/api/services/single-data/${title}`,
        );

        const result = await res.json();
        console.log("API RESPONSE:", result);

        if (result.success) {
          setServiceData(result.data);
        } else {
          setServiceData(null);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setServiceData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [title]);

  /* parallax */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      hero.style.backgroundPositionY = `${window.scrollY * 0.35}px`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [serviceData]);

  if (loading) {
    return (
      <div className="ftg-loader">
        <div className="ftg-loader-ring">
          <span />
          <span />
        </div>
        <p className="ftg-loader-text">Loading Studio</p>
      </div>
    );
  }

  if (!serviceData) {
    return (
      <div className="ftg-error-screen">
        <span className="ftg-error-code">404</span>
        <p>Service Not Found</p>
      </div>
    );
  }

  const shoots = serviceData.shoots || [];

  return (
    <>
      <Header />
      <div className="ftg-page">
        <Lightbox src={lightboxSrc} onClose={handleClose} />

        {/* ══ HERO BANNER ══ */}
        <header
          ref={heroRef}
          className="fsg-hero"
          style={{ backgroundImage: `url(${serviceData.banner?.url})` }}
        >
          {/* diagonal overlay */}
          <div className="fsg-hero-gradient" />

          {/* centre content */}
          <div className="fsg-hero-content">
            <div className="fsg-hero-tag">
              <span />
              <p>Premium Photography</p>
              <span />
            </div>
            <h1 className="fsg-hero-title">{serviceData.title}</h1>
            <p className="fsg-hero-sub">
              Crafted with vision. Built for legacy.
            </p>
            <div className="fsg-hero-cta-row">
              <Link
                to="/contact-us"
                className="fsg-hero-btn fsg-hero-btn--filled"
              >
                Book a Session
              </Link>
              <a href="#gallery" className="fsg-hero-btn fsg-hero-btn--outline">
                View Gallery
              </a>
            </div>
          </div>

          {/* bottom-right scroll indicator */}
          <div className="fsg-hero-scroll">
            <span className="fsg-hero-scroll-label">Scroll</span>
            <span className="fsg-hero-scroll-line" />
          </div>

          {/* bottom stats strip */}
          <div className="fsg-hero-stats">
            <div className="fsg-hero-stat">
              <strong>500+</strong>
              <span>Projects Done</span>
            </div>
            <div className="fsg-hero-stat-divider" />
            <div className="fsg-hero-stat">
              <strong>17+</strong>
              <span>Years Experience</span>
            </div>
            <div className="fsg-hero-stat-divider" />
            <div className="fsg-hero-stat">
              <strong>100%</strong>
              <span>Client Satisfaction</span>
            </div>
          </div>
        </header>

        {/* ══ OVERVIEW ══ */}
        <section className="ftg-overview">
          <div className="ftg-overview-inner">
            <div className="ftg-desc-box">
              <span className="ftg-section-label">The Narrative</span>
              <p className="ftg-desc-body">{serviceData.description}</p>
            </div>
            <div className="ftg-why-box">
              <span className="ftg-section-label">Why Fatography?</span>
              <div className="ftg-why-grid">
                {WHY_POINTS.map((pt, i) => (
                  <div key={i} className="ftg-why-card">
                    <div className="ftg-why-card-icon">{pt.icon}</div>
                    <h3 className="ftg-why-card-label">{pt.label}</h3>
                    <p className="ftg-why-card-desc">{pt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ GALLERY ══ */}
        {shoots.length > 0 && (
          <section className="ftg-gallery" id="gallery">
            <div className="ftg-gallery-header">
              <span className="ftg-section-label ftg-label-center">
                Visual Gallery
              </span>
              <h2 className="ftg-gallery-title">
                Explore Our Photography Collection
              </h2>
            </div>
            <div className="ftg-shoots-wrapper">
              {shoots.map((shoot, i) => (
                <ShootSlider
                  key={shoot._id || i}
                  shoot={shoot}
                  onImageClick={setLightboxSrc}
                />
              ))}
            </div>
          </section>
        )}
      </div>
      <FaqSection serviceTitle={serviceData.title} />
      <ContactSection />
      <Footer />
    </>
  );
}
