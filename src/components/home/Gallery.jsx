import React, { useRef, useState, useEffect } from "react";
import "../../style/gallery.css";

const galleryVideos = [
  {
    id: 1,
    videoUrl:
      "./videos-assets/videography-videos/Professional_Photography_Videography_in_Dubai_10_jhjtve.mp4",
    thumbnail:
      "./videos-assets/videography-videos/Professional_Photography_Videography_in_Dubai_10_jhjtve-thumbnail.png",
    width: 450,
    height: 625,
  },
  {
    id: 2,
    videoUrl:
      "./videos-assets/videography-videos/Professional_Photography_Videography_in_Dubai_11_zdvxni.mp4",
    thumbnail:
      "./videos-assets/videography-videos/Professional_Photography_Videography_in_Dubai_11_zdvxni-thumbnail.png",
    width: 450,
    height: 625,
  },
  {
    id: 3,
    videoUrl:
      "./videos-assets/videography-videos/An_unplanned_shoot_with_such_star_models_anastasijaizabela_silakucukvatan_all_thanks_to_r_bfv6zu.mp4",
    thumbnail:
      "./videos-assets/videography-videos/An_unplanned_shoot_with_such_star_models_anastasijaizabela_silakucukvatan_all_thanks_to_r_bfv6zu-thumbnail.png",
    width: 450,
    height: 625,
  },
  {
    id: 4,
    videoUrl:
      "./videos-assets/videography-videos/Professional_Photography_Videography_in_Dubai_12_tuouvf.mp4",
    thumbnail:
      "./videos-assets/videography-videos/Professional_Photography_Videography_in_Dubai_12_tuouvf-thumbnail.png",
    width: 450,
    height: 625,
  },
  {
    id: 5,
    videoUrl: "./videos-assets/videography-videos/V36_o6wely.mp4",
    thumbnail: "./videos-assets/videography-videos/V36_o6wely-thumbnail.png",
    width: 450,
    height: 625,
  },
  {
    id: 6,
    videoUrl: "./videos-assets/videography-videos/BTS_of_my_upcoming_shoot.mp4",
    thumbnail:
      "./videos-assets/videography-videos/BTS_of_my_upcoming_shoot.png",
    width: 450,
    height: 625,
  },
];

const VideoCard = ({
  videoUrl,
  width,
  height,
  isActive,
  setActive,
  id,
  thumbnail,
}) => {
  const videoRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (isActive) {
      setIsLoading(true);
      video.muted = false;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {})
          .catch(() => {
            video.muted = true;
            video.play();
          });
      }
    } else {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
      setIsLoading(false);
    }
  }, [isActive]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 3;
    }
  };

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

  const shouldShowButton = !isLoading && (!isActive || (isActive && isHovered));

  return (
    <li
      className="video-sec-card"
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure
        className="video-sec-banner"
        style={{ "--width": width, "--height": height, position: "relative" }}
      >
        <video
          ref={videoRef}
          className="video-sec-media"
          loop
          muted
          playsInline
          preload="none"
          poster={thumbnail}
          onLoadedMetadata={handleLoadedMetadata}
          onPlaying={() => setIsLoading(false)}
          onWaiting={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          onPause={() => setIsLoading(false)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {isLoading && (
          <div className="video-loader">
            <div className="spinner"></div>
          </div>
        )}
      </figure>

      {shouldShowButton && (
        <button
          className="video-sec-play-btn"
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

      {!isActive && !isLoading && (
        <div className="video-sec-overlay">
          <div className="video-sec-play-ring">
            <svg viewBox="0 0 24 24" fill="currentColor" width="50">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      <div className="video-sec-corner top-left"></div>
      <div className="video-sec-corner bottom-right"></div>
    </li>
  );
};

export default function Gallery() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="video-sec-section" id="videography">
      <div className="reviews-header">
        <p className="rev-eyebrow">Videography</p>
        <h2 className="rev-title">
          See Our Work in <em>Action</em>
        </h2>
        <p className="rev-para">
          A glimpse into the stories we've had the privilege of capturing across
          Dubai and Pakistan—from iconic cityscapes to intimate studio sessions.
        </p>
      </div>

      <div className="video-sec-container">
        <ul className="video-sec-grid">
          {galleryVideos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              videoUrl={video.videoUrl}
              thumbnail={video.thumbnail}
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
