import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Sparkles,
  Quote,
} from "lucide-react";
import "../../style/actorShoot.css";

const ActorShoot = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actorData, setActorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const res = await axios.get(
          `https://fatography-backend.vercel.app/api/celebrity-shoot/get/${id}`,
        );
        setActorData(res.data.data);
      } catch (err) {
        console.error("Error fetching actor details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActorDetails();
  }, [id]);

  if (loading)
    return (
      <div className="actor-loader">
        <div className="spinner"></div>
      </div>
    );
  if (!actorData)
    return <div className="actor-error">Shoot Profile Not Found.</div>;

  const allMedia = [...actorData.thumbnails, ...actorData.images];

  return (
    <div className="actor-page-container">
      {/* Mini Top Bar */}
      <div className="actor-top-nav">
        <button onClick={() => navigate(-1)} className="back-circle">
          <ArrowLeft size={20} />
        </button>
        <div className="nav-center-text">EDITORIAL SERIES '26</div>
        <div className="nav-right-empty"></div>
      </div>

      <main className="actor-main-content">
        {/* Section 1: Split Header */}
        <section className="actor-split-header">
          <div className="header-left-info">
            <div className="brand-badge">
              <Sparkles size={12} /> Premier Shoot
            </div>
            <h1 className="actor-title-main">{actorData.celebrityName}</h1>

            <div className="shoot-specs">
              <div className="spec-item">
                <label>Photographer</label>
                <p>{actorData.photographer || "Fatimah Haroon"}</p>
              </div>
              <div className="spec-item">
                <label>Location</label>
                <p>{actorData.location || "International"}</p>
              </div>
            </div>

            <div className="brand-philosophy">
              <Quote className="quote-icon" size={24} />
              <p>
                We define celebrity aesthetics through a lens of sophistication.
                Our brand captures the raw essence of icons, blending cinematic
                lighting with high-fashion storytelling.
              </p>
            </div>
          </div>

          <div className="header-right-image">
            <div className="main-frame">
              <img src={actorData.thumbnails[0]} alt="Hero" />
              <div className="frame-overlay-tag">Cover Story</div>
            </div>
          </div>
        </section>

        {/* Section 2: Image Showcase */}
        <section className="actor-gallery-section">
          <div className="gallery-intro">
            <div className="line-divider"></div>
            <span>THE COLLECTION</span>
            <div className="line-divider"></div>
          </div>

          <div className="actor-gallery-grid">
            {allMedia.map((img, index) => (
              <div key={index} className={`gallery-box box-${(index % 6) + 1}`}>
                <img src={img} alt="Gallery Shot" loading="lazy" />
                <div className="box-hover">
                  <span className="shot-number">NO. {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
};

export default ActorShoot;
