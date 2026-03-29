import React from "react";
import { ArrowUpRight } from "lucide-react";

// ─── Portfolio section component with data inside the file
export default function Portfolio() {
  // ─── Data moved from JSON
  const portfolioData = {
    sectionId: "contact",
    sectionTitle: "Project ideas or collaborations? Let’s connect.",
    shapeImage: {
      src: "/footer-shape.svg",
      alt: "",
      width: 185,
      height: 134,
    },
    columns: [
      {
        showTitle: true,
        projects: [
          {
            title: "Visual Branding Project",
            tag: "Branding",
            image: "/portfolio-1.jpg",
            alt: "Branding Project",
            width: 400,
            height: 300,
            link: "#",
          },
          {
            title: "Fashion Photography",
            tag: "Fashion",
            image: "/portfolio-2.jpg",
            alt: "Fashion Photography",
            width: 400,
            height: 300,
            link: "#",
          },
        ],
      },
      {
        showTitle: false,
        projects: [
          {
            title: "Event Coverage",
            tag: "Event",
            image: "/portfolio-3.jpg",
            alt: "Event Coverage",
            width: 400,
            height: 300,
            link: "#",
          },
          {
            title: "Cinematic Film",
            tag: "Film",
            image: "/portfolio-4.jpg",
            alt: "Cinematic Film",
            width: 400,
            height: 300,
            link: "#",
          },
        ],
      },
    ],
  };

  return (
    <section
      className="section portfolio"
      id={portfolioData.sectionId}
      aria-labelledby="portfolio-label"
    >
      <div className="container">
        {/* ─── Portfolio project grid layout */}
        <div className="portfolio-list">
          {portfolioData.columns.map((column, columnIndex) => (
            <div className="wrapper" key={columnIndex}>
              {/* ─── Portfolio section title */}
              {column.showTitle && (
                <h2
                  className="h2 section-title"
                  id="portfolio-label"
                  data-reveal
                >
                  {portfolioData.sectionTitle}
                </h2>
              )}

              {/* ─── Portfolio project cards */}
              {column.projects.map((project, projectIndex) => (
                <div className="portfolio-card" data-reveal key={projectIndex}>
                  <figure
                    className="card-banner img-holder has-before"
                    style={{
                      "--width": project.width,
                      "--height": project.height,
                    }}
                  >
                    <img
                      src={project.image}
                      width={project.width}
                      height={project.height}
                      loading="lazy"
                      alt={project.alt}
                      className="img-cover"
                    />
                  </figure>

                  <div className="card-content">
                    <h3 className="h4">
                      <a href={project.link} className="card-title">
                        {project.title}
                      </a>
                    </h3>
                    <p className="card-tag">{project.tag}</p>
                  </div>

                  <a
                    href={project.link}
                    className="btn-icon"
                    aria-label="See more"
                  >
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ─── Decorative portfolio shape element */}
        <img
          src={portfolioData.shapeImage.src}
          width={portfolioData.shapeImage.width}
          height={portfolioData.shapeImage.height}
          loading="lazy"
          alt={portfolioData.shapeImage.alt}
          className="shape"
        />
      </div>
    </section>
  );
}
