import { useEffect, useState } from "react";

function Hero() {
const animatedWords = [
  "Wedding Photography",
  "Pre Wedding Shoots",
  "Product Photography",
  "Corporate Shoots",
  "Event Photography",
];

  const [activeIndex, setActiveIndex] = useState(0);

  // rotate words
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev >= animatedWords.length - 1 ? 0 : prev + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // render animated letters
  const renderAnimatedText = (text, isActive) => {
    return text.split("").map((char, index) => {
      const delay = `${index * 0.05}s`;

      return (
        <span
          key={index}
          style={{ animationDelay: delay }}
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
      );
    });
  };

  return (
    <section className="section hero" id="home" aria-label="home">
      <div className="container">
        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="h1 hero-title">Fatography</h1>

          <div className="wrapper h2">
            {animatedWords.map((word, index) => (
              <strong
                key={index}
                className={`strong ${index === activeIndex ? "active" : ""}`}
                data-letter-effect
              >
                {renderAnimatedText(word, index === activeIndex)}
              </strong>
            ))}
          </div>

          <p className="hero-text">17+ Years Of Creative Experience</p>
        </div>
      </div>

      {/* Shape */}
      <img
        src="/hero-shape.svg"
        width="211"
        height="189"
        alt=""
        className="shape"
      />
    </section>
  );
}

export default Hero;
