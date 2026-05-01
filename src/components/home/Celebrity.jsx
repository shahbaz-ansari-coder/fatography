import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "../../style/celebrityGallery.css";
import { Link } from "react-router-dom";

const CELEBRITY_ORDER = [
  "Cengiz Coşkun",
  "Bilal Abbas Khan",
  "Ebraheem Al Samadi",
  "Momina Mustehsan",
  "Farhan Saeed",
  "Shehzad Roy",
  "Sadia Khan",
  "Ahsan Khan",
  "Mikaal Zulfiqar",
  "Hareem Farooq",
];

function CelebrityShootCard({ item }) {
  const displayImages =
    item?.thumbnails?.length > 0
      ? item.thumbnails
      : item?.thumbnail
        ? [item.thumbnail]
        : [];

  return (
    <Link to={`/celebrity-shoots/${item._id}`}>
      <article className="celeb-shoot-card">
        <Swiper
          className="celeb-shoot-swiper"
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={displayImages.length > 1}
        >
          {displayImages.map((src, i) => (
            <SwiperSlide key={i}>
              <img src={src} alt={item.celebrityName} loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="celeb-shoot-overlay">
          <h3 className="celeb-shoot-name">{item.celebrityName}</h3>
        </div>
      </article>
    </Link>
  );
}

export default function CelebrityShoot() {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://fatography-backend.vercel.app/api/celebrity-shoot/all-no-images",
        );
        const apiData = res?.data?.data || [];

        const filtered = apiData.filter((item) =>
          CELEBRITY_ORDER.includes(item.celebrityName),
        );

        const sorted = CELEBRITY_ORDER.map((name) =>
          filtered.find((item) => item.celebrityName === name),
        ).filter(Boolean);

        setCelebrities(sorted);
      } catch (err) {
        console.error("Error fetching celebrities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#fff" }}>
        Loading...
      </div>
    );
  }

  return (
    <section className="celeb-shoot-section" id="celebrity-shoots">
      <div className="celeb-shoot-container">
        <div className="reviews-header">
          <p className="rev-eyebrow">Celebrity Shoots</p>
          <h2 className="rev-title">
            Capturing Stars in Their <em>Best Light</em>
          </h2>
        </div>

        <div className="celeb-shoot-grid">
          {celebrities.map((item) => (
            <CelebrityShootCard key={item._id} item={item} />
          ))}
        </div>

        <div className="celeb-shoot-btn-wrapper">
          <Link to="/celebrity-shoots">
            <button className="celeb-shoot-btn">
              Our Celebrity Shoots
              <div className="celeb-shoot-btn-glow"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
