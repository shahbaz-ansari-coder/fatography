import React, { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../style/blogDetail.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import { BLOG_DATA } from "./Blogs";

/* ─── animated skill bar ─── */
function SkillBar({ label, pct }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setWidth(pct);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div className="bdt-skill-item" ref={ref}>
      <div className="bdt-skill-meta">
        <span className="bdt-skill-label">{label}</span>
        <span className="bdt-skill-pct">{pct}%</span>
      </div>
      <div className="bdt-skill-track">
        <div className="bdt-skill-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

/* ─── render body blocks ─── */
function RenderBlock({ block, idx }) {
  if (block.type === "heading") {
    return (
      <h2 key={idx} className="bdt-section-heading">
        {block.text}
      </h2>
    );
  }
  if (block.type === "para") {
    return (
      <p key={idx} className="bdt-para">
        {block.text}
      </p>
    );
  }
  if (block.type === "skills") {
    return (
      <div key={idx} className="bdt-skills-block">
        {block.items.map((sk) => (
          <SkillBar key={sk.label} label={sk.label} pct={sk.pct} />
        ))}
      </div>
    );
  }
  if (block.type === "process") {
    return (
      <div key={idx} className="bdt-process-block">
        {block.steps.map((step, i) => (
          <div key={step.n} className="bdt-process-card">
            <div className="bdt-process-num">{step.n}</div>
            <div className="bdt-process-info">
              <h4 className="bdt-process-title">{step.title}</h4>
              <p className="bdt-process-desc">{step.desc}</p>
            </div>
            {i < block.steps.length - 1 && (
              <div className="bdt-process-arrow">→</div>
            )}
          </div>
        ))}
      </div>
    );
  }
  if (block.type === "stats") {
    return (
      <div key={idx} className="bdt-stats-block">
        {block.items.map((st) => (
          <div key={st.label} className="bdt-stat-card">
            <strong className="bdt-stat-value">{st.value}</strong>
            <span className="bdt-stat-label">{st.label}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

/* ═══════════════════════════════════
   MAIN PAGE
═══════════════════════════════════ */
export default function FatographyBlog() {
  const { slug } = useParams();
  const blog = BLOG_DATA.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <>
        <Header />
        <div className="bdt-not-found">
          <h2>Blog post not found.</h2>
          <Link to="/blog" className="bdt-back-link">
            ← Back to Journal
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bdt-page">
        {/* ══ HERO ══ */}
        <header className="bdt-hero">
          <img src={blog.cover} alt={blog.title} className="bdt-hero-bg" />
          <div className="bdt-hero-overlay" />
          <div className="bdt-hero-content">
            <Link to="/blog" className="bdt-back">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13 8H3M7 4l-4 4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Journal
            </Link>
            <span className="bdt-hero-tag">{blog.tag}</span>
            <h1 className="bdt-hero-title">{blog.title}</h1>
            <div className="bdt-hero-meta">
              <img
                src={blog.authorImg}
                alt={blog.author}
                className="bdt-hero-author-img"
              />
              <div className="bdt-hero-meta-info">
                <span className="bdt-hero-author">{blog.author}</span>
                <span className="bdt-hero-date-read">
                  {blog.date} &nbsp;·&nbsp; {blog.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Services strip */}
          <div className="bdt-hero-strip">
            {[
              "Photography",
              "Videography",
              "Celebrity Shoots",
              "Event Coverage",
              "Commercial Shoots",
            ].map((s, i) => (
              <React.Fragment key={s}>
                <span className="bdt-strip-item">{s}</span>
                {i < 4 && <span className="bdt-strip-sep">✦</span>}
              </React.Fragment>
            ))}
          </div>
        </header>

        {/* ══ INTRO CALLOUT ══ */}
        <div className="bdt-intro-callout">
          <div className="bdt-intro-callout-inner">
            <div className="bdt-callout-est">
              <strong>2009</strong>
              <span>Est.</span>
            </div>
            <div className="bdt-callout-divider" />
            <p className="bdt-callout-text">{blog.excerpt}</p>
            <div className="bdt-callout-divider" />
            <div className="bdt-callout-stat">
              <strong>500+</strong>
              <span>Weddings Captured</span>
            </div>
          </div>
        </div>

        {/* ══ ARTICLE BODY ══ */}
        <article className="bdt-article">
          <div className="bdt-article-inner">
            <div className="bdt-divider-top" />
            {blog.body.map((block, i) => (
              <RenderBlock key={i} block={block} idx={i} />
            ))}

            {/* ── CTA links at end ── */}
            <div className="bdt-article-cta-row">
              <Link
                to="/about-us#story"
                className="bdt-article-btn bdt-article-btn--filled"
              >
                Our Story
              </Link>
              <Link
                to="/services"
                className="bdt-article-btn bdt-article-btn--outline"
              >
                See Our Work
              </Link>
            </div>

            {/* ── Share row ── */}
            <div className="bdt-bottom-row">
              <span className="bdt-tag-chip">{blog.tag}</span>
              <div className="bdt-share">
                <span className="bdt-share-label">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bdt-share-btn"
                  aria-label="Twitter"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bdt-share-btn"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* ══ BACK CTA ══ */}
        <div className="bdt-back-cta">
          <Link to="/blog" className="bdt-back-cta-btn">
            ← All Posts
          </Link>
        </div>

        <Footer />
      </div>
    </>
  );
}
