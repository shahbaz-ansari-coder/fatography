import React, { useEffect, useRef, useState } from "react";
import "../../style/aboutus.css";
import Footer from "../../components/home/Footer";
import Header from "../../components/home/Header";
import Preloader from "../../components/home/Preloader";
import { Link } from "react-router";
import ContactSection from "../../components/home/ContactSection";
import SEO from "../../components/home/SEO";

/* ─── animated counter ─── */
function Counter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="ab-stat-num">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── services list ─── */
const SERVICES = [
  {
    n: "01",
    label: "Studio Videos",
    desc: "Creative studio video photography for compelling storytelling.",
  },
  {
    n: "02",
    label: "Studio Sessions",
    desc: "Capture moments in studio sessions, crafting timeless imagery.",
  },
  {
    n: "03",
    label: "Retouching Photo",
    desc: "Enhance photos with expert retouching services.",
  },
  {
    n: "04",
    label: "Print Studio",
    desc: "Professional photography for timeless prints.",
  },
];

/* ─── skills ─── */
const SKILLS = [
  { label: "Luxury Wedding Photography", pct: 97 },
  { label: "Celebrity & Fashion Shoots", pct: 95 },
  { label: "Event & Corporate Coverage", pct: 94 },
  { label: "Commercial & Brand Photography", pct: 93 },
  { label: "Professional Retouching", pct: 92 },
  { label: "Advanced Color Grading", pct: 90 },
];

/* ─── stats ─── */
const STATS = [
  { target: 2009, suffix: "", label: "Founding Year" },
  { target: 2000, suffix: "+", label: "Happy Customers" },
  { target: 50, suffix: "+", label: "Companies" },
  { target: 1500, suffix: "+", label: "Projects Done" },
  { target: 2, suffix: "", label: "Offices" },
  { target: 2, suffix: "", label: "Studios" },
];

/* ════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════ */
export default function AboutPage() {
  const lineRef = useRef(null);

  /* subtle scroll-driven line animation */
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

  return (
    <>
      <Preloader />
      <SEO
        title="About Fatography | Top Photographers in Dubai"
        description="Learn about Fatography, a leading photography and videography company in Dubai. Discover our passion, expertise, and creative approach. Contact us today!"
      />
      <div className="ab-page">
        <Header />
        {/* scroll progress line */}
        <div className="ab-scroll-line" ref={lineRef} />

        {/* ══ HERO ══ */}
        <section className="ab-hero">
          <div className="ab-hero-bg">
            <img src="/fatima.jpg" alt="" className="ab-hero-bg-img" />
            <div className="ab-hero-bg-overlay" />
          </div>

          <div className="ab-hero-inner">
            <div className="ab-hero-left">
              <div className="ab-pill">
                <span className="ab-pill-dot" />
                Introduction
              </div>
              <h1 className="ab-hero-title">
                Welcome to
                <br />
                <em className="ab-hero-em">Fatography</em>
              </h1>
              <p className="ab-hero-desc">
                Fatography is a professional photography and creative production
                company based in Dubai, UAE. Founded with a vision to deliver
                high-quality yet affordable photography solutions, Fatography
                quickly earned a reputation for its distinctive visual style and
                client-first approach.
              </p>
              <div className="ab-hero-btns">
                <a href="#story" className="ab-btn ab-btn--filled">
                  Our Story
                </a>
                <Link to="/services" className="ab-btn ab-btn--ghost">
                  See Our Work
                </Link>
              </div>
            </div>

            <div className="ab-hero-right">
              <div className="ab-hero-frame">
                <img
                  src="/fatima.jpg"
                  alt="Fatimah Haroon"
                  className="ab-hero-img"
                />
                <div className="ab-hero-frame-tag">
                  <span className="ab-hero-frame-tag-yr">2009</span>
                  <span className="ab-hero-frame-tag-lbl">Est.</span>
                </div>
              </div>
              <div className="ab-hero-float-card">
                <strong>500+</strong>
                <span>Weddings Captured</span>
              </div>
            </div>
          </div>

          {/* bottom strip */}
          <div className="ab-hero-strip">
            {[
              "Photography",
              "Videography",
              "Celebrity Shoots",
              "Event Coverage",
              "Commercial Shoots",
            ].map((s, i) => (
              <React.Fragment key={s}>
                <span className="ab-strip-item">{s}</span>
                {i < 4 && <span className="ab-strip-sep">✦</span>}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* ══ STORY ══ */}
        <section className="ab-story" id="story">
          <div className="ab-section-inner ab-story-inner">
            <div className="ab-story-body">
              <h2 className="ab-story-title">
                Blending Art, Technique, and Vision
              </h2>
              <p className="ab-story-text">
                Our craft is built on a perfect balance of creativity and
                technical expertise. We master the art of composition, lighting,
                and timing to ensure every image tells a story worth
                remembering. From portraiture and events to product and
                lifestyle photography, we adapt our style to match your vision.
              </p>
              <p className="ab-story-text">
                Our skills go beyond the click — we excel in post-production,
                bringing out the best colors, details, and emotions in every
                shot. With a keen eye for beauty and a commitment to perfection,
                we create photographs that speak louder than words.
              </p>
            </div>
          </div>
        </section>

        {/* ══ SKILLS ══ */}
        <section className="ab-skills">
          <div className="ab-section-inner ab-skills-inner">
            <div className="ab-skills-left">
              <span className="ab-eyebrow">WHAY WE DO!!!</span>
              <h2 className="ab-skills-title">
                <span className="ab-accent">ABOUT US</span>
              </h2>
              <p className="ab-skills-desc">
                Fatography is a professional photography and creative production
                company based in Dubai, UAE, known for delivering high-quality
                yet affordable photography solutions with a strong client-first
                approach. What started as a small studio offering personalized
                sessions for families, couples, and individuals has grown into a
                full creative hub, providing photography and videography
                services for events, corporate portraits, commercial projects,
                weddings, and product shoots. In 2024, Fatography expanded its
                services to better serve Dubai’s diverse and fast-growing
                community, introducing flexible packages designed to meet
                different creative needs without compromising quality. Today,
                Fatography is more than just a studio — it’s a visual
                storytelling partner dedicated to capturing meaningful moments,
                building powerful brand imagery, and bringing every client’s
                vision to life with creativity and precision.
              </p>
            </div>
            <div className="ab-skills-right">
              {SKILLS.map((sk) => (
                <SkillBar key={sk.label} label={sk.label} pct={sk.pct} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROCESS ══ */}
        <section className="ab-process">
          <div className="ab-section-inner">
            <div className="ab-process-header">
              <span className="ab-eyebrow">How We Work</span>
              <h2 className="ab-process-title">Our Working Process</h2>
              <p className="ab-process-sub">
                We believe great photography starts with understanding you. From
                the first conversation to the final delivery, our process is
                simple, transparent, and designed to make you feel comfortable
                every step of the way.
              </p>
            </div>
            <div className="ab-process-steps">
              {[
                {
                  step: "01",
                  title: "Discovery Call",
                  desc: "We learn about your vision, goals, and the story you want to tell.",
                },
                {
                  step: "02",
                  title: "Creative Planning",
                  desc: "Concept boards, location scouting, and timeline planning — all tailored to you.",
                },
                {
                  step: "03",
                  title: "The Shoot",
                  desc: "On the day, we bring energy, precision, and our full creative team.",
                },
                {
                  step: "04",
                  title: "Post-Production",
                  desc: "Meticulous editing, retouching, and colour grading by our in-house editors.",
                },
                {
                  step: "05",
                  title: "Final Delivery",
                  desc: "Your gallery delivered on time — ready to share, print, and treasure.",
                },
              ].map((p, i) => (
                <div key={p.step} className="ab-process-card">
                  <div className="ab-process-card-num">{p.step}</div>
                  <h3 className="ab-process-card-title">{p.title}</h3>
                  <p className="ab-process-card-desc">{p.desc}</p>
                  {i < 4 && <div className="ab-process-arrow">→</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="ab-stats">
          <div className="ab-stats-bg" />
          <div className="ab-section-inner">
            <div className="ab-stats-header">
              <span className="ab-eyebrow ab-eyebrow--light">
                We Do It For You With Love
              </span>
              <h2 className="ab-stats-title">Creating Timeless Memories</h2>
            </div>
            <div className="ab-stats-grid">
              {STATS.map((s) => (
                <div key={s.label} className="ab-stat-card">
                  <Counter target={s.target} suffix={s.suffix} />
                  <span className="ab-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="ab-stats-cta">
              <a href="/services" className="ab-btn ab-btn--filled">
                See Our Work
              </a>
            </div>
          </div>
        </section>
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

/* ─── skill bar sub-component ─── */
function SkillBar({ label, pct }) {
  const barRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setWidth(pct);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pct]);

  return (
    <div className="ab-skill-item" ref={barRef}>
      <div className="ab-skill-meta">
        <span className="ab-skill-label">{label}</span>
        <span className="ab-skill-pct">{pct}%</span>
      </div>
      <div className="ab-skill-track">
        <div className="ab-skill-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
