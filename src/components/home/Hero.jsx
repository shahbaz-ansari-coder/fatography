import { useEffect, useState } from "react";

function Hero() {
  const animatedWords = [
    {
      text: "Wedding Photography",
      image:
        "https://res.cloudinary.com/djlshebp8/image/upload/w_250,h_250,c_fill,f_auto,q_auto/v1776375726/services/shoots/idnb0cf352sf6pzl5at3.jpg",
    },
    {
      text: "Pre Wedding Shoots",
      image:
        "https://res.cloudinary.com/djlshebp8/image/upload/q_auto/w_250,h_250,c_fill,f_auto,q_auto/v1777285069/services/shoots/wwcdn7qvmbiyjisg0phd.jpg",
    },
    {
      text: "Fashion Photography",
      image:
        "https://res.cloudinary.com/djlshebp8/image/upload/q_auto/w_250,h_250,c_fill,f_auto,q_auto/v1778627128/services/shoots/tsqkapvtproozoai5ybj.jpg",
    },
    {
      text: "Food Photography",
      image:
        "https://res.cloudinary.com/djlshebp8/image/upload/q_auto/w_250,h_250,c_fill,f_auto,q_auto/v1776376698/services/shoots/coo0jfvr4vxrv0femutp.jpg",
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
          <div className="hero-text-logo">
            <img src="/text_logo.png" alt="a" />
          </div>

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
          <img
            src={hoverData.img}
            alt={hoverData.text}
            loading="lazy"
            decoding="async"
            width="250"
            height="250"
          />
        </div>
      )}
    </section>
  );
}

export default Hero;
