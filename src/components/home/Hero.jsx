import { useEffect, useState } from "react";

function Hero() {
  const animatedWords = [
    {
      text: "Wedding Photography",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552",
    },
    {
      text: "Pre Wedding Shoots",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
    },
    {
      text: "Product Photography",
      image:
        "https://img.freepik.com/free-photo/product-photography-shoot-shoes_53876-137635.jpg?t=st=1774976449~exp=1774980049~hmac=3e22ed976b98c41bb3eb8a3c80bf84a4c66e9bf86217b3a990bd64c8996b4f97&w=740",
    },
    {
      text: "Corporate Shoots",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    },
    {
      text: "Event Photography",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
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
          <h1 className="h1 hero-title">Fatography</h1>

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
          {/* Aap yahan hoverData.text bhi display karwa sakte hain agar zaroorat ho */}
        </div>
      )}
    </section>
  );
}

export default Hero;
