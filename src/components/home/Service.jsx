import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "../../style/service.css";

const services = [
  {
    id: 1,
    title: "Fashion Photography",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 2,
    title: "Pre Wedding Shoots",
    images: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 3,
    title: "Wedding Events",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 4,
    title: "Lifestyle",
    images: [
      "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522165078649-823cf4dbaf46?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: 5,
    title: "Food Art",
    images: [
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    ],
  },
];

function ServiceCard({ data }) {
  return (
    <article className="service-card">
      <Swiper
        className="card-inner-swiper"
        modules={[Autoplay]}
        autoplay={{
          delay: 2500 + Math.random() * 1000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {data.images.map((src, i) => (
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
  );
}

function InfiniteRow({ cards, reverse = false }) {
  const doubledCards = [...cards, ...cards];
  return (
    <div className="marquee-wrapper">
      <div className={`marquee-content ${reverse ? "reverse" : ""}`}>
        {doubledCards.map((card, index) => (
          <ServiceCard key={`${card.id}-${index}`} data={card} />
        ))}
      </div>
    </div>
  );
}

export default function Service() {
  return (
    <section className="service" id="service">
      <div className="service-container">
        <div className="service-header">
          <p className="service-eyebrow">Our Expertise</p>
          <h2 className="service-title">
            Photography <em>crafted</em> for <br /> Dubai's finest moments
          </h2>
        </div>

        <div className="service-rows-container">
          {/* Row 1: Forward */}
          <InfiniteRow cards={services} />

          {/* Row 2: Reverse */}
          <InfiniteRow cards={services} reverse={true} />

          {/* Row 3: Forward */}
          <InfiniteRow cards={services} />
        </div>
      </div>
    </section>
  );
}
