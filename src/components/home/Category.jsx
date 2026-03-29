import React from "react";
import { ArrowUpRight } from "lucide-react"; // optional, remove if not needed

// ─── Category section component with data inside the file
export default function Category() {
  // ─── Data moved here from JSON
  const categoryData = [
    {
      title: "Bilal Abbas Khan,",
      image:
        "https://fatography.co/wp-content/uploads/2025/08/Bilal-Abbas-Khan-Fatography-20-768x469.png",
      alt: "Landscape",
      width: 600,
      height: 690,
      link: "#",
    },
    {
      title: "Farhan Saeed,",
      image:
        "https://fatography.co/wp-content/uploads/2025/09/1V1A3636-768x1152.jpg",
      alt: "Model",
      width: 600,
      height: 690,
      link: "#",
    },
    {
      title: "Cengiz Coşkun,",
      image:
        "https://fatography.co/wp-content/uploads/2025/08/Cengiz-Coskun-Fatography-7.png",
      alt: "Street",
      width: 600,
      height: 690,
      link: "#",
    },
    {
      title: "Momina Mustehsan,",
      image:
        "https://fatography.co/wp-content/uploads/2025/08/Momina-Mustehsan-Fatography-20-1.png",
      alt: "Fashion",
      width: 600,
      height: 690,
      link: "#",
    },
    {
      title: "Shehzad Roy,",
      image:
        "https://fatography.co/wp-content/uploads/2025/08/Shehzad-Roy-Fatography-12.png",
      alt: "Film",
      width: 600,
      height: 690,
      link: "#",
    },
    {
      title: "Sadia Khan,",
      image:
        "https://fatography.co/wp-content/uploads/2025/10/1V1A4288-1551x2048.jpg",
      alt: "Architecture",
      width: 600,
      height: 690,
      link: "#",
    },
  ];

  return (
    <section className="section category" aria-label="photography category">
      <div className="container">
        <ul className="category-list">
          {categoryData.map((item, index) => (
            <li className="category-item" data-reveal key={index}>
              <a href={item.link} className="category-card">
                <h3 className="h4 card-title">{item.title}</h3>

                <figure
                  className="card-banner img-holder"
                  style={{ "--width": item.width, "--height": item.height }}
                >
                  <img
                    src={item.image}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    alt={item.alt}
                    className="img-cover"
                  />
                </figure>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
