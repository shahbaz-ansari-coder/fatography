import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Upload,
  Trash2,
  Edit2,
  Eye,
  X,
  Check,
  Loader,
  Image as ImageIcon,
  Camera,
  MapPin,
  Video,
} from "lucide-react";
import "../../style/celebrityManagement.css";
import { toast, ToastContainer } from "react-toastify";

const API_BASE_URL = "https://fatography-backend.vercel.app/api/celebrity-shoot";

const CelebrityShootsManager = () => {
  const [shoots, setShoots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [selectedThumbnails, setSelectedThumbnails] = useState([]); // new images ke indexes
  const [existingThumbnails, setExistingThumbnails] = useState([]); // existing thumbnail URLs
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [existingVideo, setExistingVideo] = useState(null);
  const [viewingShoot, setViewingShoot] = useState(null);
  const [formData, setFormData] = useState({
    celebrityName: "",
    photographer: "",
    location: "",
  });

  useEffect(() => {
    fetchShoots();
  }, []);

  const fetchShoots = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/all`);
      setShoots(res.data.data || []);
    } catch {
      toast.error("Failed to load shoots");
    } finally {
      setLoading(false);
    }
  };

  // ── IMAGE HANDLER ─────────────────────────────────────────────────────────
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const totalImages =
      files.length + selectedImages.length + existingImages.length;
    if (totalImages > 25) {
      toast.error("Maximum 25 images allowed");
      return;
    }
    setSelectedImages((prev) => [...prev, ...files]);
    const newUrls = files.map((f) => URL.createObjectURL(f));
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const removeNewImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setSelectedThumbnails((prev) =>
      prev.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i)),
    );
  };

  const removeExistingImage = (index) => {
    const removedUrl = existingImages[index];
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    // Agar yeh existing thumbnail tha to remove karo
    setExistingThumbnails((prev) => prev.filter((url) => url !== removedUrl));
  };

  // New images thumbnail toggle
  const toggleNewThumbnail = (index) => {
    const totalSelected = selectedThumbnails.length + existingThumbnails.length;
    if (selectedThumbnails.includes(index)) {
      setSelectedThumbnails((prev) => prev.filter((i) => i !== index));
      return;
    }
    if (totalSelected >= 3) {
      toast.error("Only 3 thumbnails allowed");
      return;
    }
    setSelectedThumbnails((prev) => [...prev, index]);
  };

  // Existing images thumbnail toggle
  const toggleExistingThumbnail = (url) => {
    const totalSelected = selectedThumbnails.length + existingThumbnails.length;
    if (existingThumbnails.includes(url)) {
      setExistingThumbnails((prev) => prev.filter((u) => u !== url));
      return;
    }
    if (totalSelected >= 3) {
      toast.error("Only 3 thumbnails allowed");
      return;
    }
    setExistingThumbnails((prev) => [...prev, url]);
  };

  // ── VIDEO HANDLER ─────────────────────────────────────────────────────────
  const handleVideoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 200 * 1024 * 1024) {
      toast.error("Video must be under 200 MB");
      return;
    }
    setSelectedVideo(file);
    setVideoPreviewUrl(URL.createObjectURL(file));
    setExistingVideo(null);
  };

  const removeVideo = () => {
    setSelectedVideo(null);
    setVideoPreviewUrl(null);
    setExistingVideo(null);
  };

  // ── SUBMIT ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.celebrityName.trim())
      return toast.error("Celebrity name required");
    if (!formData.photographer.trim())
      return toast.error("Photographer required");
    if (!formData.location.trim()) return toast.error("Location required");
    if (selectedImages.length === 0 && existingImages.length === 0)
      return toast.error("Upload at least one image");

    const totalThumbnails =
      selectedThumbnails.length + existingThumbnails.length;
    if (totalThumbnails !== 3)
      return toast.error("Select exactly 3 thumbnails");

    try {
      setLoading(true);
      const form = new FormData();
      form.append("celebrityName", formData.celebrityName);
      form.append("photographer", formData.photographer);
      form.append("location", formData.location);

      // New images
      selectedImages.forEach((file) => form.append("images", file));

      // New thumbnails (file objects)
      selectedThumbnails.forEach((index) =>
        form.append("thumbnails", selectedImages[index]),
      );

      // Existing thumbnails (URLs) — backend ko batao kaunse rakhne hain
      existingThumbnails.forEach((url) =>
        form.append("existingThumbnails", url),
      );

      // Existing images jo user ne nahi hataye
      existingImages.forEach((url) => form.append("existingImages", url));

      if (selectedVideo) form.append("video", selectedVideo);

      if (editingId) {
        await axios.put(`${API_BASE_URL}/update/${editingId}`, form);
        toast.success("Shoot updated successfully");
      } else {
        await axios.post(`${API_BASE_URL}/upload`, form);
        toast.success("Shoot created successfully");
      }

      fetchShoots();
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving shoot");
    } finally {
      setLoading(false);
    }
  };

  // ── DELETE ────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this shoot?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      toast.success("Shoot deleted");
      fetchShoots();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ── EDIT ──────────────────────────────────────────────────────────────────
  const handleEdit = (shoot) => {
    setEditingId(shoot._id);
    setFormData({
      celebrityName: shoot.celebrityName,
      photographer: shoot.photographer,
      location: shoot.location,
    });
    setExistingImages(shoot.images || []);
    setExistingThumbnails(shoot.thumbnails || []); // ← existing thumbnails set
    setExistingVideo(shoot.video || null);
    setPreviewUrls([]);
    setSelectedImages([]);
    setSelectedThumbnails([]);
    setSelectedVideo(null);
    setVideoPreviewUrl(null);
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ celebrityName: "", photographer: "", location: "" });
    setSelectedImages([]);
    setPreviewUrls([]);
    setExistingImages([]);
    setSelectedThumbnails([]);
    setExistingThumbnails([]);
    setSelectedVideo(null);
    setVideoPreviewUrl(null);
    setExistingVideo(null);
  };

  const closeModal = () => {
    resetForm();
    setShowModal(false);
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="cs-container">
      <ToastContainer position="top-right" />

      <div className="cs-header">
        <div>
          <h1 className="cs-title">Celebrity Shoots</h1>
          <p className="cs-subtitle">Manage celebrity photography shoots</p>
        </div>
        <button
          className="cs-add-btn"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Upload size={18} /> New Shoot
        </button>
      </div>

      {loading && (
        <div className="cs-loading">
          <Loader className="cs-spin" />
        </div>
      )}

      {!loading && shoots.length > 0 && (
        <div className="cs-grid">
          {shoots.map((shoot) => (
            <div key={shoot._id} className="cs-card">
              <div className="cs-image-wrapper">
                <img
                  src={shoot.thumbnails?.[0] || shoot.images?.[0]}
                  className="cs-image"
                  alt=""
                />
                <div className="cs-image-count">
                  <ImageIcon size={14} /> {shoot.images.length}
                </div>
                {shoot.video && (
                  <div className="cs-video-badge">
                    <Video size={14} /> Video
                  </div>
                )}
              </div>
              <div className="cs-card-body">
                <h3 className="cs-card-title">{shoot.celebrityName}</h3>
                <p className="cs-meta">
                  <Camera size={18} /> {shoot.photographer}
                </p>
                <p className="cs-meta">
                  <MapPin size={18} /> {shoot.location}
                </p>
                <div className="cs-actions">
                  <button
                    className="cs-btn cs-btn-view"
                    onClick={() => setViewingShoot(shoot)}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="cs-btn cs-btn-edit"
                    onClick={() => handleEdit(shoot)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="cs-btn cs-btn-delete"
                    onClick={() => handleDelete(shoot._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="cs-modal-overlay">
          <div className="cs-modal">
            <div className="cs-modal-header">
              <h2>{editingId ? "Edit Shoot" : "Create Shoot"}</h2>
              <button className="cs-close-btn" onClick={closeModal}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="cs-form">
              {["celebrityName", "photographer", "location"].map((field) => (
                <div className="cs-form-group" key={field}>
                  <label>
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (s) => s.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    className="cs-input"
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                  />
                </div>
              ))}

              <div className="cs-form-group">
                <label>Upload Images (max 25)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </div>

              {/* ── EXISTING IMAGES — click to toggle thumbnail ── */}
              {existingImages.length > 0 && (
                <>
                  <p className="cs-hint">
                    Existing images — click to toggle thumbnail (
                    {existingThumbnails.length + selectedThumbnails.length}/3
                    selected)
                  </p>
                  <div className="cs-preview-grid">
                    {existingImages.map((img, index) => {
                      const isThumb = existingThumbnails.includes(img);
                      return (
                        <div
                          key={index}
                          className={`cs-preview-item ${isThumb ? "selected" : ""}`}
                          onClick={() => toggleExistingThumbnail(img)}
                        >
                          <img src={img} alt="" />
                          <button
                            type="button"
                            className="cs-remove-img"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeExistingImage(index);
                            }}
                          >
                            <X size={16} />
                          </button>
                          {isThumb && (
                            <div className="cs-check-icon">
                              <Check size={20} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* ── NEW IMAGES — click to toggle thumbnail ── */}
              {previewUrls.length > 0 && (
                <>
                  <p className="cs-hint">
                    New images — click to mark as thumbnail (
                    {existingThumbnails.length + selectedThumbnails.length}/3
                    selected)
                  </p>
                  <div className="cs-preview-grid">
                    {previewUrls.map((url, index) => (
                      <div
                        key={index}
                        className={`cs-preview-item ${selectedThumbnails.includes(index) ? "selected" : ""}`}
                        onClick={() => toggleNewThumbnail(index)}
                      >
                        <img src={url} alt="" />
                        <button
                          type="button"
                          className="cs-remove-img"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNewImage(index);
                          }}
                        >
                          <X size={16} />
                        </button>
                        {selectedThumbnails.includes(index) && (
                          <div className="cs-check-icon">
                            <Check size={20} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ── VIDEO ── */}
              <div className="cs-form-group">
                <label>
                  Upload Video <span className="cs-optional">(optional)</span>
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoSelect}
                />
              </div>

              {existingVideo && !videoPreviewUrl && (
                <div className="cs-video-preview">
                  <video
                    src={existingVideo}
                    controls
                    className="cs-video-player"
                  />
                  <button
                    type="button"
                    className="cs-remove-video"
                    onClick={removeVideo}
                  >
                    <X size={16} /> Remove Video
                  </button>
                </div>
              )}

              {videoPreviewUrl && (
                <div className="cs-video-preview">
                  <video
                    src={videoPreviewUrl}
                    controls
                    className="cs-video-player"
                  />
                  <button
                    type="button"
                    className="cs-remove-video"
                    onClick={removeVideo}
                  >
                    <X size={16} /> Remove Video
                  </button>
                </div>
              )}

              <div className="cs-form-actions">
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? <Loader className="cs-spin" /> : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── VIEW MODAL ── */}
      {viewingShoot && (
        <div className="cs-modal-overlay" onClick={() => setViewingShoot(null)}>
          <div className="cs-view-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="cs-close-btn"
              onClick={() => setViewingShoot(null)}
            >
              <X size={24} />
            </button>
            <h2>{viewingShoot.celebrityName}</h2>
            <p className="cs-meta">
              <Camera size={24} /> {viewingShoot.photographer}
            </p>
            <p className="cs-meta">
              <MapPin size={24} /> {viewingShoot.location}
            </p>

            {viewingShoot.video && (
              <div className="cs-view-video">
                <h4>
                  <Video size={18} /> Video
                </h4>
                <video
                  src={viewingShoot.video}
                  controls
                  className="cs-video-player"
                />
              </div>
            )}

            <div className="cs-gallery-grid">
              {viewingShoot.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt="" />
                  {viewingShoot.thumbnails?.includes(image) && (
                    <div className="cs-thumbnail-badge">Thumbnail</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CelebrityShootsManager;