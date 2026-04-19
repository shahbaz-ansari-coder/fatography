import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Upload,
  Trash2,
  Eye,
  X,
  Loader,
  Image as ImageIcon,
  Plus,
  Images,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "../../style/shootImageManagement.css";

const API_BASE = "https://fatography-backend.vercel.app/api/shoot-images";

const ShootImagesManager = () => {
  const [shoots, setShoots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // upload form
  const [altText, setAltText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // lightbox
  const [lightbox, setLightbox] = useState(null); // { images[], index }

  useEffect(() => {
    fetchShoots();
  }, []);

  const fetchShoots = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/all`);
      setShoots(res.data.data || []);
    } catch {
      toast.error("Failed to load shoot images");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const removeSelected = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!altText.trim()) return toast.error("Alt text is required");
    if (!imageFile) return toast.error("Please select an image");

    try {
      setUploading(true);
      const form = new FormData();
      form.append("alt", altText);
      form.append("images", imageFile);
      await axios.post(`${API_BASE}/upload`, form);
      toast.success("Image uploaded successfully");
      setAltText("");
      setImageFile(null);
      setPreviewUrl(null);
      fetchShoots();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this shoot image?")) return;
    try {
      await axios.delete(`${API_BASE}/delete/${id}`);
      toast.success("Deleted successfully");
      fetchShoots();
    } catch {
      toast.error("Delete failed");
    }
  };

  const totalImages = shoots.reduce(
    (sum, s) => sum + (s.images?.length || 0),
    0,
  );
  const allImages = shoots.flatMap((s) => s.images || []);

  // lightbox navigation
  const openLightbox = (images, index) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);
  const lbPrev = () =>
    setLightbox((lb) => ({
      ...lb,
      index: (lb.index - 1 + lb.images.length) % lb.images.length,
    }));
  const lbNext = () =>
    setLightbox((lb) => ({ ...lb, index: (lb.index + 1) % lb.images.length }));

  // keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <div className="si-container">
      <ToastContainer position="top-right" />

      {/* ── Header ── */}
      <div className="si-header">
        <div>
          <h1 className="si-title">Shoot Images</h1>
          <p className="si-subtitle">Manage your photography shoot gallery</p>
        </div>

        {/* Stats */}
        <div className="si-stats">
          <div className="si-stat">
            <span className="si-stat-num">{shoots.length}</span>
            <span className="si-stat-label">Uploads</span>
          </div>
          <div className="si-stat-divider" />
          <div className="si-stat">
            <span className="si-stat-num">{totalImages}</span>
            <span className="si-stat-label">Total Images</span>
          </div>
        </div>
      </div>

      {/* ── Upload Card ── */}
      <div className="si-upload-card">
        <h3 className="si-card-heading">
          <Plus size={17} /> Upload New Image
        </h3>

        <div className="si-form-row">
          <div className="si-form-group" style={{ flex: 1 }}>
            <label>Alt Text</label>
            <input
              type="text"
              className="si-input"
              placeholder="e.g. Dubai Wedding Portrait"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            />
          </div>

          <div className="si-form-group">
            <label>Image</label>
            {!previewUrl ? (
              <label className="si-file-btn">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <ImageIcon size={16} /> Choose File
              </label>
            ) : (
              <div className="si-selected-file">
                <img src={previewUrl} alt="preview" className="si-file-thumb" />
                <span className="si-file-name">{imageFile?.name}</span>
                <button className="si-remove-file" onClick={removeSelected}>
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="si-form-group si-form-action">
            <label style={{ opacity: 0, userSelect: "none" }}>x</label>
            <button
              className="si-upload-btn"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? (
                <Loader size={16} className="si-spin" />
              ) : (
                <Upload size={16} />
              )}
              {uploading ? "Uploading…" : "Upload"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      {loading && (
        <div className="si-loading">
          <Loader className="si-spin" size={32} />
        </div>
      )}

      {!loading && shoots.length === 0 && (
        <div className="si-empty">
          <Images size={52} />
          <p>No shoot images yet. Upload your first one!</p>
        </div>
      )}

      {!loading && shoots.length > 0 && (
        <div className="si-grid">
          {shoots.map((shoot) => (
            <div key={shoot._id} className="si-card">
              {/* thumbnail — click to open lightbox */}
              <div
                className="si-img-wrap"
                onClick={() => openLightbox(shoot.images, 0)}
              >
                <img
                  src={shoot.images?.[0]}
                  alt={shoot.alt}
                  className="si-img"
                />
                <div className="si-img-overlay">
                  <Eye size={22} color="white" />
                </div>
                {shoot.images?.length > 1 && (
                  <div className="si-count-badge">
                    <ImageIcon size={12} /> {shoot.images.length}
                  </div>
                )}
              </div>

              <div className="si-card-footer">
                <p className="si-alt-text">{shoot.alt}</p>
                <button
                  className="si-delete-btn"
                  onClick={() => handleDelete(shoot._id)}
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="si-lightbox" onClick={closeLightbox}>
          <button className="si-lb-close" onClick={closeLightbox}>
            <X size={24} />
          </button>

          <div className="si-lb-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.images[lightbox.index]}
              alt=""
              className="si-lb-img"
            />

            {lightbox.images.length > 1 && (
              <>
                <button className="si-lb-arrow si-lb-prev" onClick={lbPrev}>
                  &#8249;
                </button>
                <button className="si-lb-arrow si-lb-next" onClick={lbNext}>
                  &#8250;
                </button>
                <div className="si-lb-counter">
                  {lightbox.index + 1} / {lightbox.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShootImagesManager;
