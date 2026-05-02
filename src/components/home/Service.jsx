import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "../../style/service.css";
import { Link } from "react-router-dom";

const API_BASE = "https://fatography-backend.vercel.app/api/services";

const SERVICE_ORDER = [
  "Fashion Photography",
  "Pre Wedding Shoots",
  "Wedding Events",
  "Lifestyle Photography",
  "Food Photography",
  "Black & White",
  "Maternity Photography",
  "Product Photography",
  "Family Photography",
  "Event Coverage",
  "Real Estate",
  "Neon Photography",
  "Corporate & LinkedIn",
  "Fitness Photography",
  "Retouching Guide",
];

function ServiceCard({ data }) {
  const displayImages =
    data?.thumbnails?.length > 0
      ? data.thumbnails.map((t) => t.url)
      : [data?.banner?.url];

  const specialServices = [
    "pre wedding shoots",
    "family photography",
    "lifestyle photography",
  ];

  // slug banane ka function
  const slug = data?.title?.toLowerCase().trim().replace(/\s+/g, "-");

  const link = specialServices.includes(data?.title?.toLowerCase())
    ? `/services/${slug}`
    : `/service/${slug}`;

  return (
    <Link to={link}>
      <article className="service-card">
        <Swiper
          className="card-inner-swiper"
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={displayImages.length > 1}
        >
          {displayImages.map((src, i) => (
            <SwiperSlide key={i}>
              <img src={src} alt={data.title} loading="lazy" />
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

export default function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(API_BASE);
        const apiServices = res?.data?.data || [];
        const sorted = [...apiServices].sort((a, b) => {
          const aIndex = SERVICE_ORDER.indexOf(a.title);
          const bIndex = SERVICE_ORDER.indexOf(b.title);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
        setServices(sorted);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>Loading...</div>
    );
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
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service._id} data={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
