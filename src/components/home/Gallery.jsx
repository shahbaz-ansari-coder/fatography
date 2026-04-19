import React, { useRef, useState, useEffect } from "react";
import "../../style/gallery.css";

const galleryVideos = [
  [
    {
      id: 1,
      videoUrl:
        "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776358991/Professional_Photography_Videography_in_Dubai_10_jhjtve.mp4",
      width: 450,
      height: 625,
    },
  ],
  [
    {
      id: 3,
      videoUrl:
        "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776358990/Professional_Photography_Videography_in_Dubai_11_zdvxni.mp4",
      width: 450,
      height: 625,
    },
  ],
  [
    {
      id: 5,
      videoUrl:
        "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776358977/Professional_Photography_Videography_in_Dubai_9_sma8kp.mp4",
      width: 450,
      height: 625,
    },
  ],
  [
    {
      id: 7,
      videoUrl:
        "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776358975/Professional_Photography_Videography_in_Dubai_12_tuouvf.mp4",
      width: 450,
      height: 625,
    },
  ],
];

const VideoCard = ({ videoUrl, width, height, isActive, setActive, id }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false); // Hover state tracking

  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
    }
  }, [isActive]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isActive) {
          setActive(null);
        }
      },
      { threshold: 0.5 },
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [isActive, setActive]);

  const handleToggle = (e) => {
    e.stopPropagation();
    setActive(isActive ? null : id);
  };

  return (
    <div
      className="gallery-card"
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure
        className="card-banner img-holder has-before"
        style={{ "--width": width, "--height": height }}
      >
        <video
          ref={videoRef}
          className="img-cover"
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </figure>

      {/* Logic: 
          1. Agar video paused hai (!isActive) -> Show button.
          2. Agar video play ho rahi hai (isActive) AND hover hai (isHovered) -> Show button.
      */}
      {(!isActive || (isActive && isHovered)) && (
        <button className="play-btn">
          {isActive ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="30">
              <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="30">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}

      {/* Overlay: Only when not active */}
      {!isActive && (
        <div className="play-indicator-overlay">
          <div className="play-icon-v5">
            <svg viewBox="0 0 24 24" fill="currentColor" width="50">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      <div className="corner-border top-left"></div>
      <div className="corner-border bottom-right"></div>
    </div>
  );
};

export default function Gallery() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="section gallery" id="videography">
      <div className="reviews-header">
        <p className="rev-eyebrow">Videography</p>
        <h2 className="rev-title">
          See Our Work in <em>Action</em>
        </h2>
      </div>

      <div className="container">
        <ul className="gallery-list">
          {galleryVideos.map((column, index) => (
            <li className="gallery-item" key={index}>
              {column.map((video) => (
                <VideoCard
                  key={video.id}
                  id={video.id}
                  videoUrl={video.videoUrl}
                  width={video.width}
                  height={video.height}
                  isActive={activeVideo === video.id}
                  setActive={setActiveVideo}
                />
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
