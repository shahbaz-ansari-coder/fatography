import React, { useRef, useState, useEffect } from "react";
import "../../style/videoTestimonials.css";

// ✅ Flat array — row-wise order taaki mobile aur PC dono par same sequence rahe
// Order: 1,3,5,7 top row | 2,4,6,8 bottom row (per 2-col pair)
const galleryVideos = [
  {
    id: 1,
    videoUrl:
      "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776357693/Professional_Photography___Videography_in_Dubai_2_2_pvbsom.mp4",
    width: 450,
    height: 625,
  },
  {
    id: 3,
    videoUrl:
      "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776357703/Professional_Photography___Videography_in_Dubai_3_cske1g.mp4",
    width: 450,
    height: 625,
  },
  {
    id: 5,
    videoUrl:
      "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776357711/Professional_Photography___Videography_in_Dubai_4_w72ttl.mp4",
    width: 450,
    height: 625,
  },
  {
    id: 4,
    videoUrl:
      "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776357697/Professional_Photography___Videography_in_Dubai_2_n0qmjl.mp4",
    width: 450,
    height: 625,
  },
  {
    id: 2,
    videoUrl:
      "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776357694/Professional_Photography___Videography_in_Dubai_6_xxegfc.mp4",
    width: 450,
    height: 625,
  },
  {
    id: 6,
    videoUrl:
      "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776358721/Professional_Photography_Videography_in_Dubai_7_ebltlm.mp4",
    width: 450,
    height: 625,
  },
  {
    id: 7,
    videoUrl:
      "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776357694/Professional_Photography___Videography_in_Dubai_5_jnftwb.mp4",
    width: 450,
    height: 625,
  },
  {
    id: 8,
    videoUrl:
      "https://res.cloudinary.com/djlshebp8/video/upload/q_auto/f_auto/v1776357692/Professional_Photography___Videography_in_Dubai_8_ctwwqq.mp4",
    width: 450,
    height: 625,
  },
];

const VideoCard = ({ videoUrl, width, height, id, isActive, setActive }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        videoRef.current.muted = true;
        videoRef.current.play();
      });
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

  const shouldShowButton = !isActive || (isActive && isHovered);

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

      {/* Play/Pause Button */}
      <button
        className="play-btn"
        style={{ display: shouldShowButton ? "flex" : "none" }}
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

      {/* Overlay — only when paused */}
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
          What <em>Celebrities</em> Say
        </h2>
      </div>
      <div className="container">
        {/*
          ✅ Grid layout:
          Desktop (4-col): cols → 1  3  5  7
                                    2  4  6  8
          Mobile  (2-col): cols → 1  3
                                   2  4
                                   5  7
                                   6  8
          Yeh exactly mobile screenshot ke number order se match karta hai.
        */}
        <ul className="gallery-list">
          {galleryVideos.map((video) => (
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
        </ul>
      </div>
    </section>
  );
}
