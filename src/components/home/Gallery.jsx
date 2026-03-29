import { ArrowUpRight } from "lucide-react";

function Gallery() {
  const galleryItems = [
    [
      {
        title: "Midnight Diner",
        tag: "Food, Lifestyle",
        image: "/gallery-1.jpg",
        alt: "Midnight Diner",
        width: 450,
        height: 625,
        link: "#",
      },
      {
        title: "Open Horizons",
        tag: "Landscape",
        image: "/gallery-2.jpg",
        alt: "Open Horizons",
        width: 450,
        height: 625,
        link: "#",
      },
    ],
    [
      {
        title: "Urban Motion",
        tag: "Model, Fashion",
        image: "/gallery-3.jpg",
        alt: "Urban Motion",
        width: 450,
        height: 625,
        link: "#",
      },
      {
        title: "Concrete Echoes",
        tag: "Architecture, Event",
        image: "/gallery-4.jpg",
        alt: "Concrete Echoes",
        width: 450,
        height: 625,
        link: "#",
      },
    ],
    [
      {
        title: "Quiet Faces",
        tag: "People, Film",
        image: "/gallery-5.jpg",
        alt: "Quiet Faces",
        width: 450,
        height: 625,
        link: "#",
      },
      {
        title: "Golden Vows",
        tag: "Wedding, Event",
        image: "/gallery-6.jpg",
        alt: "Golden Vows",
        width: 450,
        height: 625,
        link: "#",
      },
    ],
    [
      {
        title: "Modern Grace",
        tag: "Wedding, Model",
        image: "/gallery-7.jpg",
        alt: "Modern Grace",
        width: 450,
        height: 625,
        link: "#",
      },
      {
        title: "Inner Balance",
        tag: "Health & Wellness",
        image: "/gallery-8.jpg",
        alt: "Inner Balance",
        width: 450,
        height: 625,
        link: "#",
      },
    ],
  ];

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <ul className="gallery-list">
          {galleryItems.map((row, index) => (
            <li className="gallery-item" data-reveal key={index}>
              {row.map((card, i) => (
                <div className="gallery-card" key={i}>
                  <figure
                    className="card-banner img-holder has-before"
                    style={{ "--width": card.width, "--height": card.height }}
                  >
                    <img
                      src={card.image}
                      width={card.width}
                      height={card.height}
                      loading="lazy"
                      alt={card.alt}
                      className="img-cover"
                    />
                  </figure>

                  <div className="card-content">
                    <h3 className="h6">
                      <a href={card.link} className="card-title">
                        {card.title}
                      </a>
                    </h3>

                    <span className="card-tag">{card.tag}</span>
                  </div>

                  <a
                    href={card.link}
                    className="btn-icon"
                    aria-label="view project"
                  >
                    <ArrowUpRight size={22} />
                  </a>
                </div>
              ))}
            </li>
          ))}
        </ul>

        {/* Scroll down */}
        <a href="#service" className="scroll-down">
          <img
            src="/scroll-down.svg"
            width="40"
            height="66"
            alt="mouse scroll"
          />
        </a>

        {/* Shape */}
        <img
          src="/gallery-shape.svg"
          width="220"
          height="78"
          alt=""
          className="shape"
        />
      </div>
    </section>
  );
}

export default Gallery;
