import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/* SAME CELEBRITY ORDER */

const CELEBRITY_ORDER = [
  "Cengiz Coşkun",
  "Bilal Abbas Khan",
  "Momina Mustehsan",
  "Farhan Saeed",
  "Shehzad Roy",
  "Sadia Khan",
  "Ebraheem Al Samadi",
];

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

      const apiData = res.data.data || [];

      /* FILTER REQUIRED CELEBRITIES */

      const filtered = apiData.filter((item) =>
        CELEBRITY_ORDER.includes(item.celebrityName),
      );

      /* SORT BY ORDER */

      const sorted = CELEBRITY_ORDER.map((name) =>
        filtered.find((item) => item.celebrityName === name),
      ).filter(Boolean);

      /* LIMIT 7 */

      setData(sorted.slice(0, 7));
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
                <Link to={`/actor/${item._id}`} className="category-card">
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
