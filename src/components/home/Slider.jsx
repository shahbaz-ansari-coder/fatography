import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

import "../../style/Slider.css";

// import required modules
import { EffectCreative, Pagination, Autoplay } from "swiper/modules";

const heroData = [
  {
    image:
      "https://fatography.co/wp-content/uploads/2025/10/generated-image-2.png",
  },
  {
    image:
      "https://fatography.co/wp-content/uploads/2026/03/Dubai-Model-Photoshoot-–-Professional-Fashion-Lifestyle-Portraits-by-Fatography-Studio.jpg",
  },
  {
    image:
      "https://fatography.co/wp-content/uploads/2026/03/Dubai-Model-Photoshoot.jpg",
  },
  {
    image:
      "https://fatography.co/wp-content/uploads/2025/09/VDraw_3674528406411240329.png.jpg",
  },
  {
    image:
      "https://fatography.co/wp-content/uploads/2026/03/Professional-Wedding-Photography-in-Dubai.jpeg",
  },
];

const Slider = () => {
  return (
    <div className="slider-container">
      <Swiper
        grabCursor={true}
        loop={true}
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
        {heroData.map((item, index) => (
          <SwiperSlide
            key={index}
            className="hero-slide"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          ></SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
