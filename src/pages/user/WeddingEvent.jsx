import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/weddingEvent.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import ContactSection from "../../components/home/ContactSection";

/* ═══════════════════════════════════
   DATA — replace banner URL & video URLs
═══════════════════════════════════ */
const BANNER_URL =
  "https://res.cloudinary.com/djlshebp8/image/upload/v1776375954/services/shoots/ro5f6km5eb6ajdbhoupu.jpg";

const VIDEO_DATA = [
  {
    url: "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776895540/Wedding_Events_Videography_mgonvt.mp4",
    duration: "0:34",
    tag: "Wedding Events",
  },
  {
    url: "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776895554/Pre-Wedding_Videography_in_Dubai_gesofs.mp4",
    duration: "0:37",
    tag: "Wedding Events",
  },
  {
    url: "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776895522/Wedding_Events_Videography_3_cfbsxo.mp4",
    duration: "0:47",
    tag: "Wedding Events",
  },
  {
    url: "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776895516/Wedding_Events_Videography_2_v4o34q.mp4",
    duration: "0:59",
    tag: "Wedding Events",
  },
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
    label: "4K Cinematic Quality",
    desc: "Industry-grade cameras and cinema lenses for stunning, broadcast-ready results.",
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
    label: "Expert Food Styling",
    desc: "Every dish is styled to perfection — colours, textures, and plating that pop on screen.",
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
    label: "Macro & Slow-Mo",
    desc: "Capturing the drip, the sizzle, and the steam that makes food irresistible on camera.",
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
    desc: "We don't just film food — we tell the story behind your restaurant and culture.",
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
    label: "Multi-Format Delivery",
    desc: "Horizontal, vertical, square — every video delivered in all formats you need.",
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
    desc: "Professional editing and delivery within your timeline, without cutting corners.",
  },
];

/* ═══════════════════════════════════
   VIDEO CARD
═══════════════════════════════════ */
function VideoCard({ video, index, onPlay }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Thumbnail frame set (3 sec)
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

  // Hover play logic
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (hovered) {
      vid.currentTime = 0; // hover par start se play
      vid.play().catch(() => {});
    } else {
      vid.pause();
      vid.currentTime = 3; // hover hatne par 3 sec thumbnail
    }
  }, [hovered]);

  return (
    <div
      className="wev-video-card"
      style={{ "--idx": index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(video.url)}
    >
      <video
        ref={videoRef}
        src={video.url}
        className="wev-video-thumb"
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="wev-card-overlay"></div>
      <div className="wev-card-corner-tl"></div>
      <div className="wev-card-corner-br"></div>

      <div className="wev-card-tag">{video.tag}</div>

      <div className="wev-card-play">
        <div className="wev-play-ring"></div>

        <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
          <path d="M8 5.14v14l11-7-11-7z" />
        </svg>
      </div>

      <div className="wev-card-info">
        <div className="wev-card-meta">
          <span className="wev-card-duration">{video.duration}</span>
        </div>
      </div>

      <div className="wev-card-accent"></div>
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
    <div className="wev-vlb-overlay" onClick={onClose}>
      <button className="wev-vlb-close" onClick={onClose}>
        ✕
      </button>
      <div className="wev-vlb-player" onClick={(e) => e.stopPropagation()}>
        <video src={url} className="wev-vlb-video" controls autoPlay />
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
      q: "What makes Fatography different from other studios?",
      a: `we combine cinematic post-production, professional art direction, and a dedicated creative team to deliver imagery that goes far beyond ordinary photography. Every project is a visual story.`,
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
export default function WeddingEvent() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <>
      <Header />
      <div className="wev-page">
        <VideoLightbox url={activeVideo} onClose={() => setActiveVideo(null)} />

        {/* ══ HERO — single full banner image ══ */}
        <header className="wev-hero">
          {/* Full bleed background image */}
          <img src={BANNER_URL} alt="Wedding Event" className="wev-hero-bg" />

          {/* Layered shadow overlays */}
          <div className="wev-hero-overlay-bottom" />
          <div className="wev-hero-overlay-top" />
          <div className="wev-hero-overlay-left" />
          <div className="wev-hero-corner-tl" />
          <div className="wev-hero-corner-br" />

          {/* Content sits on top */}
          <div className="wev-hero-content">
            <div className="wev-hero-eyebrow">
              <span className="wev-hero-line" />
              <p>Wedding Events · Dubai</p>
              <span className="wev-hero-line" />
            </div>
            <h1 className="wev-hero-title">
              Wedding Events
              <br />
              <span className="wev-hero-title-accent">Videography</span>
            </h1>
            <p className="wev-hero-sub">
              Every glance, every tear, every laugh — immortalized with heart
              and artistry.
            </p>
            <div className="wev-hero-cta-row">
              <Link
                to="/contact-us"
                className="wev-hero-btn wev-hero-btn--filled"
              >
                Book Your Day
              </Link>
              <a href="#films" className="wev-hero-btn wev-hero-btn--outline">
                Watch Films
              </a>
            </div>
          </div>

          {/* Bottom stats bar */}
          <div className="wev-hero-stats-bar">
            <div className="wev-hero-stat">
              <strong>300+</strong>
              <span>Weddings Filmed</span>
            </div>
            <div className="wev-stat-divider" />
            <div className="wev-hero-stat">
              <strong>8+</strong>
              <span>Years Experience</span>
            </div>
            <div className="wev-stat-divider" />
            <div className="wev-hero-stat">
              <strong>4K</strong>
              <span>Ultra HD</span>
            </div>
            <div className="wev-stat-divider" />
            <div className="wev-hero-stat">
              <strong>100%</strong>
              <span>Client Love</span>
            </div>
          </div>
        </header>

        {/* ══ STORY SECTION ══ */}
        <section className="wev-story">
          <div className="wev-story-inner">
            <div className="wev-story-left">
              <span className="wev-section-label">The Narrative</span>
              <h2 className="wev-story-title">
                Capturing the Soul of Your Wedding Day
              </h2>
              <div className="wev-story-accent-line" />
            </div>
            <div className="wev-story-right">
              <p className="wev-story-para">
                At Fatography, we believe every wedding is more than just a
                celebration — it's a story of love, laughter, and lifelong
                promises. Our goal is to capture your day with heart and
                artistry, turning every moment into a timeless memory.
              </p>
              <p className="wev-story-para">
                From the quiet anticipation of the bride getting ready to the
                joy on your guests' faces, we beautifully blend
                documentary-style storytelling with cinematic elegance, ensuring
                every emotion is preserved forever.
              </p>
              <p className="wev-story-para wev-story-quote">
                "I'll be there from the laughter to the tears, the dance floor
                to the final goodbye — capturing it all naturally, without
                forcing a moment."
              </p>
              <p className="wev-story-para">
                At Fatography, we don't just record your day; we immortalize the
                feelings, the details, and the magic that make it uniquely
                yours.
              </p>
            </div>
          </div>
        </section>

        {/* ══ VIDEO FILMS ══ */}
        <section className="wev-gallery" id="films">
          <div className="wev-gallery-header">
            <span className="wev-section-label wev-label-center">
              Our Films
            </span>
            <h2 className="wev-gallery-title">Featured Wedding Films</h2>
            <p className="wev-gallery-hint">
              Hover to preview · Click to watch full film
            </p>
          </div>
          <div className="wev-video-grid">
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
        <section className="fdv-why">
          <div className="fdv-why-inner">
            <div className="fdv-why-header">
              <span className="fdv-section-label">Why Fatography?</span>
              <h2 className="fdv-why-title">Crafted for F&B Brands</h2>
            </div>
            <div className="fdv-why-grid">
              {WHY_POINTS.map((pt, i) => (
                <div key={i} className="fdv-why-card">
                  <div className="fdv-why-icon">{pt.icon}</div>
                  <h3 className="fdv-why-label">{pt.label}</h3>
                  <p className="fdv-why-desc">{pt.desc}</p>
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
