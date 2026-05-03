import React from "react";
import { Link } from "react-router-dom";
import "../../style/blogs.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import ContactSection from "../../components/home/ContactSection";

/* ═══════════════════════════════════
   BLOG DATA
═══════════════════════════════════ */
export const BLOG_DATA = [
  {
    id: 1,
    slug: "welcome-to-fatography",
    tag: "About Us",
    date: "April 12, 2025",
    readTime: "7 min read",
    title: "Welcome to Fatography — Our Story, Vision & What We Do",
    excerpt:
      "Fatography is a professional photography and creative production company based in Dubai, UAE. Founded with a vision to deliver high-quality yet affordable photography solutions, Fatography quickly earned a reputation for its distinctive visual style and client-first approach.",
    cover: "/fatima.jpg",
    author: "Fatimah Haroon",
    authorImg: "/fatima.jpg",
    body: [
      {
        type: "para",
        text: "Fatography is a professional photography and creative production company based in Dubai, UAE. Founded with a vision to deliver high-quality yet affordable photography solutions, Fatography quickly earned a reputation for its distinctive visual style and client-first approach.",
      },
      {
        type: "heading",
        text: "Blending Art, Technique, and Vision",
      },
      {
        type: "para",
        text: "Our craft is built on a perfect balance of creativity and technical expertise. We master the art of composition, lighting, and timing to ensure every image tells a story worth remembering. From portraiture and events to product and lifestyle photography, we adapt our style to match your vision.",
      },
      {
        type: "para",
        text: "Our skills go beyond the click — we excel in post-production, bringing out the best colors, details, and emotions in every shot. With a keen eye for beauty and a commitment to perfection, we create photographs that speak louder than words.",
      },
      {
        type: "heading",
        text: "About Us",
      },
      {
        type: "para",
        text: "What started as a small studio offering personalized sessions for families, couples, and individuals has grown into a full creative hub, providing photography and videography services for events, corporate portraits, commercial projects, weddings, and product shoots.",
      },
      {
        type: "para",
        text: "In 2024, Fatography expanded its services to better serve Dubai's diverse and fast-growing community, introducing flexible packages designed to meet different creative needs without compromising quality. Today, Fatography is more than just a studio — it's a visual storytelling partner dedicated to capturing meaningful moments, building powerful brand imagery, and bringing every client's vision to life with creativity and precision.",
      },
      {
        type: "heading",
        text: "What We Do",
      },
      {
        type: "skills",
        items: [
          { label: "Luxury Wedding Photography", pct: 97 },
          { label: "Celebrity & Fashion Shoots", pct: 95 },
          { label: "Event & Corporate Coverage", pct: 94 },
          { label: "Commercial & Brand Photography", pct: 93 },
          { label: "Professional Retouching", pct: 92 },
          { label: "Advanced Color Grading", pct: 90 },
        ],
      },
      {
        type: "heading",
        text: "Our Working Process",
      },
      {
        type: "para",
        text: "We believe great photography starts with understanding you. From the first conversation to the final delivery, our process is simple, transparent, and designed to make you feel comfortable every step of the way.",
      },
      {
        type: "process",
        steps: [
          {
            n: "01",
            title: "Discovery Call",
            desc: "We learn about your vision, goals, and the story you want to tell.",
          },
          {
            n: "02",
            title: "Creative Planning",
            desc: "Concept boards, location scouting, and timeline planning — all tailored to you.",
          },
          {
            n: "03",
            title: "The Shoot",
            desc: "On the day, we bring energy, precision, and our full creative team.",
          },
          {
            n: "04",
            title: "Post-Production",
            desc: "Meticulous editing, retouching, and colour grading by our in-house editors.",
          },
          {
            n: "05",
            title: "Final Delivery",
            desc: "Your gallery delivered on time — ready to share, print, and treasure.",
          },
        ],
      },
      {
        type: "heading",
        text: "Creating Timeless Memories",
      },
      {
        type: "stats",
        items: [
          { value: "2009", label: "Founding Year" },
          { value: "2,000+", label: "Happy Customers" },
          { value: "50+", label: "Companies" },
          { value: "1,500+", label: "Projects Done" },
          { value: "2", label: "Offices" },
          { value: "2", label: "Studios" },
        ],
      },
    ],
  },
];

/* ═══════════════════════════════════
   MAIN PAGE
═══════════════════════════════════ */
export default function Blogs() {
  const blog = BLOG_DATA[0];

  return (
    <>
      <Header />
      <div className="blg-page">
        {/* ══ HERO ══ */}
        <header className="blg-hero">
          <div className="blg-hero-noise" />
          <div className="blg-hero-glow" />
          <div className="blg-hero-content">
            <div className="blg-hero-eyebrow">
              <span className="blg-hero-line" />
              <p>Fatography · Journal</p>
              <span className="blg-hero-line" />
            </div>
            <h1 className="blg-hero-title">
              Stories &amp; <span className="blg-hero-accent">Insights</span>
            </h1>
            <p className="blg-hero-sub">
              Behind-the-lens stories, photography guides, and creative
              inspiration from the Fatography team in Dubai.
            </p>
          </div>
        </header>

        {/* ══ BLOG SHOWCASE ══ */}
        <main className="blg-main">
          <div className="blg-inner">
            <p className="blg-count-label">1 Article</p>

            <Link to={`/blog/${blog.slug}`} className="blg-showcase">
              <div className="blg-showcase-img-wrap">
                <img
                  src={blog.cover}
                  alt={blog.title}
                  className="blg-showcase-img"
                />
                <div className="blg-showcase-img-overlay" />
                <span className="blg-showcase-tag">{blog.tag}</span>
              </div>

              <div className="blg-showcase-body">
                <div className="blg-showcase-meta">
                  <span>{blog.date}</span>
                  <span className="blg-sep">·</span>
                  <span>{blog.readTime}</span>
                </div>
                <h2 className="blg-showcase-title">{blog.title}</h2>
                <p className="blg-showcase-excerpt">{blog.excerpt}</p>

                <div className="blg-showcase-footer">
                  <div className="blg-showcase-author">
                    <img
                      src={blog.authorImg}
                      alt={blog.author}
                      className="blg-showcase-author-img"
                    />
                    <div className="blg-showcase-author-info">
                      <span className="blg-showcase-author-name">
                        {blog.author}
                      </span>
                      <span className="blg-showcase-author-role">
                        Founder & Lead Photographer
                      </span>
                    </div>
                  </div>
                  <span className="blg-showcase-cta">
                    Read Full Story
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* ── Quick stats strip ── */}
            <div className="blg-stats-strip">
              {[
                { v: "2009", l: "Founded" },
                { v: "500+", l: "Weddings" },
                { v: "2,000+", l: "Clients" },
                { v: "1,500+", l: "Projects" },
              ].map((s, i) => (
                <div key={i} className="blg-strip-stat">
                  <strong>{s.v}</strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
