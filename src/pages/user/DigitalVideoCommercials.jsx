import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/digitalVideoCommercials.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import ContactSection from "../../components/home/ContactSection";
import SEO from "../../components/home/SEO";

/* ═══════════════════════════════════
   DATA — replace banner URL & video URLs
═══════════════════════════════════ */
const BANNER_URL =
  "https://www.shutterstock.com/shutterstock/videos/3714441373/thumb/1.jpg?ip=x480";

const VIDEO_DATA = [
  {
    url: "./videos-assets/digital-video-commercials/Great Winter Sale (Fatography).mp4",
    duration: "1:14",
    tag: "DVC",
  },
  {
    url: "./videos-assets/digital-video-commercials/Misha Lakhan Highlights (Fatography).mp4",
    duration: "0:49",
    tag: "DVC",
  },
  {
    url: "./videos-assets/digital-video-commercials/DVC (Fatography).mp4",
    duration: "0:59",
    tag: "DVC",
  }
];

/* ═══════════════════════════════════
   WHY POINTS
═══════════════════════════════════ */
const WHY_POINTS = [
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
    label: "4K Commercial Quality",
    desc: "Industry-grade cameras and cinema lenses for stunning, broadcast-ready commercial results.",
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
    label: "Expert Art Direction",
    desc: "Every frame is composed to perfection — lighting, colour, and movement that captivates audiences.",
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
    label: "Motion & VFX",
    desc: "Dynamic motion graphics and visual effects that make your brand impossible to ignore.",
  },
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
    label: "Brand Storytelling",
    desc: "We craft compelling narratives around your product that drive real conversions and loyalty.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
        <rect
          x="4"
          y="4"
          width="8"
          height="8"
          rx="1"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
        />
        <rect
          x="16"
          y="4"
          width="8"
          height="8"
          rx="1"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
        />
        <rect
          x="4"
          y="16"
          width="8"
          height="8"
          rx="1"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
        />
        <rect
          x="16"
          y="16"
          width="8"
          height="8"
          rx="1"
          stroke="rgb(216,116,112)"
          strokeWidth="1.5"
        />
      </svg>
    ),
    label: "Multi-Platform Delivery",
    desc: "Horizontal, vertical, square — every commercial delivered optimised for every platform.",
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
    label: "Fast Turnaround",
    desc: "Professional editing and delivery within your campaign timeline, without cutting corners.",
  },
];

/* ═══════════════════════════════════
   VIDEO CARD
═══════════════════════════════════ */
function VideoCard({ video, index, onPlay }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const handleLoaded = () => {
      vid.currentTime = 3;
    };
    vid.addEventListener("loadeddata", handleLoaded);
    return () => {
      vid.removeEventListener("loadeddata", handleLoaded);
    };
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (hovered) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    } else {
      vid.pause();
      vid.currentTime = 3;
    }
  }, [hovered]);

  return (
    <div
      className="dvc-video-card"
      style={{ "--idx": index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(video.url)}
    >
      <video
        ref={videoRef}
        src={video.url}
        className="dvc-video-thumb"
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="dvc-card-overlay"></div>
      <div className="dvc-card-corner-tl"></div>
      <div className="dvc-card-corner-br"></div>

      <div className="dvc-card-tag">{video.tag}</div>

      <div className="dvc-card-play">
        <div className="dvc-play-ring"></div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
          <path d="M8 5.14v14l11-7-11-7z" />
        </svg>
      </div>

      <div className="dvc-card-info">
        <div className="dvc-card-meta">
          <span className="dvc-card-duration">{video.duration}</span>
        </div>
      </div>

      <div className="dvc-card-accent"></div>
    </div>
  );
}

/* ═══════════════════════════════════
   VIDEO LIGHTBOX
═══════════════════════════════════ */
function VideoLightbox({ url, onClose }) {
  useEffect(() => {
    if (!url) return;
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [url, onClose]);

  if (!url) return null;
  return (
    <div className="dvc-vlb-overlay" onClick={onClose}>
      <button className="dvc-vlb-close" onClick={onClose}>
        ✕
      </button>
      <div className="dvc-vlb-player" onClick={(e) => e.stopPropagation()}>
        <video src={url} className="dvc-vlb-video" controls autoPlay />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   FAQ SECTION
═══════════════════════════════════ */
function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "What makes Fatography's commercials different?",
      a: "We combine cinematic post-production, professional art direction, and a dedicated creative team to deliver commercials that go far beyond ordinary video ads. Every project is a visual story built to convert.",
    },
    {
      q: "How do I book a commercial shoot?",
      a: "Simply click 'Start Your Campaign' on this page or visit our Contact page. We'll schedule a discovery call to understand your brand, goals, and target audience before anything else.",
    },
    {
      q: "What is included in post-production?",
      a: "Every commercial includes meticulous colour grading, motion graphics, sound design, and a final quality review by our in-house editors. We deliver polished, broadcast-ready commercials.",
    },
    {
      q: "How long does delivery take?",
      a: "Turnaround depends on the package and scope, but most commercials are delivered within 5–10 business days after the shoot. Rush delivery options are available on request.",
    },
    {
      q: "Do you travel for shoots outside Dubai & Pakistan?",
      a: "Yes. While we are based in Dubai & Pakistan, we regularly travel for regional and international commercial productions. Travel packages can be discussed during your discovery call.",
    },
    {
      q: "Can I customise a package for my brand?",
      a: "Absolutely. We offer fully flexible packages designed around your creative needs, campaign timeline, and budget — without ever compromising on quality.",
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
export default function DigitalVideoCommercials() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <>
      <SEO
        title="Digital Video Commercials Dubai & Pakistan | Fatography"
        description="Professional digital video commercials in Dubai & Pakistan with cinematic storytelling. Elevate your brand with Fatography. Book now!"
      />
      <Header />
      <div className="dvc-page">
        <VideoLightbox url={activeVideo} onClose={() => setActiveVideo(null)} />

        {/* ══ HERO ══ */}
        <header className="dvc-hero">
          <img
            src={BANNER_URL}
            alt="Digital Video Commercials"
            className="dvc-hero-bg"
          />

          <div className="dvc-hero-overlay-bottom" />
          <div className="dvc-hero-overlay-top" />
          <div className="dvc-hero-overlay-left" />
          <div className="dvc-hero-corner-tl" />
          <div className="dvc-hero-corner-br" />

          <div className="dvc-hero-content">
            <div className="dvc-hero-eyebrow">
              <span className="dvc-hero-line" />
              <p>Digital Video Commercials · Dubai & Pakistan</p>
              <span className="dvc-hero-line" />
            </div>
            <h1 className="dvc-hero-title">
              Digital Video
              <br />
              <span className="dvc-hero-title-accent">Commercials</span>
            </h1>
            <p className="dvc-hero-sub">
              Bold visuals, compelling narratives — commercials that stop the
              scroll and move your audience.
            </p>
            <div className="dvc-hero-cta-row">
              <Link
                to="/contact-us"
                className="dvc-hero-btn dvc-hero-btn--filled"
              >
                Start Your Campaign
              </Link>
              <a href="#films" className="dvc-hero-btn dvc-hero-btn--outline">
                Watch Commercials
              </a>
            </div>
          </div>

          <div className="dvc-hero-stats-bar">
            <div className="dvc-hero-stat">
              <strong>500+</strong>
              <span>Commercials Made</span>
            </div>
            <div className="dvc-stat-divider" />
            <div className="dvc-hero-stat">
              <strong>8+</strong>
              <span>Years Experience</span>
            </div>
            <div className="dvc-stat-divider" />
            <div className="dvc-hero-stat">
              <strong>4K</strong>
              <span>Ultra HD</span>
            </div>
            <div className="dvc-stat-divider" />
            <div className="dvc-hero-stat">
              <strong>100%</strong>
              <span>Brand Satisfaction</span>
            </div>
          </div>
        </header>

        {/* ══ STORY SECTION ══ */}
        <section className="dvc-story">
          <div className="dvc-story-inner">
            <div className="dvc-story-left">
              <span className="dvc-section-label">The Approach</span>
              <h2 className="dvc-story-title">
                Commercials That Capture Attention & Drive Results
              </h2>
              <div className="dvc-story-accent-line" />
            </div>
            <div className="dvc-story-right">
              <p className="dvc-story-para">
                At Fatography, we believe every brand has a story worth telling
                — and the right commercial can transform how the world sees your
                product. Our goal is to craft visuals with purpose, energy, and
                cinematic excellence.
              </p>
              <p className="dvc-story-para">
                From the initial concept to the final colour grade, we blend
                strategic thinking with artistic execution. Whether it's a
                15-second social ad or a full-length brand film, every frame is
                intentional.
              </p>
              <p className="dvc-story-para dvc-story-quote">
                "A great commercial doesn't just sell — it makes the audience
                feel something. That's what we create at Fatography."
              </p>
              <p className="dvc-story-para">
                At Fatography, we don't just produce commercials; we build
                visual identities that resonate, convert, and leave a lasting
                impression on every platform.
              </p>
            </div>
          </div>
        </section>

        {/* ══ VIDEO FILMS ══ */}
        <section className="dvc-gallery" id="films">
          <div className="dvc-gallery-header">
            <span className="dvc-section-label dvc-label-center">Our Work</span>
            <h2 className="dvc-gallery-title">Featured Commercial Films</h2>
            <p className="dvc-gallery-hint">
              Hover to preview · Click to watch full commercial
            </p>
          </div>
          <div className="dvc-video-grid">
            {VIDEO_DATA.map((video, i) => (
              <VideoCard
                key={i}
                video={video}
                index={i}
                onPlay={setActiveVideo}
              />
            ))}
          </div>
        </section>

        {/* ══ WHY US ══ */}
        <section className="dvc-why">
          <div className="dvc-why-inner">
            <div className="dvc-why-header">
              <span className="dvc-section-label">Why Fatography?</span>
              <h2 className="dvc-why-title">Crafted for Ambitious Brands</h2>
            </div>
            <div className="dvc-why-grid">
              {WHY_POINTS.map((pt, i) => (
                <div key={i} className="dvc-why-card">
                  <div className="dvc-why-icon">{pt.icon}</div>
                  <h3 className="dvc-why-label">{pt.label}</h3>
                  <p className="dvc-why-desc">{pt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
