import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Trash2,
  Edit2,
  X,
  Loader,
  Star,
  MessageSquare,
  User,
  Plus,
  Upload,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const API_BASE_URL = "https://fatography-backend.vercel.app/api/reviews";

const StarRating = ({ rating, onRate, interactive = false }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={interactive ? 28 : 18}
          fill={
            (interactive ? hovered || rating : rating) >= star
              ? "rgb(182, 82, 79)"
              : "transparent"
          }
          color={
            (interactive ? hovered || rating : rating) >= star
              ? "rgb(182, 82, 79)"
              : "#444"
          }
          style={{
            cursor: interactive ? "pointer" : "default",
            transition: "all 0.15s",
          }}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onRate && onRate(star)}
        />
      ))}
    </div>
  );
};

const ReviewsManager = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expanded, setExpanded] = useState({});

  // State for the file itself
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    message: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/all`);
      setReviews(res.data.data || []);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setSelectedFile(null);
    setFormData({ name: "", rating: 0, message: "" });
  };

  const closeModal = () => {
    resetForm();
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.rating) return toast.error("Please select a rating");
    if (!formData.message.trim()) return toast.error("Message is required");

    try {
      setLoading(true);

      // Create FormData object to handle File upload
      const data = new FormData();
      data.append("name", formData.name);
      data.append("rating", formData.rating);
      data.append("message", formData.message);

      // "image" should match the field name your multer middleware expects on backend
      if (selectedFile) {
        data.append("image", selectedFile);
      }

      if (editingId) {
        await axios.put(`${API_BASE_URL}/update/${editingId}`, data);
        toast.success("Review updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/create`, data);
        toast.success("Review added successfully");
      }

      fetchReviews();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving review");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setFormData({
      name: review.name,
      rating: review.rating,
      message: review.message,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      toast.success("Review deleted");
      fetchReviews();
    } catch {
      toast.error("Delete failed");
    }
  };

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="cs-container" id="testimonials">
      <ToastContainer position="top-right" />

      <div className="cs-header">
        <div>
          <h1 className="cs-title">Reviews</h1>
          <p className="cs-subtitle">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""} • Avg
            rating: {avgRating} / 5
          </p>
        </div>
        <button
          className="cs-add-btn"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus size={18} /> New Review
        </button>
      </div>

      {loading && (
        <div className="cs-loading">
          <Loader className="cs-spin" />
        </div>
      )}

      {!loading && reviews.length > 0 && (
        <div className="cs-grid">
          {reviews.map((review) => {
            const isLong = review.message.length > 120;
            const isExpanded = expanded[review._id];
            return (
              <div key={review._id} className="cs-card">
                <div
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      className="avatar-container"
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "rgba(182,82,79,0.15)",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {review.profilePic ? (
                        <img
                          src={review.profilePic}
                          alt={review.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <User size={20} color="rgb(182,82,79)" />
                      )}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: "16px" }}>
                        {review.name}
                      </h3>
                      <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                  <p
                    style={{
                      margin: 0,
                      color: "#aaa",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    "
                    {isExpanded || !isLong
                      ? review.message
                      : review.message.slice(0, 120) + "..."}
                    "
                  </p>
                  {isLong && (
                    <button
                      onClick={() =>
                        setExpanded({
                          ...expanded,
                          [review._id]: !expanded[review._id],
                        })
                      }
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "rgb(182,82,79)",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: "13px",
                        textAlign: "left",
                      }}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    <button
                      className="cs-btn cs-btn-edit"
                      onClick={() => handleEdit(review)}
                    >
                      <Edit2 size={15} /> Edit
                    </button>
                    <button
                      className="cs-btn cs-btn-delete"
                      onClick={() => handleDelete(review._id)}
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="cs-modal-overlay">
          <div className="cs-modal">
            <div className="cs-modal-header">
              <h2>{editingId ? "Edit Review" : "Add Review"}</h2>
              <button className="cs-close-btn" onClick={closeModal}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="cs-form">
              <div className="cs-form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="cs-input"
                  placeholder="Reviewer name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="cs-form-group">
                <label>Profile Picture</label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    id="file-upload"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="file-upload"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 12px",
                      background: "#333",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    <Upload size={16} />{" "}
                    {selectedFile ? "Change Image" : "Upload Image"}
                  </label>
                  {selectedFile && (
                    <span style={{ fontSize: "12px", color: "#888" }}>
                      {selectedFile.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="cs-form-group">
                <label>Rating</label>
                <StarRating
                  rating={formData.rating}
                  interactive
                  onRate={(val) => setFormData({ ...formData, rating: val })}
                />
              </div>

              <div className="cs-form-group">
                <label>Message</label>
                <textarea
                  rows={4}
                  className="cs-input"
                  placeholder="Write review..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <div className="cs-form-actions">
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader className="cs-spin" size={16} />
                  ) : editingId ? (
                    "Update"
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsManager;
