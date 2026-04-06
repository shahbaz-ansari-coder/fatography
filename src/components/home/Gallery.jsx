import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import "../../style/gallery.css";

const galleryVideos = [
  [
    { id: 1, videoUrl: "/Professional Photography & Videography in Dubai_2.mp4", width: 450, height: 625 },
    { id: 2, videoUrl: "/Professional Photography & Videography in Dubai_3.mp4", width: 450, height: 625 },
  ],
  [
    { id: 3, videoUrl: "/Professional Photography & Videography in Dubai_4.mp4", width: 450, height: 625 },
    { id: 4, videoUrl: "/Professional Photography & Videography in Dubai_5.mp4", width: 450, height: 625 },
  ],
  [
    { id: 5, videoUrl: "/Professional Photography & Videography in Dubai_6.mp4", width: 450, height: 625 },
    { id: 6, videoUrl: "/Professional Photography & Videography in Dubai.mp4", width: 450, height: 625 },
  ],
  [
    { id: 7, videoUrl: "/Professional Photography & Videography in Dubai_7.mp4", width: 450, height: 625 },
    { id: 8, videoUrl: "/Professional Photography & Videography in Dubai_8.mp4", width: 450, height: 625 },
  ],
];

const VideoCard = ({ videoUrl, width, height }) => {
  const videoRef = useRef(null);

  const handleHover = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // Sound On
      videoRef.current.play().catch(() => {}); 
    }
  };

  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true; 
      videoRef.current.currentTime = 0; 
    }
  };

  return (
    <div className="gallery-card" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
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
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </figure>

      {/* Testimonials Style Overlay */}
      <div className="play-indicator-overlay">
        <div className="play-icon-v5">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="corner-border top-left"></div>
      <div className="corner-border bottom-right"></div>
    </div>
  );
};

export default function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <div className="reviews-header">
        <p className="rev-eyebrow">Testimonials</p>
        <h2 className="rev-title">
          What Our <em>Clients</em> Say
        </h2>
      </div>
      <div className="container">
        <ul className="gallery-list">
          {galleryVideos.map((column, index) => (
            <li className="gallery-item" key={index}>
              {column.map((video) => (
                <VideoCard
                  key={video.id}
                  videoUrl={video.videoUrl}
                  width={video.width}
                  height={video.height}
                />
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}