import { useEffect, useState } from "react";

function Hero() {
  const animatedWords = [
    {
      text: "Wedding Photography",
      image:
        "https://res.cloudinary.com/djlshebp8/image/upload/v1776375629/services/banner/uo9dcyvv1oufn5ak9nwo.jpg",
    },
    {
      text: "Pre Wedding Shoots",
      image:
        "https://res.cloudinary.com/djlshebp8/image/upload/q_auto/f_auto/v1777285069/services/shoots/wwcdn7qvmbiyjisg0phd.jpg",
    },
    {
      text: "Fashion Photography",
      image:
        "https://res.cloudinary.com/djlshebp8/image/upload/v1776884899/services/banner/fnxjodalixwp47elkppn.jpg",
    },
    {
      text: "Food Photography",
      image:
        "https://res.cloudinary.com/djlshebp8/image/upload/v1776376702/services/shoots/qml9b0efrwhmmm2g52yx.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Is state mein hum pura object (text aur image) store karenge
  const [hoverData, setHoverData] = useState({ img: null, text: "" });

  // Automatic slider logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveIndex((prev) =>
          prev >= animatedWords.length - 1 ? 0 : prev + 1,
        );
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering, animatedWords.length]);

  const renderAnimatedLetters = (text, isActive) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        style={{ animationDelay: `${index * 0.05}s` }}
        className={
          char === " "
            ? `${isActive ? "in" : "out"} space`
            : isActive
              ? "in"
              : "out"
        }
      >
        {char}
      </span>
    ));
  };

  return (
    <section className="section hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-text-logo">
            <img src="/text_logo.png" alt="a" />
          </h1>

          {/* Parent Wrapper par hover logic */}
          <div
            className="wrapper h2"
            onMouseEnter={() => {
              const currentItem = animatedWords[activeIndex];
              setHoverData({ img: currentItem.image, text: currentItem.text });
              setIsHovering(true);
            }}
            onMouseLeave={() => {
              setHoverData({ img: null, text: "" });
              setIsHovering(false);
            }}
          >
            {animatedWords.map((item, index) => (
              <strong
                key={index}
                className={`strong ${index === activeIndex ? "active" : ""}`}
              >
                {renderAnimatedLetters(item.text, index === activeIndex)}
              </strong>
            ))}
          </div>

          <p className="hero-text">17+ Years Of Creative Experience</p>
        </div>
      </div>

      {/* State se data utha kar image show karna */}
      {hoverData.img && (
        <div className="hero-hover-image">
          <img src={hoverData.img} alt={hoverData.text} />
        </div>
      )}
    </section>
  );
}

export default Hero;
