import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/celebrityGallery.css";
import Category from "./Category";

const CelebrityCard = ({ item }) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (!item?.thumbnails?.length) return;

    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % item.thumbnails.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [item]);

  return (
    <div className="celeb-card-v3 card-flip">
      <div className="image-container-v3">
        {item.thumbnails?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={item.celebrityName}
            className={`celeb-img-v3 ${index === currentImg ? "active" : ""}`}
          />
        ))}

        <div className="glass-overlay"></div>
      </div>

      <div className="celeb-name-container">
        <h3 className="celeb-name-text">{item.celebrityName}</h3>
        <span className="celeb-subtext">View Shoot</span>
      </div>
    </div>
  );
};

export default function CelebrityGallery() {
  const [celebrityData, setCelebrityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCelebrityShoots();
  }, []);

  const fetchCelebrityShoots = async () => {
    try {
      const res = await axios.get(
        "https://fatography-backend.vercel.app/api/celebrity-shoot/all-no-images",
      );

      setCelebrityData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <section className="celebrity-page" id="celebrity-shoots">
      <div className="celeb-container">
        <div className="reviews-header">
          <p className="rev-eyebrow">Celebrity Shoots</p>
          <h2 className="rev-title">
            Capturing Stars in Their <em>Best Light</em>
          </h2>
        </div>

        <div className="celebrity-grid-v3">
          {loading ? (
            <p>Loading...</p>
          ) : (
            celebrityData.map((item) => (
              <CelebrityCard key={item._id} item={item} />
            ))
          )}
        </div>

        <div className="celebrity-name-gallery">
          <Category />
        </div>

        <div className="button-wrapper-center">
          <button className="main-glow-btn">
            Our Celebrity Shoots
            <div className="btn-glow-effect"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
