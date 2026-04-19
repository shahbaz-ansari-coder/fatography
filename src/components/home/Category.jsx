import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

export default function Category() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCelebrity();
  }, []);

  const fetchCelebrity = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://fatography-backend.vercel.app/api/celebrity-shoot/all",
      );

      setData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching celebrity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section category" aria-label="photography category">
      <div className="container">
        <ul className="category-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((item) => (
              <li className="category-item" key={item._id}>
                <Link to={`actor/${item._id}`} className="category-card">
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
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
