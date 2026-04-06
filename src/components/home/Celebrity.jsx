import React, { useState, useEffect } from "react";
import "../../style/celebrityGallery.css";
import Category from "./Category";

const celebrityData = [
  {
    name: "Bilal Abbas Khan",
    images: [
      "https://fatography.co/wp-content/uploads/2025/08/Bilal-Abbas-Khan-Fatography-1-768x960.png",
      "https://fatography.co/wp-content/uploads/2025/08/Bilal-Abbas-Khan-Fatography-15-768x768.png",
      "https://fatography.co/wp-content/uploads/2025/08/Bilal-Abbas-Khan-Fatography-2-768x960.png",
    ],
    effect: "card-flip",
  },
  {
    name: "Farhan Saeed",
    images: [
      "https://fatography.co/wp-content/uploads/2025/08/Farhan-Saeed-5-1.jpeg",
      "https://fatography.co/wp-content/uploads/2025/08/Farhan-Saeed-4.jpeg",
    ],
    effect: "card-zoom",
  },
  {
    name: "Momina Mustehsan",
    images: [
      "https://fatography.co/wp-content/uploads/2025/08/Momina-Mustehsan-Fatography-20-1.png",
      "https://fatography.co/wp-content/uploads/2025/08/Momina-Mustehsan-Fatography-13.png",
      "https://fatography.co/wp-content/uploads/2025/08/Momina-Mustehsan-Fatography-2.png",
    ],
    effect: "card-fade",
  },
  {
    name: "Shehzad Roy",
    images: [
      "https://fatography.co/wp-content/uploads/2025/08/Shehzad-Roy-Fatography-12.png",
      "https://fatography.co/wp-content/uploads/2025/08/Shehzad-Roy-Fatography-14-768x961.png",
      "https://fatography.co/wp-content/uploads/2025/08/Shehzad-Roy-Fatography-3-768x873.png",
    ],
    effect: "card-slide",
  },
];

const CelebrityCard = ({ item }) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % item.images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [item.images.length]);

  return (
    <div className={`celeb-card-v3 ${item.effect}`}>
      <div className="image-container-v3">
        {item.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={item.name}
            className={`celeb-img-v3 ${index === currentImg ? "active" : ""}`}
          />
        ))}
        <div className="glass-overlay"></div>
      </div>

      <div className="celeb-name-container">
        <h3 className="celeb-name-text">{item.name}</h3>
        <span className="celeb-subtext">View Shoot</span>
      </div>
    </div>
  );
};

export default function CelebrityGallery() {
  return (
    <section className="celebrity-page">
      <div className="celeb-container">
        <header className="celebrity-header">
          <h2 className="celebrity-title">Our Celebrity Shoots</h2>

          <div className="divider"></div>

          <p className="celebrity-desc">
            Capturing the essence of stardom through
            <span className="highlight"> professional lighting </span>
            and creative vision.
          </p>
        </header>
        <div className="celebrity-grid-v3">
          {celebrityData.map((item, index) => (
            <CelebrityCard key={index} item={item} />
          ))}
        </div>
        <div className="celebrity-name-gallery">
          <Category />
        </div>

        {/* Center Button Below Grid */}
        <div className="button-wrapper-center">
          <button className="main-glow-btn">
            Our Celebrity Shoots
            <div className="btn-glow-effect"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
