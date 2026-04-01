import React, { useState, useEffect } from "react";

const categoryData = [
  {
    name: "Bilal Abbas Khan",
    images: [
      "https://fatography.co/wp-content/uploads/2025/08/Bilal-Abbas-Khan-Fatography-20-768x469.png",
      "https://fatography.co/wp-content/uploads/2025/08/Cengiz-Coskun-Fatography-7.png",
      "https://fatography.co/wp-content/uploads/2025/09/1V1A3636-768x1152.jpg",
    ],
    effect: "fade",
  },
  {
    name: "Farhan Saeed",
    images: [
      "https://fatography.co/wp-content/uploads/2025/09/1V1A3636-768x1152.jpg",
      "https://fatography.co/wp-content/uploads/2025/08/Shehzad-Roy-Fatography-12.png",
      "https://fatography.co/wp-content/uploads/2025/10/1V1A4288-1551x2048.jpg",
    ],
    effect: "flip",
  },
  {
    name: "Momina Mustehsan",
    images: [
      "https://fatography.co/wp-content/uploads/2025/08/Momina-Mustehsan-Fatography-20-1.png",
      "https://fatography.co/wp-content/uploads/2025/10/1V1A4288-1551x2048.jpg",
      "https://fatography.co/wp-content/uploads/2025/08/Bilal-Abbas-Khan-Fatography-20-768x469.png",
    ],
    effect: "zoom",
  },
  {
    name: "Sajal Aly",
    images: [
      "https://fatography.co/wp-content/uploads/2025/08/Cengiz-Coskun-Fatography-7.png",
      "https://fatography.co/wp-content/uploads/2025/09/1V1A3636-768x1152.jpg",
      "https://fatography.co/wp-content/uploads/2025/08/Shehzad-Roy-Fatography-12.png",
    ],
    effect: "fade",
  },
];

const CategoryCard = ({ item }) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % item.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [item.images.length]);

  return (
    <div className={`portfolio-card ${item.effect}`}>
      <div className="image-stack">
        {item.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={item.name}
            className={`card-img ${index === currentImg ? "active" : ""}`}
          />
        ))}
      </div>
      <div className="card-info">
        <span className="category-label">{item.category}</span>
        <h3 className="card-name">{item.name}</h3>
        <div className="name-underline"></div>
      </div>
    </div>
  );
};

export default function Category() {
  return (
    <section className="category-section">
      <div className="container">
        <div class="celebrity-section">
          <span class="pre-title">Exclusive Portfolio</span>
          <h2 class="section-title">Celebrity Shoots</h2>
          <h3 class="tagline">
             <span></span>
          </h3>

          <div class="description-box">
            <p class="description">
              Our celebrity shoots blend style, creativity, and professionalism
              to deliver striking images that stand out. From glamorous
              portraits to candid moments, we showcase the personality and
              presence that make each star unforgettable.
            </p>
          </div>
        </div>
        <div className="category-grid">
          {categoryData.map((item, index) => (
            <CategoryCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
