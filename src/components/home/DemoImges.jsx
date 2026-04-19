import React, { useEffect, useState } from "react";
import axios from "axios";
import DomeGallery from "../react-bits/DomeGallery";

const DemoImges = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          "https://fatography-backend.vercel.app/api/shoot-images/all",
        );

        if (res.data?.success) {
          const formatted = res.data.data.flatMap((item) =>
            (item.images || []).map((img) => ({
              src: img,
              alt: item.alt || "photoshoot",
            })),
          );

          setImages(formatted);
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }} id="all-pictures">
      <DomeGallery
        images={images}
        fit={1}
        minRadius={350}
        maxVerticalRotationDeg={0}
        segments={34}
        dragDampening={2}
        grayscale
      />
    </div>
  );
};

export default DemoImges;
