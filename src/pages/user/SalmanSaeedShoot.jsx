import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../../style/actorShoot.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import ContactSection from "../../components/home/ContactSection";
import SEO from "../../components/home/SEO";

/* ═══════════════════════════════════
   LIGHTBOX  — with arrow navigation
═══════════════════════════════════ */
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    setCurrent(startIndex);
  }, [startIndex]);

  useEffect(() => {
    if (!images.length) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft")
        setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [images, onClose]);

  if (!images.length) return null;
  return (
    <div className="fsg-lb-overlay" onClick={onClose}>
      <button className="fsg-lb-close" onClick={onClose}>
        ✕
      </button>

      {images.length > 1 && (
        <button
          className="asp-lb-arrow asp-lb-arrow--left"
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((c) => (c - 1 + images.length) % images.length);
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12.5 4.5L7 10l5.5 5.5"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <img
        src={images[current]}
        alt={`preview-${current + 1}`}
        className="fsg-lb-img"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          className="asp-lb-arrow asp-lb-arrow--right"
          onClick={(e) => {
            e.stopPropagation();
            setCurrent((c) => (c + 1) % images.length);
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7.5 4.5L13 10l-5.5 5.5"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className="asp-lb-counter">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   VIDEO PLAYER  — custom controls
═══════════════════════════════════ */
function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);

  // ▶️ Play / Pause toggle
  const toggle = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  // 📊 Progress update
  const onTimeUpdate = () => {
    if (!videoRef.current) return;

    const { currentTime, duration } = videoRef.current;
    if (duration) setProgress((currentTime / duration) * 100);
  };

  // ⏩ Seek bar
  const onSeek = (e) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;

    videoRef.current.currentTime = ratio * (videoRef.current.duration || 0);
  };

  // 🔇 Mute toggle
  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  // 👀 Scroll auto pause (IMPORTANT FEATURE)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          setPlaying(false);
        }
      },
      {
        threshold: 0.5, // 50% visible = active
      },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="asp-video-wrap">
      <div className="asp-video-inner" onClick={toggle}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="asp-video-el"
          playsInline
          loop
          onTimeUpdate={onTimeUpdate}
          onEnded={() => setPlaying(false)}
          onClick={(e) => e.stopPropagation()}
        />

        {/* ▶️ Play Overlay */}
        {!playing && (
          <div className="asp-video-play-overlay">
            <div className="asp-video-play-btn">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M8 5.5l14 7.5-14 7.5V5.5z" fill="#000" />
              </svg>
            </div>
            <p className="asp-video-play-label">Play Showreel</p>
          </div>
        )}

        {/* 📌 Badge */}
        <div className="asp-video-badge">
          <span className="asp-video-badge-dot" />
          Behind The Lens
        </div>
      </div>

      {/* 🎛 Controls */}
      <div className="asp-video-controls">
        <button className="asp-vc-btn" onClick={toggle}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect
                x="3"
                y="2"
                width="3.5"
                height="12"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="9.5"
                y="2"
                width="3.5"
                height="12"
                rx="1"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2.5l10 5.5-10 5.5V2.5z" fill="currentColor" />
            </svg>
          )}
        </button>

        {/* Progress Bar */}
        <div className="asp-vc-bar" onClick={onSeek}>
          <div className="asp-vc-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* 🔊 Mute */}
        <button className="asp-vc-btn" onClick={toggleMute}>
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 5.5h2.5L8 2v12l-3.5-3.5H2V5.5z" fill="currentColor" />
              <path
                d="M10.5 6L13.5 9M13.5 6L10.5 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 5.5h2.5L8 2v12l-3.5-3.5H2V5.5z" fill="currentColor" />
              <path
                d="M10 5.5c1.1.7 1.8 1.9 1.8 3.5S11.1 11.8 10 12.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   GALLERY CARD  — identical to ServicesPage
═══════════════════════════════════ */
const ROTATIONS = [
  "-5deg",
  "3deg",
  "-4deg",
  "6deg",
  "-2deg",
  "4deg",
  "-6deg",
  "3deg",
  "-3deg",
  "5deg",
];

function GalleryCard({ src, index, onImageClick }) {
  const rot = ROTATIONS[index % ROTATIONS.length];
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = `rotate(${rot}) translateY(28px)`;
    const t = setTimeout(
      () => {
        el.style.transition = "opacity 0.45s ease, transform 0.45s ease";
        el.style.opacity = "1";
        el.style.transform = `rotate(${rot})`;
        const t2 = setTimeout(() => {
          el.style.transition = "";
          el.style.transform = "";
          el.style.setProperty("--fsg-rot", rot);
        }, 480);
        return () => clearTimeout(t2);
      },
      50 + index * 60,
    );
    return () => clearTimeout(t);
  }, [rot, index]);

  return (
    <div
      ref={cardRef}
      className="fsg-card"
      style={{ "--fsg-rot": rot }}
      onClick={() => onImageClick(index)}
    >
      <img src={src} alt={`frame-${index + 1}`} loading="lazy" />
      <div className="fsg-card-shine" />
      <div className="fsg-card-overlay">
        <div className="fsg-card-overlay-circle">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3.75 9h10.5M9 3.75l5.25 5.25L9 14.25"
              stroke="#000"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
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
export default function SalmanSaeedShoot() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lbIndex, setLbIndex] = useState(-1);
  const heroRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://fatography-backend.vercel.app/api/celebrity-shoot/get/salman-saeed`,
        );
        const result = await res.json();
        if (result.success) setData(result.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* parallax */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      hero.style.backgroundPositionY = `${window.scrollY * 0.35}px`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [data]);

  if (loading)
    return (
      <div className="fsg-loader">
        <div className="fsg-loader-ring">
          <span />
          <span />
        </div>
        <p className="fsg-loader-text">Loading Studio</p>
      </div>
    );

  if (!data)
    return (
      <div className="fsg-error-screen">
        <span className="fsg-error-code">404</span>
        <p>Shoot Not Found</p>
      </div>
    );

  const images = data.images || [];
  const thumbnails = data.thumbnails || [];
  const hasVideo = Boolean(data.video);
  const coverSrc = images[0] || thumbnails[0] || "";
  const videoPoster = thumbnails[0] || images[0] || "";

  return (
    <>
      <SEO
        title="Salman Saeed Photoshoot Dubai | Fatography"
        description="Professional celebrity photoshoot of Salman Saeed in Dubai by Fatography. Stylish visuals & portraits. View full gallery!"
      />
      <Header />
      <div className="fsg-page asp-page">
        {lbIndex >= 0 && (
          <Lightbox
            images={images}
            startIndex={lbIndex}
            onClose={() => setLbIndex(-1)}
          />
        )}

        {/* ══ HERO ══ */}
        <header ref={heroRef} className="fato-celeb__hero">
          {/* ── LEFT: Content ── */}
          <div className="fato-celeb__content">
            <div className="fato-celeb__tag">
              <span className="fato-celeb__tag-line" />
              <p>Celebrity Shoot</p>
              <span className="fato-celeb__tag-line" />
            </div>

            <h1 className="fato-celeb__title">{data.celebrityName}</h1>
            <p className="fato-celeb__sub">Frames that define icons.</p>

            <div className="fato-celeb__meta">
              {data.photographer && (
                <div className="fato-celeb__meta-item">
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                    <circle
                      cx="7"
                      cy="5"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>{data.photographer}</span>
                </div>
              )}
              {data.location && (
                <div className="fato-celeb__meta-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1.5C4.79 1.5 3 3.29 3 5.5c0 3.25 4 7 4 7s4-3.75 4-7c0-2.21-1.79-4-4-4z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <circle cx="7" cy="5.5" r="1.2" fill="currentColor" />
                  </svg>
                  <span>{data.location}</span>
                </div>
              )}
            </div>

            <div className="fato-celeb__cta-row">
              <a
                href="/contact"
                className="fato-celeb__btn fato-celeb__btn--filled"
              >
                Book a Session
              </a>
              <a
                href="#gallery"
                className="fato-celeb__btn fato-celeb__btn--outline"
              >
                View Gallery
              </a>
            </div>
          </div>

          {/* ── RIGHT: Image with gradient fade ── */}
          <div className="fato-celeb__img-wrap">
            <div className="fato-celeb__img-fade" />
            <img
              src={coverSrc}
              alt={data.celebrityName}
              className="fato-celeb__img"
            />
          </div>

          {/* ── Scroll indicator ── */}
          <div className="fato-celeb__scroll"></div>
        </header>
        {/* ══ VIDEO SECTION ══ */}
        {hasVideo && (
          <section className="asp-video-section">
            <div className="asp-video-section-inner">
              <div className="asp-video-text">
                <span className="fsg-section-label">Pre-Wedding Film</span>

                <h2 className="asp-video-heading">
                  Pre-Wedding Photography Video in Dubai
                </h2>

                <p className="asp-video-sub">
                  Experience how Fatography captures love stories in cinematic
                  style. This pre-wedding highlight showcases real emotions,
                  creative direction, and premium storytelling — crafted with
                  detail, passion, and elegance.
                </p>

                <div className="asp-video-info-row">
                  {data.photographer && (
                    <div className="asp-vi-item">
                      <span className="asp-vi-label">Photographer</span>
                      <span className="asp-vi-val">{data.photographer}</span>
                    </div>
                  )}

                  {data.location && (
                    <div className="asp-vi-item">
                      <span className="asp-vi-label">Location</span>
                      <span className="asp-vi-val">{data.location}</span>
                    </div>
                  )}

                  <div className="asp-vi-item">
                    <span className="asp-vi-label">Total Frames</span>
                    <span className="asp-vi-val">{images.length} Photos</span>
                  </div>
                </div>
              </div>

              <VideoPlayer src={data.video} poster={videoPoster} />
            </div>
          </section>
        )}

        {/* ══ GALLERY ══ */}
        {images.length > 0 && (
          <section className="fsg-gallery" id="gallery">
            <div className="fsg-gallery-header">
              <span className="fsg-section-label fsg-label--center">
                Full Portfolio
              </span>
              <h2 className="fsg-gallery-title">
                {data.celebrityName} — Selected Frames
              </h2>
            </div>
            <div className="fsg-cards-grid">
              {images.map((url, i) => (
                <GalleryCard
                  key={i}
                  src={url}
                  index={i}
                  onImageClick={setLbIndex}
                />
              ))}
            </div>
          </section>
        )}
      </div>
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
