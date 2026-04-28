import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/celebrityGallery.css";
import Category from "./Category";
import { Link } from "react-router";

/* ORDER OF CELEBRITIES */

const CELEBRITY_ORDER = [
  "Cengiz Coşkun",
  "Bilal Abbas Khan",
  "Momina Mustehsan",
  "Farhan Saeed",
  "Shehzad Roy",
  "Sadia Khan",
];

/* CARD */

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
    <Link to={`actor/${item._id}`} className="celeb-card-v3 card-flip">
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
    </Link>
  );
};

/* MAIN COMPONENT */

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

      const apiData = res.data.data || [];

      /* FILTER ONLY REQUIRED CELEBRITIES */

      const filtered = apiData.filter((item) =>
        CELEBRITY_ORDER.includes(item.celebrityName),
      );

      /* SORT BY GIVEN ORDER */

      const sorted = CELEBRITY_ORDER.map((name) =>
        filtered.find((item) => item.celebrityName === name),
      ).filter(Boolean);

      setCelebrityData(sorted);

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
          <Link to={"/celebrity-shoots"}>
          <button className="main-glow-btn">
            Our Celebrity Shoots
            <div className="btn-glow-effect"></div>
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
