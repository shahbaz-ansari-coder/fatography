import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../style/reviews.css";

const AVATAR_COLORS = [
  "#00acc1",
  "#7cb342",
  "#f4511e",
  "#8e24aa",
  "#3949ab",
  "#d81b60",
  "#fb8c00",
  "#039be5",
  "#546e7a",
];

const getColor = (name = "") =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 30) return `${days || 1} day${days !== 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
};

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // State to track which review IDs are expanded
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    axios
      .get("https://fatography-backend.vercel.app/api/reviews/all")
      .then((res) => setReviews(res.data.data || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-header">
          <p className="rev-eyebrow">Testimonials</p>
          <h2 className="rev-title">
            What Our <em>Clients</em> Say
          </h2>
        </div>

        {loading && (
          <div className="rev-status">
            <div className="rev-spinner" />
          </div>
        )}

        {!loading && error && (
          <div className="rev-status">
            <p style={{ color: "#666" }}>Could not load reviews.</p>
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <div className="rev-status">
            <p style={{ color: "#666" }}>No reviews yet.</p>
          </div>
        )}

        {!loading && !error && reviews.length > 0 && (
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={reviews.length > 2}
            autoplay={{ delay: 3500, disableOnInteraction: true }} // Increased delay for reading
            pagination={{ clickable: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1.1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1200: { slidesPerView: 3, spaceBetween: 50 },
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="reviews-swiper"
          >
            {reviews.map((rev) => {
              const color = getColor(rev.name);
              const initial = rev.name?.charAt(0).toUpperCase() || "?";
              const isExpanded = expanded[rev._id];
              const isLong = rev.message.length > 150; // Character limit

              return (
                <SwiperSlide key={rev._id} className="review-slide">
                  <div className="review-card">
                    <div className="rev-card-top">
                      <div className="rev-user">
                        {/* PROFILE IMAGE OR INITIAL FALLBACK */}
                        {rev.profilePic ? (
                          <img
                            src={rev.profilePic}
                            alt={rev.name}
                            className="rev-avatar-img"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }} // If img fails, hide it
                          />
                        ) : (
                          <div
                            className="rev-initial"
                            style={{
                              backgroundColor: color,
                              width: "45px",
                              height: "45px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: "1.2rem",
                            }}
                          >
                            {initial}
                          </div>
                        )}

                        <div className="rev-meta">
                          <h4>{rev.name}</h4>
                          <span>{timeAgo(rev.createdAt)}</span>
                        </div>
                      </div>

                      <img
                        src="https://cdn.trustindex.io/assets/platform/Google/icon.svg"
                        alt="Google"
                        className="google-icon"
                      />
                    </div>

                    <div className="rev-stars">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          style={{ color: i < rev.rating ? "#f4b400" : "#444" }}
                        >
                          ★
                        </span>
                      ))}
                      <span className="verified-badge">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6.4 13l1.5-1.5 2.2 2.2 4.8-4.8 1.5 1.5-6.3 6.3z" />
                        </svg>
                      </span>
                    </div>

                    {/* MESSAGE WITH READ MORE LOGIC */}
                    <div className="rev-content">
                      <p className="rev-text">
                        "
                        {isExpanded || !isLong
                          ? rev.message
                          : `${rev.message.slice(0, 150)}...`}
                        "
                      </p>

                      {isLong && (
                        <button
                          className="read-more-btn"
                          onClick={() => toggleExpand(rev._id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#f4b400",
                            cursor: "pointer",
                            padding: "0",
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            marginTop: "5px",
                          }}
                        >
                          {isExpanded ? "Show Less" : "Read More"}
                        </button>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
}
