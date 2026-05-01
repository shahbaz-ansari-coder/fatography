import React, { useEffect, useState } from "react";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import Preloader from "../../components/home/Preloader";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import "../../style/celebrityGallery.css";
import { Link } from "react-router-dom";
import ContactSection from "../../components/home/ContactSection";

/* CARD */

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

/* PAGE */

export default function CelebrityShootsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://fatography-backend.vercel.app/api/celebrity-shoot/all-no-images",
      );

      const json = await res.json();
      setData(json.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Preloader />
      <Header />

      <main className="!py-5 !sm:py-10">
        <section className="celebrity-page">
          <div className="celeb-container container">
            <div className="reviews-header">
              <p className="rev-eyebrow">Celebrity Shoots</p>
              <h2 className="rev-title">
                Capturing Stars in Their <em>Best Light</em>
              </h2>
            </div>

            {/* ALL CARDS */}
            <div className="celeb-shoot-grid">
              {loading ? (
                <p style={{ color: "#fff" }}>Loading...</p>
              ) : (
                [...data]
                  .reverse()
                  .map((item) => (
                    <CelebrityShootCard key={item._id} item={item} />
                  ))
              )}
            </div>
          </div>
        </section>
      </main>
      <ContactSection />
      <Footer />
    </>
  );
}
