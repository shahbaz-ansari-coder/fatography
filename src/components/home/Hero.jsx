// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-creative";
// import "swiper/css/pagination";

// import "../../style/hero.css";

// // import required modules
// import { EffectCreative, Pagination, Autoplay } from "swiper/modules";

// const heroData = [
//   {
//     title: "Wedding Photography",
//     para: "Capturing your most beautiful moments with timeless wedding photography and cinematic storytelling.",
//     btnText: "View Weddings",
//     color: "#e11d48",
//     image:
//       "https://fatography.co/wp-content/uploads/2025/10/generated-image-2.png",
//   },
//   {
//     title: "Brand & Product Shoot",
//     para: "Professional brand and product photography designed to elevate your business and visual identity.",
//     btnText: "See Portfolio",
//     color: "#7c3aed",
//     image:
//       "https://fatography.co/wp-content/uploads/2026/03/Dubai-Model-Photoshoot-–-Professional-Fashion-Lifestyle-Portraits-by-Fatography-Studio.jpg",
//   },
//   {
//     title: "Cinematic Video Production",
//     para: "High-end video shoots for brands, events, and stories that deserve a cinematic touch.",
//     btnText: "Watch Projects",
//     color: "#f59e0b",
//     image:
//       "https://fatography.co/wp-content/uploads/2026/03/Fashion-Photography-Services.jpg",
//   },
//   {
//     title: "Fashion Photography",
//     para: "Creative fashion photography that highlights style, personality, and modern visual storytelling.",
//     btnText: "Explore Fashion",
//     color: "#ec4899",
//     image:
//       "https://fatography.co/wp-content/uploads/2025/09/FB_IMG_1757163602974.jpg",
//   },
//   {
//     title: "Event Photography",
//     para: "Professional coverage for corporate events, parties, and celebrations with stunning visuals.",
//     btnText: "View Events",
//     color: "#6366f1",
//     image:
//       "https://fatography.co/wp-content/uploads/2026/03/Professional-Wedding-Photography-in-Dubai.jpeg",
//   },
// ];

// export default function HeroSection() {
//   return (
//     <div className="hero-container">
//       <Swiper
//         grabCursor={true}
//         effect={"creative"}
//         creativeEffect={{
//           prev: {
//             shadow: true,
//             translate: ["-125%", 0, -800],
//             rotate: [0, 0, -90],
//           },
//           next: {
//             shadow: true,
//             translate: ["125%", 0, -800],
//             rotate: [0, 0, 90],
//           },
//         }}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         pagination={{ clickable: true }}
//         modules={[EffectCreative, Pagination, Autoplay]}
//         className="heroSwiper"
//       >
//         {heroData.map((item, index) => (
//           <SwiperSlide
//             key={index}
//             className="hero-slide"
//             style={{
//               backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.2)), url(${item.image})`,
//             }}
//           >
//             <div className="card-content">
//               <div
//                 className="accent-bar"
//                 style={{ backgroundColor: item.color }}
//               ></div>
//               <h1>{item.title}</h1>
//               <p>{item.para}</p>
//               <button className="hero-btn" style={{ "--btn-clr": item.color }}>
//                 {item.btnText}
//               </button>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "../../style/hero2.css";

// import required modules
import { Autoplay } from "swiper/modules";

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
      "https://fatography.co/wp-content/uploads/2026/03/Fashion-Photography-Services.jpg",
  },
  {
    image:
      "https://fatography.co/wp-content/uploads/2025/09/FB_IMG_1757163602974.jpg",
  },
  {
    image:
      "https://fatography.co/wp-content/uploads/2026/03/Professional-Wedding-Photography-in-Dubai.jpeg",
  },
];

export default function HeroSection() {
  return (
    <div className="hero-container">
      <Swiper
        loop={true}
        speed={1200} // Slide hone ki raftar
        autoplay={{
          delay: 4000, // Agli image pe jane ka waqt
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="heroSwiper"
      >
        {heroData.map((item, index) => (
          <SwiperSlide key={index} className="hero-slide">
            <div
              className="zoom-wrapper"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}