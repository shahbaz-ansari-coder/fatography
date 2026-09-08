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

const faqs = [
  {
    q: "When was Fatography established?",
    a: "Fatography was established in 2009 and has been providing professional photography and videography services for over 15 years across Dubai and Pakistan.",
  },
  {
    q: "Where is Fatography located?",
    a: "Fatography proudly serves clients through its branches in Dubai and Pakistan. Contact us to find the nearest branch or book your session.",
  },
  {
    q: "Who is the lead photographer at Fatography?",
    a: "Fatography is led by Fatimah Haroon, a professionally trained photographer and University of the Arts London graduate, known for her distinctive visual style and client-first approach.",
  },
  {
    q: "What makes Fatography different from other photography studios?",
    a: "Fatography stands out for its 15+ years of experience, flexible and affordable packages, creative expertise, fast turnaround, and a client-first approach that has earned the trust of individuals and businesses across Dubai and Pakistan.",
  },
];

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
    const [openIdx, setOpenIdx] = useState(null);

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
        title="About Dubai's Photography Studio | Fatography"
        description="Fatography is Dubai's trusted photography studio since 2009 15+ years of weddings, fashion, corporate & celebrity shoots. Discover our story. Book today!"
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
                About Us
              </div>
              <h1 className="ab-hero-title">
                Welcome to
                <br />
                <em className="ab-hero-em"> Fatography</em>
              </h1>
              <p className="ab-hero-desc">
                Fatography is a professional photography and creative production
                studio serving clients across Dubai and Pakistan. Founded with a
                vision to deliver high-quality, affordable photography for
                everyone, we quickly earned a reputation for our distinctive
                visual style and uncompromising client-first approach.
              </p>
              <div className="ab-hero-btns">
                <a href="#story" className="ab-btn ab-btn--filled">
                  Our Story
                </a>
                <Link to="/our-services" className="ab-btn ab-btn--ghost">
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
                Great photography is never just about pressing a button. At
                Fatography, our craft is built on a purposeful balance of
                creativity and technical precision. We master the art of
                composition, lighting, and timing to ensure every image tells a
                story worth remembering—whether it's a quiet pre-wedding moment,
                a high-energy fashion editorial, or a brand campaign that
                demands attention. Proudly serving clients across Dubai and
                Pakistan, we bring the same commitment to quality and creativity
                to every project.
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
                company serving clients across Dubai and Pakistan. Founded in
                2009 with a clear vision—to deliver high-quality, affordable
                photography without compromise—we have spent over 15 years
                building a legacy of visual excellence, earning the trust of
                individuals, families, and businesses through exceptional
                creativity and service.
              </p>
              <p className="ab-skills-desc !mt-3">
                At Fatography, we understand that every client has unique needs,
                timelines, and budgets. That's why we create flexible,
                value-driven packages designed to deliver exceptional results
                without compromising on quality. Whether you're launching a
                product, celebrating a milestone, or building a brand, we're
                committed to capturing your story with creativity, precision,
                and the attention it deserves.
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
                We believe great photography starts long before the camera is
                raised. Our process is built to make you feel confident,
                comfortable, and creatively involved — every step of the way.
              </p>
            </div>
            <div className="ab-process-steps">
              {[
                {
                  step: "01",
                  title: "Discovery Call",
                  desc: "We start with a conversation — understanding your vision, goals, timeline, and the story you want to tell. No jargon, no pressure.",
                },
                {
                  step: "02",
                  title: "Creative Planning",
                  desc: "Our team crafts a tailored shoot plan — covering locations, mood boards, styling direction, lighting setup, and a creative brief aligned with your goals..",
                },
                {
                  step: "03",
                  title: "The Shoot",
                  desc: "This is where the magic happens. We bring energy, precision, and creative instinct to every frame — guiding you naturally so every shot feels authentic",
                },
                {
                  step: "04",
                  title: "Post-Production",
                  desc: "Our editors apply professional colour grading, retouching, and enhancement to ensure every image is polished, consistent, and visually stunning..",
                },
                {
                  step: "05",
                  title: "Final Delivery",
                  desc: "Your gallery is delivered on time, ready to download, share, and treasure — in the formats and resolutions you need, exactly when you need them.",
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
        <section className="fsg-faq">
          <div className="fsg-faq-top">
            <div className="fsg-section-label fsg-label--center">
              <span />
              FAQ
              <span />
            </div>
            <h2 className="fsg-faq-heading">
              <em>FAQ's</em> About Fatography Services 
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
