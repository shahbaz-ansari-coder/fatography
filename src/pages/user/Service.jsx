import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../style/servicePage.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import ContactSection from "../../components/home/ContactSection";
import SEO from "../../components/home/SEO";

/* ═══════════════════════════════════
   SLUG HELPERS
═══════════════════════════════════ */
function normalizeSlug(str) {
  return (str || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Turns a slug like "black-and-white" or "fashion-photography"
 * into a readable fallback title: "Black And White" / "Fashion Photography".
 * This is what shows up BEFORE the API responds, so the <title>/<meta>
 * is correct from the very first paint instead of flashing a generic
 * "Photography Dubai | Fatography" and then swapping.
 */
function slugToTitleCase(slug) {
  return (slug || "")
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ═══════════════════════════════════
   SERVICE-WISE SEO DATA
   NOTE: keys here MUST be the output of normalizeSlug(paramTitle),
   never the raw display string. "&" always becomes "and".
═══════════════════════════════════ */
const SERVICE_SEO = {
  "fashion-photography": {
    title: "Fashion & Editorial Photography Dubai | Fatography",
    description:
      "High-fashion, designer & editorial photography in Dubai. From thematic concepts to candid glamour — Fatography turns style into timeless art.",
  },
  "pre-wedding-shoots": {
    title: "Pre-Wedding Photography Dubai | Fatography Dubai",
    description:
      "Pre-wedding photography across cultures — UK, USA, UAE & Pakistan. Fatography's female photographer brings discretion & artistry to every ritual.",
  },
  "wedding-events": {
    title: "Wedding Photography & Videography Dubai | Fatography",
    description:
      "Fatography brings years of experience in wedding photography & videography in Dubai— capturing every ritual, every emotion. Book your session.",
  },
  "lifestyle-photography": {
    title: "Luxury Lifestyle Photography Dubai | Fatography",
    description:
      "Fatography offers luxury lifestyle photography in Dubai — cars, home & candid shoots with creative direction, your vibe, your tones. Book now.",
  },
  "food-photography": {
    title: "Food Photography Dubai | Fatography",
    description:
      "Mouth-watering food photography in Dubai. Fatography creates vibrant, appetizing visuals for restaurants, menus, and brands with expert styling and lighting.",
  },
  "maternity-photography": {
    title: "Maternity Photography & Videography Dubai | Fatography",
    description:
      "Fatography offers culturally respectful, confidential maternity photography & videography in Dubai, capturing every glow. Book your session.",
  },
  "black-and-white": {
    title: "Black & White Photography Dubai | Fatography",
    description:
      "Fatography offers all types of black & white photography in Dubai — fine art, portrait & documentary mono, printed as large statement frames. Book now.",
  },
  "product-photography": {
    title: "Product Photography Dubai | Fatography",
    description:
      "Premium product photography in Dubai. Fatography delivers crisp, high-quality commercial visuals that make your brand and products stand out.",
  },
  "family-photography": {
    title: "Family Photography Dubai | Fatography",
    description:
      "Warm, heartfelt family photography in Dubai. Fatography captures genuine connection and cherished memories with a natural, cinematic touch.",
  },
  "event-coverage": {
    title: "Event Coverage Photography Dubai | Fatography",
    description:
      "Professional event photography & videography in Dubai — from Gulfood to fashion launches. Fatography delivers polished coverage. Book today",
  },
  "real-estate": {
    title: "Real Estate Photography Dubai | Fatography",
    description:
      "Fatography offers real estate photography in Dubai for agents & developers — listings that drive instant inquiries and sell faster. Book now.",
  },
  "neon-photography": {
    title: "Neon Photography Dubai | Fatography",
    description:
      "Fatography offers creative neon photography in Dubai — bold color, striking lighting & editorial style. Book your neon shoot today.",
  },
  "corporate-and-linkedin": {
    title: "Corporate & LinkedIn Photography Dubai | Fatography",
    description:
      "Professional corporate and LinkedIn headshots in Dubai. Fatography delivers polished, confident portraits that elevate your personal and professional brand.",
  },
  "fitness-photography": {
    title: "Fitness Photography Dubai | Fatography",
    description:
      "Fatography offers luxury fitness photography in Dubai — capturing strength, discipline & transformation. Book your session.",
  },
  "commercial-events": {
    title: "Commercial Event Coverage Photography Dubai | Fatography",
    description:
      "Professional commercial event photography & videography in Dubai — from exhibitions and branded booths to large-scale shows. Fatography delivers polished coverage.",
  },
};

const VIDEO_SECTIONS = {
  "maternity-photography": {
    url: "/videos-assets/videography-videos/maternity_shoot.mp4",
    duration: "0:54",
    tag: "Maternity Videography",
    heading: "Maternity Videography in Dubai",
    description:
      "Experience how Fatography brings maternity to life through cinematic videography — capturing texture, warmth, and every precious moment.",
    photographer: "Fatography Studio",
    location: "Dubai, UAE",
  },
  "real-estate": {
    url: "/videos-assets/videography-videos/real-estate-videography.mp4",
    duration: "0:48",
    tag: "Real Estate Videography",
    heading: "Real Estate Videography in Dubai",
    description:
      "Experience how Fatography brings maternity to life through cinematic videography — capturing texture, warmth, and every precious moment.",
    photographer: "Fatography Studio",
    location: "Dubai, UAE",
  },

  // Naya video section chahiye kisi aur service page par?
  // Neeche is tarah entry add karein — key hamesha normalizeSlug() ka
  // output honi chahiye (jaisa upar SERVICE_SEO mein hai), raw string nahi:
  //
  // "wedding-events": {
  //   url: "/videos-assets/videography-videos/wedding_shoot.mp4",
  //   duration: "0:20",
  //   tag: "Wedding Videography",
  //   heading: "Wedding Videography in Dubai",
  //   description: "...",
  //   photographer: "Fatography Studio",
  //   location: "Dubai, UAE",
  // },
};

function getServiceSEO(paramTitle, fallbackTitle) {
  const key = normalizeSlug(paramTitle);
  if (SERVICE_SEO[key]) return SERVICE_SEO[key];

  const safeTitle = fallbackTitle || slugToTitleCase(key) || "Photography";
  return {
    title: `${safeTitle} Dubai | Fatography`,
    description: `Looking for a ${safeTitle.toLowerCase()} shoot in Dubai? Fatography captures natural, cinematic portraits that reflect your story and style. Book your photoshoot today.`,
  };
}

function getVideoSection(paramTitle) {
  const key = normalizeSlug(paramTitle);
  return VIDEO_SECTIONS[key] || null;
}

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
      <button
        className="ftg-lb-close"
        onClick={onClose}
        aria-label="Close preview"
      >
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
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
   VIDEO PLAYER — custom controls
═══════════════════════════════════ */
function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);

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

  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration) setProgress((currentTime / duration) * 100);
  };

  const onSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * (videoRef.current.duration || 0);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  // Reset player state whenever the video source changes (navigating
  // between service pages that both have a video section).
  useEffect(() => {
    setPlaying(false);
    setProgress(0);
  }, [src]);

  /* Auto-pause when scrolled out of view */
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
      { threshold: 0.5 },
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
          className="asp-video-el"
          playsInline
          loop
          onTimeUpdate={onTimeUpdate}
          onEnded={() => setPlaying(false)}
          onClick={(e) => e.stopPropagation()}
        />

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

        <div className="asp-video-badge">
          <span className="asp-video-badge-dot" />
          Behind The Lens
        </div>
      </div>

      <div className="asp-video-controls">
        <button
          className="asp-vc-btn"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
        >
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

        <div className="asp-vc-bar" onClick={onSeek}>
          <div className="asp-vc-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <button
          className="asp-vc-btn"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
        >
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
   MAIN PAGE
═══════════════════════════════════ */
export default function ServicePage() {
  const { title } = useParams();

  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const heroRef = useRef(null);
  const handleClose = useCallback(() => setLightboxSrc(null), []);

  /*
   * ─── SEO — computed synchronously from the URL, on every render ───
   * This is the fix for "title/desc pehle kuch aur dikhata hai phir
   * change hota hai": previously <SEO> was only rendered AFTER
   * serviceData had loaded, so between navigation and the API response
   * the tab kept showing the *previous* page's title, then jumped to
   * the new one once data arrived. By deriving seoData straight from
   * the `title` slug (with a readable fallback) we get the correct
   * meta tags on the very first render, before any network call
   * finishes — and it's re-derived again once the exact API title
   * comes in, so precise copy still wins when available.
   */
  const seoData = useMemo(
    () => getServiceSEO(title, serviceData?.title),
    [title, serviceData],
  );
  const videoData = useMemo(() => getVideoSection(title), [title]);

  /*
   * ─── Data fetching ───
   * FIX: the original effect had an empty dependency array ([]), so it
   * only ran once when the component first mounted. Because React
   * Router reuses the same component instance for routes like
   * "/services/:title" when you navigate from one service to another
   * via <Link>, that meant the fetch never re-ran on navigation and
   * the page kept showing the PREVIOUS service's data/SEO until a full
   * hard reload. Depending on [title] fixes that.
   *
   * An AbortController is used so that if the user navigates again
   * quickly (before the first request finishes), the stale response
   * is ignored instead of overwriting the newer page's data — a
   * classic race condition that also produces "wrong data flashes
   * then changes" symptoms.
   */
  useEffect(() => {
    if (!title) return;

    const controller = new AbortController();

    setLoading(true);
    setNotFound(false);
    setServiceData(null);
    setLightboxSrc(null);
    window.scrollTo({
      top: 0,
      behavior: "instant" in window ? "instant" : "auto",
    });

    const fetchService = async () => {
      try {
        const res = await fetch(
          `https://fatography-backend.vercel.app/api/services/single-data/${title}`,
          { signal: controller.signal },
        );
        const result = await res.json();

        if (result.success) {
          setServiceData(result.data);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
          setNotFound(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchService();

    return () => controller.abort();
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
      <>
        <SEO title={seoData.title} description={seoData.description} />
        <div className="ftg-loader">
          <div className="ftg-loader-ring">
            <span />
            <span />
          </div>
          <p className="ftg-loader-text">Loading Studio</p>
        </div>
      </>
    );
  }

  if (notFound || !serviceData) {
    return (
      <>
        <SEO title={seoData.title} description={seoData.description} />
        <div className="ftg-error-screen">
          <span className="ftg-error-code">404</span>
          <p>Service Not Found</p>
        </div>
      </>
    );
  }

  const shoots = serviceData.shoots || [];

  /* Flatten ALL images from all shoots into one array */
  const allImages = shoots.flatMap((shoot) =>
    (shoot.images || []).map((img) => ({ url: img.url, _id: img._id })),
  );

  return (
    <>
      <SEO title={seoData.title} description={seoData.description} />
      <Header />
      <div className="ftg-page">
        <Lightbox src={lightboxSrc} onClose={handleClose} />

        {/* ══ HERO BANNER ══ */}
        <header
          ref={heroRef}
          className="fsg-hero"
          style={{ backgroundImage: `url(${serviceData.banner?.url})` }}
        >
          <div className="fsg-hero-gradient" />

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

          <div className="fsg-hero-scroll">
            <span className="fsg-hero-scroll-label">Scroll</span>
            <span className="fsg-hero-scroll-line" />
          </div>

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

        {/* ══ VIDEO SECTION — only when this slug has a VIDEO_SECTIONS entry ══ */}
        {videoData && (
          <section className="asp-video-section">
            <div className="asp-video-section-inner">
              <div className="asp-video-text">
                <span className="fsg-section-label">{videoData.tag}</span>
                <h2 className="asp-video-heading">{videoData.heading}</h2>
                <p className="asp-video-sub">{videoData.description}</p>

                <div className="asp-video-info-row">
                  <div className="asp-vi-item">
                    <span className="asp-vi-label">Studio</span>
                    <span className="asp-vi-val">{videoData.photographer}</span>
                  </div>
                  <div className="asp-vi-item">
                    <span className="asp-vi-label">Location</span>
                    <span className="asp-vi-val">{videoData.location}</span>
                  </div>
                  <div className="asp-vi-item">
                    <span className="asp-vi-label">Total Frames</span>
                    <span className="asp-vi-val">
                      {allImages.length} Photos
                    </span>
                  </div>
                </div>
              </div>

              <VideoPlayer src={videoData.url} />
            </div>
          </section>
        )}

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
      </div>
      <FaqSection serviceTitle={serviceData.title} />
      <ContactSection />
      <Footer />
    </>
  );
}
