import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../style/blogs.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import ContactSection from "../../components/home/ContactSection";

/* ═══════════════════════════════════
   BLOG DATA - Multiple blogs with services
═══════════════════════════════════ */
export const BLOG_DATA = [
  {
    id: 1,
    slug: "fashion-photography-dubai-17-years",
    service: "Fashion Photography",
    tag: "Fashion",
    date: "June 28, 2025",
    title: "Fashion Photography in Dubai: 17 Years Behind the Lens",
    excerpt:
      "Insights from Fatimah Haroon on mastering fashion photography in Dubai, covering the best locations, lighting techniques, posing direction, and what separates good from great fashion work.",
    cover: "/fashion-blog.jpeg",
    author: "Fatimah Haroon",
    authorImg: "/fatima.jpg",
  },
];

// Get unique services for dropdown
const SERVICES = ["All Services", ...new Set(BLOG_DATA.map((b) => b.service))];

/* ═══════════════════════════════════
   MAIN BLOGS PAGE
═══════════════════════════════════ */
export default function Blogs() {
  const [selectedService, setSelectedService] = useState("All Services");

  // Filter blogs based on selected service
  const filteredBlogs =
    selectedService === "All Services"
      ? BLOG_DATA
      : BLOG_DATA.filter((blog) => blog.service === selectedService);

  return (
    <>
      <Header />
      <div className="blg-page">
        {/* ══ HERO SECTION ══ */}
        <header className="blg-hero">
          <div className="blg-hero-overlay" />
          <div className="blg-hero-glow" />
          <div className="blg-hero-content">
            <div className="blg-hero-eyebrow">
              <span className="blg-hero-line" />
              <p>Fatography · Blogs</p>
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

          {/* Floating shapes */}
          <div className="blg-hero-shape blg-shape-1" />
          <div className="blg-hero-shape blg-shape-2" />
          <div className="blg-hero-shape blg-shape-3" />
        </header>

        {/* ══ MAIN CONTENT ══ */}
        <main className="blg-main">
          <div className="blg-inner">
            {/* ── Filter Section ── */}
            <div className="blg-filter-section">
              <div className="blg-filter-left">
                <p className="blg-count-label">
                  {filteredBlogs.length} Article
                  {filteredBlogs.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="blg-filter-dropdown-wrapper">
                <label className="blg-filter-label">Filter by Service</label>
                <select
                  className="blg-filter-dropdown"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  {SERVICES.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── Blog Grid 3x3 ── */}
            <div className="blg-grid">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blogs/${blog.slug}`}
                  className="blg-card"
                >
                  <div className="blg-card-img-wrap">
                    <img
                      src={blog.cover}
                      alt={blog.title}
                      className="blg-card-img"
                    />
                    <div className="blg-card-overlay" />
                    <span className="blg-card-tag">{blog.tag}</span>
                  </div>

                  <div className="blg-card-content">
                    <div className="blg-card-meta">
                      <span>{blog.date}</span>
                      <span className="blg-sep">·</span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className="blg-card-title">{blog.title}</h3>

                    <p className="blg-card-excerpt">{blog.excerpt}</p>

                    <div className="blg-card-footer">
                      <div className="blg-card-author">
                        <img
                          src={blog.authorImg}
                          alt={blog.author}
                          className="blg-card-author-img"
                        />
                        <span className="blg-card-author-name">
                          {blog.author}
                        </span>
                      </div>
                      <span className="blg-card-cta">
                        Read
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
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
              ))}
            </div>

            {/* ── Empty State ── */}
            {filteredBlogs.length === 0 && (
              <div className="blg-empty-state">
                <p>No blogs found for this service. Check back soon!</p>
              </div>
            )}
          </div>
        </main>

        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
