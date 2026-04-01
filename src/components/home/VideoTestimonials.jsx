import React, { useRef } from "react";
import "../../style/videoTestimonials.css";

const testimonialData = [
  { id: 1, videoUrl: "/Professional Photography & Videography in Dubai_2.mp4" },
  { id: 2, videoUrl: "/Professional Photography & Videography in Dubai_3.mp4" },
  { id: 3, videoUrl: "/Professional Photography & Videography in Dubai_4.mp4" },
  { id: 4, videoUrl: "/Professional Photography & Videography in Dubai_5.mp4" },
  { id: 5, videoUrl: "/Professional Photography & Videography in Dubai_6.mp4" },
  { id: 6, videoUrl: "/Professional Photography & Videography in Dubai.mp4" },
  { id: 7, videoUrl: "/Professional Photography & Videography in Dubai_7.mp4" },
  { id: 8, videoUrl: "/Professional Photography & Videography in Dubai_8.mp4" },
];

const VideoCard = ({ item }) => {
  const videoRef = useRef(null);

  const handleHover = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Sound On
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          /* Browser safety */
        });
      }
    }
  };

  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true; // Sound Off for next time
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="vertical-video-card"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className="video-container-v5">
        <video
          ref={videoRef}
          className="main-video-element"
          loop
          muted // Initial state for browser compliance
          playsInline
          preload="auto"
        >
          <source src={item.videoUrl} type="video/mp4" />
        </video>

        <div className="play-indicator-overlay">
          <div className="play-icon-v5">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="play-text">Hear the Story</span>
        </div>

        <div className="corner-border top-left"></div>
        <div className="corner-border bottom-right"></div>
      </div>
    </div>
  );
};

export default function CinematicTestimonials() {
  return (
    <section className="cinematic-section">
      <div className="cine-wrapper">
        <header className="celebrity-header">
          <h2 className="celebrity-title">What the Stars Say About Us</h2>

          <div className="divider"></div>

          <p className="celebrity-desc">
            Capturing the essence of stardom through
            <span className="highlight"> professional lighting </span>
            and creative vision.
          </p>
        </header>

        <div className="vertical-grid-4">
          {testimonialData.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
