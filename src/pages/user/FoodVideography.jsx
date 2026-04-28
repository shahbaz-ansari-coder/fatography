import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/foodVideography.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";

/* ═══════════════════════════════════
   DATA — replace with real URLs
═══════════════════════════════════ */
const BANNER_URL =
  "https://res.cloudinary.com/djlshebp8/image/upload/v1776376696/services/shoots/qjsjjya5aakdb1aqz0dz.jpg";

const VIDEO_DATA = [
  {
    url: "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776895642/Food_Videography_odmo4r.mp4",
    duration: "0:15",
    tag: "Food Videography",
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

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (hovered) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    } else {
      vid.pause();
      vid.currentTime = 0;
    }
  }, [hovered]);

  return (
    <div
      className="fdv-video-card"
      style={{ "--idx": index }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(video.url)}
    >
      <video
        ref={videoRef}
        src={video.url}
        className="fdv-video-thumb"
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="fdv-card-overlay" />
      <div className="fdv-card-corner-tl" />
      <div className="fdv-card-corner-br" />
      <div className="fdv-card-tag">{video.tag}</div>
      <div className="fdv-card-play">
        <div className="fdv-play-ring" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
          <path d="M8 5.14v14l11-7-11-7z" />
        </svg>
      </div>
      <div className="fdv-card-info">
        <span className="fdv-card-category">{video.category}</span>
        <h3 className="fdv-card-title">{video.title}</h3>
        <span className="fdv-card-duration">{video.duration}</span>
      </div>
      <div className="fdv-card-accent" />
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
    <div className="fdv-vlb-overlay" onClick={onClose}>
      <button className="fdv-vlb-close" onClick={onClose}>
        ✕
      </button>
      <div className="fdv-vlb-player" onClick={(e) => e.stopPropagation()}>
        <video src={url} className="fdv-vlb-video" controls autoPlay />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN PAGE
═══════════════════════════════════ */
export default function FoodVideography() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <>
      <Header />
      <div className="fdv-page">
        <VideoLightbox url={activeVideo} onClose={() => setActiveVideo(null)} />

        {/* ══ HERO — full bleed single image ══ */}
        <header className="fdv-hero">
          <img
            src={BANNER_URL}
            alt="Food Videography"
            className="fdv-hero-bg"
          />

          {/* Shadow layers */}
          <div className="fdv-hero-shade-bottom" />
          <div className="fdv-hero-shade-top" />
          <div className="fdv-hero-shade-left" />
          <div className="fdv-hero-corner-tl" />
          <div className="fdv-hero-corner-br" />

          {/* Content */}
          <div className="fdv-hero-content">
            <div className="fdv-hero-eyebrow">
              <span className="fdv-hero-line" />
              <p>Food Videography · Dubai</p>
              <span className="fdv-hero-line" />
            </div>
            <h1 className="fdv-hero-title">
              Food
              <br />
              <span className="fdv-hero-title-accent">Videography</span>
            </h1>
            <p className="fdv-hero-sub">
              Making food irresistible on screen — cinematic visuals that drive
              appetite, engagement, and sales.
            </p>
            <div className="fdv-hero-cta-row">
              <Link
                to="/contact-us"
                className="fdv-hero-btn fdv-hero-btn--filled"
              >
                Get a Quote
              </Link>
              <a href="#films" className="fdv-hero-btn fdv-hero-btn--outline">
                Watch Films
              </a>
            </div>
          </div>

          {/* Stats bar */}
          <div className="fdv-hero-stats-bar">
            <div className="fdv-hero-stat">
              <strong>150+</strong>
              <span>Brands Served</span>
            </div>
            <div className="fdv-stat-divider" />
            <div className="fdv-hero-stat">
              <strong>4K</strong>
              <span>Ultra HD</span>
            </div>
            <div className="fdv-stat-divider" />
            <div className="fdv-hero-stat">
              <strong>1000+</strong>
              <span>Dishes Filmed</span>
            </div>
            <div className="fdv-stat-divider" />
            <div className="fdv-hero-stat">
              <strong>Dubai</strong>
              <span>Based Studio</span>
            </div>
          </div>
        </header>

        {/* ══ INTRO ══ */}
        <section className="fdv-intro">
          <div className="fdv-intro-inner">
            <div className="fdv-intro-left">
              <span className="fdv-section-label">What We Do</span>
              <h2 className="fdv-intro-title">
                We Make Food Look
                <br />
                <span className="fdv-intro-title-accent">Irresistible</span>
              </h2>
              <div className="fdv-intro-line" />
            </div>
            <div className="fdv-intro-right">
              <p className="fdv-intro-para">
                At Fatography, we specialize in turning your food into a visual
                feast. Whether you run a high-end restaurant, a café, a catering
                brand, or a food product line — our cinematic food videography
                captures the textures, colours, steam, and sizzle that make
                viewers crave what they see.
              </p>
              <p className="fdv-intro-para">
                We combine expert food styling, professional lighting, macro
                lenses, and slow-motion capture to create videos that don't just
                look beautiful — they drive real results. From social media
                reels to full broadcast commercials, every frame is crafted to
                make your food unforgettable.
              </p>
              <p className="fdv-intro-para">
                Our team understands that great food videography is equal parts
                art and strategy. We align every visual decision with your brand
                identity and marketing goals, ensuring your content stands out
                in a crowded digital landscape.
              </p>
            </div>
          </div>
        </section>

        {/* ══ VIDEO GALLERY ══ */}
        <section className="fdv-gallery" id="films">
          <div className="fdv-gallery-header">
            <span className="fdv-section-label fdv-label-center">
              Our Films
            </span>
            <h2 className="fdv-gallery-title">Featured Food Films</h2>
            <p className="fdv-gallery-hint">
              Hover to preview · Click to watch full film
            </p>
          </div>
          <div className="fdv-video-grid">
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
              <h2 className="fdv-why-title">
                Crafted for
                F&B Brands
              </h2>
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
      <Footer />
    </>
  );
}
