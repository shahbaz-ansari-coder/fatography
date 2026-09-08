import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../../style/Slider.css";

const sliderImages = [
  {
    src: "/banner/pderfoulgocwpesxuxa5.jpg",
    alt: "Fatography photoshoot",
  },
  {
    src: "/banner/go1hhp3zr1v6jhnq0rnu.jpg",
    alt: "Fatography photoshoot",
  },
  {
    src: "/banner/tfe9r36lgnjhxkmalnfx.jpg",
    alt: "Fatography photoshoot",
  },
  {
    src: "/banner/scprnyd6qx4l5bsvlbws.jpg",
    alt: "Fatography photoshoot",
  },
  {
    src: "/banner/ed31quh27yzdsmvg4r8k.jpg",
    alt: "Fatography photoshoot",
  },
  {
    src: "/banner/itlqpj1ife9qv4aobtlb.jpg",
    alt: "Fatography photoshoot",
  },
  {
    src: "/banner/tqrmpdxxpfnvkaarmaku.jpg",
    alt: "Fatography photoshoot",
  },
  {
    src: "/banner/xme3kpprtjnwmxxhyrsr.jpg",
    alt: "Fatography photoshoot",
  },
  {
    src: "/banner/nlq6xjxwhfeqslhwoeiz.jpg",
    alt: "Fatography photoshoot",
  },
  {
    src: "/banner/jdvki6arawqgkoj3mjnq.jpg",
    alt: "Fatography photoshoot",
  },
  {
    src: "/banner/z6jz0ucs5i98yo4izmen.jpg",
    alt: "Fatography photoshoot",
  },
  {
    src: "/banner/rfsrp10qoiskcre8lf7d.jpg",
    alt: "Fatography photoshoot",
  },
  {
    src: "/banner/tl3gqgqibp8ol0io7k39.jpg",
    alt: "Fatography photoshoot",
  },
];


const HERO_IMAGE = sliderImages[0]?.src;

if (typeof document !== "undefined" && HERO_IMAGE) {
  const existingPreload = document.querySelector(
    `link[rel="preload"][href="${HERO_IMAGE}"]`,
  );

  if (!existingPreload) {
    const preload = document.createElement("link");

    preload.rel = "preload";
    preload.as = "image";
    preload.href = HERO_IMAGE;
    preload.fetchPriority = "high";

    document.head.appendChild(preload);
  }
}

const Slider = () => {
  if (!sliderImages.length) {
    return null;
  }

  return (
    <section
      className="slider-container"
      aria-label="Fatography photography portfolio"
    >
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop={sliderImages.length > 1}
        speed={650}
        watchSlidesProgress
        observer
        observeParents

        autoplay={
          sliderImages.length > 1
            ? {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }

        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}


        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="heroSwiper"
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={image.src} className="hero-slide">
            <img
              src={image.src}
              alt={image.alt}
              className="slide-img"
              width="1920"
              height="1080"

              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding={index === 0 ? "sync" : "async"}

              draggable="false"
              aria-hidden={index !== 0 ? "true" : undefined}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
