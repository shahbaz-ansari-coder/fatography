import React from "react";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import Preloader from "../../components/home/Preloader";
import { useState, useEffect } from "react";

/* CELEBRITY CARD */

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
    <a href={`/actor/${item._id}`} className="celeb-card-v3 card-flip">
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
    </a>
  );
};

/* CATEGORY LIST */

const CategoryList = ({ data }) => {
  return (
    <section className="section category" aria-label="photography category">
      <div className="container">
        <ul className="category-list">
          {data.map((item) => (
            <li className="category-item" key={item._id}>
              <a href={`/actor/${item._id}`} className="category-card">
                <h3 className="h4 card-title">{item.celebrityName},</h3>
                <figure
                  className="card-banner img-holder"
                  style={{ "--width": "600px", "--height": "290px" }}
                >
                  <img
                    src={item.thumbnail || item.images?.[0]}
                    alt={item.celebrityName}
                    loading="lazy"
                    className="img-cover"
                  />
                </figure>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* CELEBRITY GALLERY — FULL DATA, NO LIMIT, NO ORDER */

const CelebrityGallery = () => {
  const [gridData, setGridData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [gridLoading, setGridLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    fetchGridData();
    fetchCategoryData();
  }, []);

  const fetchGridData = async () => {
    try {
      const res = await fetch(
        "https://fatography-backend.vercel.app/api/celebrity-shoot/all-no-images",
      );
      const json = await res.json();
      setGridData(json.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setGridLoading(false);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const res = await fetch(
        "https://fatography-backend.vercel.app/api/celebrity-shoot/all",
      );
      const json = await res.json();
      setCategoryData(json.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setCategoryLoading(false);
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

        {/* GRID */}
        <div className="celebrity-grid-v3">
          {gridLoading ? (
            <p>Loading...</p>
          ) : (
            gridData.map((item) => <CelebrityCard key={item._id} item={item} />)
          )}
        </div>

        {/* CATEGORY */}
        <div className="celebrity-name-gallery">
          {categoryLoading ? (
            <p>Loading...</p>
          ) : (
            <CategoryList data={categoryData} />
          )}
        </div>
      </div>
    </section>
  );
};

/* PAGE */

const CelebrityShootsPage = () => {
  return (
    <>
      <Preloader />
      <Header />
      <main className="!py-5 !sm:py-10">
        <CelebrityGallery />
      </main>
      <Footer />
    </>
  );
};

export default CelebrityShootsPage;
