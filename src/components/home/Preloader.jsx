import { useEffect, useState } from "react";

function Preloader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let pageLoaded = false;

    const hideLoader = () => {
      if (!pageLoaded) {
        pageLoaded = true;
        setLoaded(true);
        document.body.classList.remove("active");
      }
    };

    // Page load hone par
    const handleLoad = () => {
      hideLoader();
    };

    // Maximum wait time (1.5s)
    const maxTimer = setTimeout(() => {
      hideLoader();
    }, 2000);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(maxTimer);
    };
  }, []);

  if (loaded) return null;

  return (
    <div className="sa-loader-wrapper">
      <div className="sa-loader">
        {[...Array(9)].map((_, i) => (
          <div className="sa-text" key={i}>
            <span>Loading</span>
          </div>
        ))}
        <div className="sa-line"></div>
      </div>
    </div>
  );
}

export default Preloader;
