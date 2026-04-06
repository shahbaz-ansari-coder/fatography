import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../style/reviews.css";

const reviews = [
  {
    id: 1,
    name: "Hamdan Al-Zaidi",
    date: "6 months ago",
    initial: "H",
    color: "#00acc1",
    text: "We had our pre-wedding shoot with Fatimah at Fatography and could not be happier with the experience. She captured our moments beautifully.",
  },
  {
    id: 2,
    name: "Naeem Ashraf",
    date: "4 months ago",
    initial: "N",
    color: "#7cb342",
    text: "Excellent and fast services! Creative team, very welcoming and made us feel very comfortable. The final photos exceeded our expectations.",
  },
  {
    id: 3,
    name: "fardan alfardan",
    date: "8 months ago",
    initial: "F",
    color: "#f4511e",
    text: "I had a great experience at this studio! The team was professional, friendly, and made me feel comfortable throughout the session.",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    date: "2 months ago",
    initial: "S",
    color: "#8e24aa",
    text: "The newborn shoot was handled with so much care and patience. Every detail was perfect. We are in love with the results!",
  },
  {
    id: 5,
    name: "Omar Rashid",
    date: "1 year ago",
    initial: "O",
    color: "#3949ab",
    text: "Best corporate headshots in Dubai. Very professional lighting and retouching. They really know how to make you look your best.",
  },
  {
    id: 6,
    name: "Elena Gomez",
    date: "3 months ago",
    initial: "E",
    color: "#d81b60",
    text: "Absolutely stunning fashion photography. The creative direction was top-notch and the turnaround time was very fast.",
  },
  {
    id: 7,
    name: "Zaid Khan",
    date: "5 months ago",
    initial: "Z",
    color: "#fb8c00",
    text: "The cinematic video they created for our brand was outstanding. Highly recommended for any professional videography needs.",
  },
  {
    id: 8,
    name: "Ayesha Malik",
    date: "1 month ago",
    initial: "A",
    color: "#039be5",
    text: "Amazing family portraits! They were so patient with the kids and the lighting was just magical. Best studio in town.",
  },
  {
    id: 9,
    name: "John Doe",
    date: "7 months ago",
    initial: "J",
    color: "#546e7a",
    text: "Top-tier quality and very reasonable pricing for the level of professionalism they provide. Will definitely visit again.",
  },
];

export default function ReviewSection() {
  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-header">
          <p className="rev-eyebrow">Testimonials</p>
          <h2 className="rev-title">
            What Our <em>Clients</em> Say
          </h2>
        </div>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1.1, spaceBetween: 10 }, // Mobile: Card cuts avoid karne ke liye 1.1
            768: { slidesPerView: 2, spaceBetween: 30 },
            1200: { slidesPerView: 3, spaceBetween: 50 },
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="reviews-swiper"
        >
          {reviews.map((rev) => (
            <SwiperSlide key={rev.id} className="review-slide">
              <div className="review-card">
                <div className="rev-card-top">
                  <div className="rev-user">
                    <div
                      className="rev-initial"
                      style={{ backgroundColor: rev.color }}
                    >
                      {rev.initial}
                    </div>
                    <div className="rev-meta">
                      <h4>{rev.name}</h4>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                    alt="Google"
                    className="google-icon"
                  />
                </div>

                <div className="rev-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="verified-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6.4 13l1.5-1.5 2.2 2.2 4.8-4.8 1.5 1.5-6.3 6.3z" />
                    </svg>
                  </span>
                </div>

                <p className="rev-text">"{rev.text}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
