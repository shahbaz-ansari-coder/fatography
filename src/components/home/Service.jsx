import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "../../style/service.css";
import { Link } from "react-router";

const API_BASE = "https://fatography-backend.vercel.app/api/services";

function ServiceCard({ data }) {
  const displayImages =
    data.thumbnails?.length > 0
      ? data.thumbnails.map((t) => t.url)
      : [data.banner?.url];

  return (
    <Link to={`/servies/${data._id}`}>
      <article className="service-card">
        <Swiper
          className="card-inner-swiper"
          modules={[Autoplay]}
          autoplay={{
            delay: 2500 + Math.random() * 1000,
            disableOnInteraction: false,
          }}
          loop={displayImages.length > 1}
        >
          {displayImages.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src}
                alt={data.title}
                className="full-card-img"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="card-overlay">
          <h3 className="card-name">{data.title}</h3>
        </div>
      </article>
    </Link>
  );
}

function InfiniteRow({ cards, reverse = false, animate = true }) {
  // Agar animate false hai to simple flex layout chalega (no scroll)
  const doubledCards = animate ? [...cards, ...cards] : cards;

  return (
    <div className={`marquee-wrapper ${!animate ? "no-animate" : ""}`}>
      <div
        className={`marquee-content ${reverse ? "reverse" : ""} ${!animate ? "static-grid" : ""}`}
      >
        {doubledCards.map((card, index) => (
          <ServiceCard key={`${card._id}-${index}`} data={card} />
        ))}
      </div>
    </div>
  );
}

export default function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(API_BASE);
        setServices(res.data.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return null; // Ya loading spinner add kar sakte hain

  // Logic: Agar 5 se zyada hain to rows mein divide karo
  const shouldAnimate = services.length > 5;

  // Data ko chunks mein divide karne ke liye function (Optional: for cleaner rows)
  const rows = [];
  if (shouldAnimate) {
    for (let i = 0; i < services.length; i += 5) {
      rows.push(services.slice(i, i + 5));
    }
  } else {
    rows.push(services);
  }

  return (
    <section className="service" id="service">
      <div className="service-container">
        <div className="reviews-header">
          <p className="rev-eyebrow">Our Services</p>
          <h2 className="rev-title">
            Professional <em>Photography</em> Solutions
          </h2>
        </div>

        <div className="service-rows-container">
          {rows.map((rowItems, idx) => (
            <InfiniteRow
              key={idx}
              cards={rowItems}
              reverse={idx % 2 !== 0} // Alternate rows reverse chalengi
              animate={shouldAnimate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
