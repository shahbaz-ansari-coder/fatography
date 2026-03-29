import { useEffect, useState } from "react";

// ─── Preloader data
const preloaderData = {
  loadingImage: "/logo.svg",
  loadingCircleImage: "/loading-circle.svg",
  loadingAltText: "loading",
};

// ─── Page preloader component
function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
      document.body.classList.remove("active");
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className={`loading ${isLoaded ? "loaded" : ""}`} data-loading>
      {/* Main loading icon */}
      <img
        src={preloaderData.loadingImage}
        width="155"
        height="155"
        alt={preloaderData.loadingAltText}
        className="img"
      />

      {/* Animated loading circle */}
      <img
        src={preloaderData.loadingCircleImage}
        width="170"
        height="170"
        alt=""
        className="circle"
      />
    </div>
  );
}

export default Preloader;
