import React, { useRef, useState, useEffect } from "react";
import reactLogo from "../../assets/react.svg";
import "../../style/videoTestimonials.css";

const galleryVideos = [
  {
    id: 1,
    videoUrl:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-1.mp4",
    thumbnail:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-1-thumbnail.png",
    width: 450,
    height: 625,
  },
  {
    id: 3,
    videoUrl:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-2.mp4",
    thumbnail:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-2-thumbnail.png",
    width: 450,
    height: 625,
  },
  {
    id: 5,
    videoUrl:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-3.mp4",
    thumbnail:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-3-thumbnail.png",
    width: 450,
    height: 625,
  },
  {
    id: 4,
    videoUrl:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-4.mp4",
    thumbnail:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-4-thumbnail.png",
    width: 450,
    height: 625,
  },
  {
    id: 2,
    videoUrl:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-5.mp4",
    thumbnail:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-5-thumbnail.png",
    width: 450,
    height: 625,
  },
  {
    id: 6,
    videoUrl:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-6.mp4",
    thumbnail:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-6-thumbnail.png",
    width: 450,
    height: 625,
  },
  {
    id: 7,
    videoUrl:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-7.mp4",
    thumbnail:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-7-thumbnail.png",
    width: 450,
    height: 625,
  },
  {
    id: 8,
    videoUrl:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-8.mp4",
    thumbnail:
      "./videos-assets/celebrity-testimonials/celebrity-testimonials-8-thumbnail.png",
    width: 450,
    height: 625,
  },
];

const VideoCard = ({
  videoUrl,
  width,
  height,
  id,
  isActive,
  setActive,
  thumbnail,
}) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      setIsLoading(true); // Play trigger hotey hi spinner start
      videoRef.current.muted = false;

      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {})
          .catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play();
            }
          });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      setIsLoading(false);
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

  // Loading hotey waqt Play/Pause button poori tarah hide ho jaye ga
  const shouldShowButton = !isLoading && (!isActive || (isActive && isHovered));

  return (
    <li
      className="gallery-card"
      onClick={(e) => {
        e.stopPropagation();
        setActive(isActive ? null : id);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure
        className="card-banner img-holder has-before"
        style={{ "--width": width, "--height": height, position: "relative" }}
      >
        <video
          ref={videoRef}
          className="img-cover"
          loop
          muted
          playsInline
          preload="none"
          poster={thumbnail}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          onCanPlay={() => setIsLoading(false)}
          onPause={() => setIsLoading(false)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="video-loader">
            <div className="spinner"></div>
          </div>
        )}
      </figure>

      {/* Play/Pause Button — Hidden during loading */}
      {shouldShowButton && (
        <button
          className="play-btn"
          aria-label={isActive ? "Pause video" : "Play video"}
        >
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

      {/* Overlay — Only when paused AND not loading */}
      {!isActive && !isLoading && (
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
    </li>
  );
};

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="section gallery" id="gallery">
      <div className="reviews-header">
        <p className="rev-eyebrow">Testimonials</p>
        <h2 className="rev-title">
          What <em>Celebrities</em> Say About Fatography
        </h2>

        <p className="rev-para">
          Trusted by celebrities and loved by clients, Fatography is known for
          creating powerful visuals and unforgettable moments
        </p>
      </div>
      <div className="container">
        <ul className="gallery-list">
          {galleryVideos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              videoUrl={video.videoUrl}
              width={video.width}
              height={video.height}
              thumbnail={video.thumbnail}
              isActive={activeVideo === video.id}
              setActive={setActiveVideo}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}