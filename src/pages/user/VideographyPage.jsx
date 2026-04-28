import React, { useEffect, useRef, useState } from "react";
import "../../style/videographyPage.css";

/* ═══════════════════════════════════
   VIDEO DATA  —  add your videos here
═══════════════════════════════════ */
const VIDEO_CATEGORIES = [
  {
    id: "pre-wedding",
    label: "Pre-Wedding",
    heading: "Pre-Wedding Videography",
    desc: "Cinematic pre-wedding films that capture the romance, chemistry, and anticipation before your big day.",
    videos: [
      {
        id: "pw-1",
        title: "Desert Romance — Dubai",
        location: "Dubai, UAE",
        duration: "3:24",
        src: "", // ← add your video URL here
        poster: "", // ← add thumbnail URL here
      },
      {
        id: "pw-2",
        title: "Golden Hour Session",
        location: "Burj Khalifa",
        duration: "2:48",
        src: "",
        poster: "",
      },
      {
        id: "pw-3",
        title: "Intimate Moments",
        location: "Old Dubai",
        duration: "4:10",
        src: "",
        poster: "",
      },
    ],
  },
  {
    id: "wedding",
    label: "Wedding",
    heading: "Wedding Videography",
    desc: "Full-day wedding coverage — every tear, every laugh, every vow — woven into a film you'll watch forever.",
    videos: [
      {
        id: "w-1",
        title: "The Grand Ceremony",
        location: "Atlantis, Dubai",
        duration: "8:15",
        src: "",
        poster: "",
      },
      {
        id: "w-2",
        title: "Garden Wedding Highlights",
        location: "Pakistan",
        duration: "6:40",
        src: "",
        poster: "",
      },
      {
        id: "w-3",
        title: "Nikah Highlights",
        location: "Lahore",
        duration: "5:55",
        src: "",
        poster: "",
      },
      {
        id: "w-4",
        title: "Baraat Cinematic",
        location: "Karachi",
        duration: "7:20",
        src: "",
        poster: "",
      },
    ],
  },
  {
    id: "food",
    label: "Food",
    heading: "Food Videography",
    desc: "Mouth-watering food films for restaurants, brands, and chefs — every frame makes you hungry.",
    videos: [
      {
        id: "f-1",
        title: "Chef's Table Series",
        location: "Dubai",
        duration: "1:30",
        src: "",
        poster: "",
      },
      {
        id: "f-2",
        title: "Street Food Chronicles",
        location: "Lahore",
        duration: "2:10",
        src: "",
        poster: "",
      },
      {
        id: "f-3",
        title: "Product Showcase Reel",
        location: "Studio",
        duration: "0:58",
        src: "",
        poster: "",
      },
    ],
  },
  {
    id: "corporate",
    label: "Corporate",
    heading: "Corporate Videography",
    desc: "Professional corporate films, event coverage, and brand stories that elevate your business image.",
    videos: [
      {
        id: "c-1",
        title: "Brand Launch Event",
        location: "Dubai",
        duration: "4:00",
        src: "",
        poster: "",
      },
      {
        id: "c-2",
        title: "Company Profile Film",
        location: "Islamabad",
        duration: "3:15",
        src: "",
        poster: "",
      },
    ],
  },
  {
    id: "fashion",
    label: "Fashion",
    heading: "Fashion Videography",
    desc: "Editorial fashion films and lookbook videos that blend art, movement, and style into one frame.",
    videos: [
      {
        id: "fa-1",
        title: "Summer Lookbook 2024",
        location: "Dubai Studio",
        duration: "2:30",
        src: "",
        poster: "",
      },
      {
        id: "fa-2",
        title: "Bridal Couture Film",
        location: "Lahore",
        duration: "3:05",
        src: "",
        poster: "",
      },
      {
        id: "fa-3",
        title: "Streetwear Campaign",
        location: "Karachi",
        duration: "1:45",
        src: "",
        poster: "",
      },
    ],
  },
];

/* ═══════════════════════════════════
   INLINE VIDEO CARD  — 16:9
═══════════════════════════════════ */
function VideoCard({ video }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  const toggle = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const onSeek = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * (v.duration || 0);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  /* placeholder gradient when no poster / src */
  const hasMedia = Boolean(video.src || video.poster);

  return (
    <div
      className={`vp-card${hovered ? " vp-card--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 16:9 video area */}
      <div className="vp-card-media" onClick={toggle}>
        {video.src ? (
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster || undefined}
            className="vp-card-video"
            playsInline
            loop
            muted={muted}
            onTimeUpdate={onTimeUpdate}
            onEnded={() => setPlaying(false)}
          />
        ) : video.poster ? (
          <img src={video.poster} alt={video.title} className="vp-card-video" />
        ) : (
          <div className="vp-card-placeholder">
            <div className="vp-card-placeholder-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M6 8l20 8-20 8V8z" fill="rgba(216,116,112,0.4)" />
              </svg>
            </div>
            <span>Video Coming Soon</span>
          </div>
        )}

        {/* dark gradient bottom */}
        <div className="vp-card-gradient" />

        {/* play / pause centre button */}
        {(video.src || video.poster) && (
          <div
            className={`vp-play-overlay${playing ? " vp-play-overlay--playing" : ""}`}
          >
            <div className="vp-play-btn">
              {playing ? (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect
                    x="5"
                    y="3"
                    width="4"
                    height="16"
                    rx="1.5"
                    fill="#000"
                  />
                  <rect
                    x="13"
                    y="3"
                    width="4"
                    height="16"
                    rx="1.5"
                    fill="#000"
                  />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M7 4l13 7-13 7V4z" fill="#000" />
                </svg>
              )}
            </div>
          </div>
        )}

        {/* top-right duration badge */}
        <div className="vp-duration-badge">{video.duration}</div>
      </div>

      {/* info + controls */}
      <div className="vp-card-info">
        <div className="vp-card-meta">
          <h3 className="vp-card-title">{video.title}</h3>
          <div className="vp-card-location">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 2.79 3.5 6.5 3.5 6.5s3.5-3.71 3.5-6.5C9.5 2.57 7.93 1 6 1z"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <circle cx="6" cy="4.5" r="1" fill="currentColor" />
            </svg>
            {video.location}
          </div>
        </div>

        {/* seek bar + mute (only when video src exists) */}
        {video.src && (
          <div className="vp-card-controls">
            <div className="vp-seek-bar" onClick={onSeek}>
              <div className="vp-seek-fill" style={{ width: `${progress}%` }} />
            </div>
            <button
              className="vp-mute-btn"
              onClick={toggleMute}
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 5h2L7 2v10L4 9H2V5z" fill="currentColor" />
                  <path
                    d="M9 5l2.5 2.5M11.5 5L9 7.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 5h2L7 2v10L4 9H2V5z" fill="currentColor" />
                  <path
                    d="M8.5 5c.9.6 1.5 1.6 1.5 2.5S9.4 9.4 8.5 10"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN PAGE
═══════════════════════════════════ */
export default function VideographyPage() {
  const [activeTab, setActiveTab] = useState(VIDEO_CATEGORIES[0].id);
  const lineRef = useRef(null);
  const heroRef = useRef(null);

  const activeCategory = VIDEO_CATEGORIES.find((c) => c.id === activeTab);

  /* scroll progress */
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const onScroll = () => {
      const pct = Math.min(
        window.scrollY / (document.body.scrollHeight - window.innerHeight),
        1,
      );
      el.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* parallax hero */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      hero.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="vp-page">
      {/* scroll line */}
      <div className="vp-scroll-line" ref={lineRef} />

      {/* ══ HERO ══ */}
      <header ref={heroRef} className="vp-hero">
        <div className="vp-hero-overlay" />

        <div className="vp-hero-brand">
          <span className="vp-hero-brand-dot" />
          Fatography Studio
        </div>

        <div className="vp-hero-content">
          <div className="vp-hero-tag">
            <span />
            <p>Videography</p>
            <span />
          </div>
          <h1 className="vp-hero-title">
            Stories Worth
            <br />
            <em className="vp-hero-em">Watching Forever</em>
          </h1>
          <p className="vp-hero-desc">
            Take a look at our videography work and see how Fatography captures
            pre-wedding shoots, weddings, food, fashion, and corporate stories
            in a cinematic, professional way — so you can trust us to tell your
            story beautifully through film.
          </p>
          <div className="vp-hero-btns">
            <a href="#videos" className="vp-btn vp-btn--filled">
              Watch Our Films
            </a>
            <a href="/contact" className="vp-btn vp-btn--ghost">
              Book a Session
            </a>
          </div>
        </div>

        <div className="vp-hero-scroll">
          <span className="vp-hero-scroll-label">Scroll</span>
          <span className="vp-hero-scroll-line" />
        </div>

        {/* stats */}
        <div className="vp-hero-stats">
          {[
            { val: "4K", lbl: "Ultra HD" },
            { val: "500+", lbl: "Films Produced" },
            { val: "15+", lbl: "Years Experience" },
            { val: "100%", lbl: "Client Satisfaction" },
          ].map((s, i, arr) => (
            <React.Fragment key={s.lbl}>
              <div className="vp-hero-stat">
                <strong>{s.val}</strong>
                <span>{s.lbl}</span>
              </div>
              {i < arr.length - 1 && <div className="vp-hero-stat-div" />}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* ══ CATEGORY TABS + VIDEOS ══ */}
      <section className="vp-main" id="videos">
        {/* sticky tab bar */}
        <div className="vp-tabs-wrap">
          <div className="vp-tabs">
            {VIDEO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`vp-tab${activeTab === cat.id ? " vp-tab--active" : ""}`}
                onClick={() => setActiveTab(cat.id)}
              >
                {cat.label}
                <span className="vp-tab-count">{cat.videos.length}</span>
              </button>
            ))}
          </div>
        </div>

        {/* category heading */}
        {activeCategory && (
          <div className="vp-cat-header">
            <div className="vp-cat-header-inner">
              <span className="vp-eyebrow">{activeCategory.label} Films</span>
              <h2 className="vp-cat-title">{activeCategory.heading}</h2>
              <p className="vp-cat-desc">{activeCategory.desc}</p>
            </div>
          </div>
        )}

        {/* video grid */}
        {activeCategory && (
          <div className="vp-grid-wrap">
            <div className="vp-grid">
              {activeCategory.videos.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ══ WHY SECTION ══ */}
      <section className="vp-why">
        <div className="vp-why-inner">
          <div className="vp-why-text">
            <span className="vp-eyebrow">Why Fatography?</span>
            <h2 className="vp-why-title">
              Cinema-Grade.
              <br />
              Every Single Frame.
            </h2>
            <p className="vp-why-desc">
              We combine industry-leading equipment, a seasoned creative team,
              and meticulous post-production to deliver films that don't just
              document — they move people.
            </p>
          </div>
          <div className="vp-why-cards">
            {[
              {
                icon: "🎬",
                title: "4K Cinematic",
                desc: "Shot on professional cinema cameras with prime lenses.",
              },
              {
                icon: "🎵",
                title: "Sound Design",
                desc: "Bespoke audio mixes, ambient sound, and licensed music.",
              },
              {
                icon: "🎨",
                title: "Color Grading",
                desc: "Hollywood-standard grading that sets the mood of every scene.",
              },
              {
                icon: "✂️",
                title: "Expert Editing",
                desc: "Narrative-driven cuts that keep your audience captivated.",
              },
              {
                icon: "📡",
                title: "Drone Aerials",
                desc: "Sweeping aerial shots that add scale and grandeur.",
              },
              {
                icon: "⚡",
                title: "Fast Delivery",
                desc: "Highlight reels within 7 days, full films within 3 weeks.",
              },
            ].map((w) => (
              <div key={w.title} className="vp-why-card">
                <span className="vp-why-card-icon">{w.icon}</span>
                <h3 className="vp-why-card-title">{w.title}</h3>
                <p className="vp-why-card-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER CTA ══ */}
      <footer className="vp-footer">
        <div className="vp-footer-inner">
          <p className="vp-eyebrow vp-eyebrow--center">Ready to create?</p>
          <h2 className="vp-footer-title">Let's Tell Your Story on Film</h2>
          <a href="/contact" className="vp-btn vp-btn--filled">
            Book a Session
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M7.5 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
