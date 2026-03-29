import React from "react";
import { ArrowRight } from "lucide-react";

// ─── Services section component with data inside the file
export default function Service() {
  // ─── Data moved from JSON
  const serviceData = {
    sectionId: "service",
    subtitle: "My Services",
    services: [
      {
        title: "Wedding Visuals",
        description: "Moments captured with emotion.",
        image: "/service-1.jpg",
        alt: "Wedding Visuals",
        width: 340,
        height: 380,
        link: "#",
      },
      {
        title: "Event Coverage",
        description: "Well-planned and documented stories.",
        image: "/service-2.jpg",
        alt: "Event Coverage",
        width: 340,
        height: 380,
        link: "#",
      },
      {
        title: "Brand Promotion",
        description: "Visual content for modern brands.",
        image: "/service-3.jpg",
        alt: "Brand Promotion",
        width: 340,
        height: 380,
        link: "#",
      },
      {
        title: "Cinematic Video",
        description: "Story-driven motion visuals.",
        image: "/service-4.jpg",
        alt: "Cinematic Video",
        width: 340,
        height: 380,
        link: "#",
      },
    ],
  };

  return (
    <section
      className="section service"
      id={serviceData.sectionId}
      aria-labelledby="service-label"
    >
      {/* ─── Services section subtitle */}
      <p className="section-subtitle container" id="service-label">
        Our Photography Services in Dubai
      </p>

      {/* ─── Services card list layout */}
      <ul className="service-list">
        {serviceData.services.map((service, index) => (
          <li data-reveal key={index}>
            <div className="service-card container">
              {/* ─── Service icon/image */}
              <img
                src={service.image}
                width={service.width}
                height={service.height}
                loading="lazy"
                alt={service.alt}
                className="img"
              />

              {/* ─── Service title and description */}
              <div>
                <h3 className="h3 card-title">{service.title}</h3>
                <p className="card-subtitle">{service.description}</p>
              </div>

              {/* ─── Service action link */}
              <a href={service.link} className="btn-icon" aria-label="See more">
                <ArrowRight size={28} />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
