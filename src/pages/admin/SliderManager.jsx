import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Loader, X, Trash2, Image as ImageIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

import "../../style/sliderManagement.css";

const API_ALL = "https://fatography-backend.vercel.app/api/slider/all";
const API_UPLOAD = "https://fatography-backend.vercel.app/api/slider/upload";
const API_DELETE = (id) => `https://fatography-backend.vercel.app/api/slider/delete/${id}`;

const SliderManager = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [altText, setAltText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_ALL);
      setSlides(res.data.data || []);
    } catch {
      toast.error("Failed to load slides");
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

      await axios.post(API_UPLOAD, form);
      toast.success("Slide uploaded successfully");

      setAltText("");
      setImageFile(null);
      setPreviewUrl(null);
      fetchSlides();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slide?")) return;
    try {
      await axios.delete(API_DELETE(id));
      toast.success("Slide deleted");
      fetchSlides();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="sm-container">
      <ToastContainer position="top-right" />

      {/* Header */}
      <div className="sm-header">
        <div>
          <h1 className="sm-title">Slider Manager</h1>
          <p className="sm-subtitle">Upload hero slider images</p>
        </div>
      </div>

      {/* Upload Card */}
      <div className="sm-upload-card">
        <div className="sm-form-group">
          <label>Alt Text</label>
          <input
            type="text"
            className="sm-input"
            placeholder="e.g. Dubai Wedding Photography"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </div>

        <div className="sm-form-group">
          <label>Image</label>

          {!previewUrl ? (
            <label className="sm-drop-area">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <ImageIcon size={36} color="#555" />
              <p>Click to select an image</p>
              <span>JPG, PNG, WEBP supported</span>
            </label>
          ) : (
            <div className="sm-img-preview">
              <img src={previewUrl} alt="preview" />
              <button className="sm-remove-img" onClick={removeSelected}>
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <button
          className="sm-upload-btn"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <Loader size={17} className="sm-spin" />
          ) : (
            <Upload size={17} />
          )}
          {uploading ? "Uploading…" : "Upload Slide"}
        </button>
      </div>

      {/* Slides Grid */}
      {loading && (
        <div className="sm-loading">
          <Loader className="sm-spin" size={32} />
        </div>
      )}

      {!loading && slides.length === 0 && (
        <div className="sm-empty">
          <ImageIcon size={48} />
          <p>No slides uploaded yet</p>
        </div>
      )}

      {!loading && slides.length > 0 && (
        <div className="sm-slides-list">
          <h3 className="sm-section-title">
            Uploaded Slides ({slides.flatMap((s) => s.images || []).length})
          </h3>
          <div className="sm-thumbs-grid">
            {slides.map((slide) =>
              (slide.images || []).map((img, i) => (
                <div key={`${slide._id}-${i}`} className="sm-thumb">
                  <img src={img} alt={slide.alt} />
                  <div className="sm-thumb-footer">
                    <p className="sm-thumb-alt">{slide.alt}</p>
                    <button
                      className="sm-delete-btn"
                      onClick={() => handleDelete(slide._id)}
                      title="Delete slide"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderManager;
