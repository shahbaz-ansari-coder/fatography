import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "../../style/Slider.css";

import { EffectCreative, Pagination, Autoplay } from "swiper/modules";

const Slider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("https://fatography-backend.vercel.app/api/slider/all")
      .then((res) => {
        const allImages = (res.data.data || []).flatMap((s) => s.images || []);
        setImages(allImages);
      })
      .catch((err) => console.error("Slider fetch error:", err));
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="slider-container">
      <Swiper
        grabCursor={true}
        loop={images.length > 1}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-125%", 0, -800],
            rotate: [0, 0, -90],
          },
          next: {
            shadow: true,
            translate: ["125%", 0, -800],
            rotate: [0, 0, 90],
          },
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCreative, Pagination, Autoplay]}
        className="heroSwiper"
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            className="hero-slide"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
