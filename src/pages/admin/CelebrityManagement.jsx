import React, { useState, useEffect } from "react";
import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

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
  User,
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
  const [selectedThumbnails, setSelectedThumbnails] = useState([]);

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

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);

    const totalImages =
      files.length + selectedImages.length + existingImages.length;

    if (totalImages > 7) {
      toast.error("Maximum 7 images allowed");
      return;
    }

    const newImages = [...selectedImages, ...files];

    setSelectedImages(newImages);

    const newUrls = files.map((file) => URL.createObjectURL(file));

    setPreviewUrls([...previewUrls, ...newUrls]);
  };

  const removeNewImage = (index) => {
    const updatedImages = [...selectedImages];
    const updatedPreviews = [...previewUrls];

    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setSelectedImages(updatedImages);
    setPreviewUrls(updatedPreviews);

    setSelectedThumbnails(selectedThumbnails.filter((i) => i !== index));
  };

  const removeExistingImage = (index) => {
    const updated = [...existingImages];

    updated.splice(index, 1);

    setExistingImages(updated);
  };

  const toggleThumbnail = (index) => {
    if (selectedThumbnails.includes(index)) {
      setSelectedThumbnails(selectedThumbnails.filter((i) => i !== index));
      return;
    }

    if (selectedThumbnails.length >= 3) {
      toast.error("Only 3 thumbnails allowed");
      return;
    }

    setSelectedThumbnails([...selectedThumbnails, index]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.celebrityName.trim()) {
      toast.error("Celebrity name required");
      return;
    }

    if (!formData.photographer.trim()) {
      toast.error("Photographer required");
      return;
    }

    if (!formData.location.trim()) {
      toast.error("Location required");
      return;
    }

    if (selectedImages.length === 0 && existingImages.length === 0) {
      toast.error("Upload images");
      return;
    }

    if (selectedThumbnails.length !== 3) {
      toast.error("Select exactly 3 thumbnails");
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();

      form.append("celebrityName", formData.celebrityName);
      form.append("photographer", formData.photographer);
      form.append("location", formData.location);

      selectedImages.forEach((file) => {
        form.append("images", file);
      });

      selectedThumbnails.forEach((index) => {
        form.append("thumbnails", selectedImages[index]);
      });

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

  const handleEdit = (shoot) => {
    setEditingId(shoot._id);

    setFormData({
      celebrityName: shoot.celebrityName,
      photographer: shoot.photographer,
      location: shoot.location,
    });

    setExistingImages(shoot.images || []);
    setPreviewUrls([]);
    setSelectedImages([]);
    setSelectedThumbnails([]);

    setShowModal(true);
  };

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      celebrityName: "",
      photographer: "",
      location: "",
    });

    setSelectedImages([]);
    setPreviewUrls([]);
    setExistingImages([]);
    setSelectedThumbnails([]);
  };

  const closeModal = () => {
    resetForm();
    setShowModal(false);
  };

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
          <Upload size={18} />
          New Shoot
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
                  <ImageIcon size={14} />

                  {shoot.images.length}
                </div>
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

      {/* MODAL */}

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
              <div className="cs-form-group">
                <label>Celebrity Name</label>

                <input
                  type="text"
                  className="cs-input"
                  value={formData.celebrityName}
                  onChange={(e) =>
                    setFormData({ ...formData, celebrityName: e.target.value })
                  }
                />
              </div>

              <div className="cs-form-group">
                <label>Photographer</label>

                <input
                  type="text"
                  className="cs-input"
                  value={formData.photographer}
                  onChange={(e) =>
                    setFormData({ ...formData, photographer: e.target.value })
                  }
                />
              </div>

              <div className="cs-form-group">
                <label>Location</label>

                <input
                  type="text"
                  className="cs-input"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>

              <div className="cs-form-group">
                <label>Upload Images (max 7)</label>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </div>

              {/* EXISTING IMAGES */}

              {existingImages.length > 0 && (
                <div className="cs-preview-grid">
                  {existingImages.map((img, index) => (
                    <div key={index} className="cs-preview-item">
                      <img src={img} alt="" />

                      <button
                        type="button"
                        className="cs-remove-img"
                        onClick={() => removeExistingImage(index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* NEW IMAGES */}

              {previewUrls.length > 0 && (
                <div className="cs-preview-grid">
                  {previewUrls.map((url, index) => (
                    <div
                      key={index}
                      className={`cs-preview-item ${
                        selectedThumbnails.includes(index) ? "selected" : ""
                      }`}
                      onClick={() => toggleThumbnail(index)}
                    >
                      <img src={url} alt="" />

                      <button
                        type="button"
                        className="cs-remove-img"
                        onClick={() => removeNewImage(index)}
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

      {/* VIEW MODAL */}

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

            <div className="cs-gallery-grid">
              {viewingShoot.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt="" />

                  {viewingShoot.thumbnails.includes(image) && (
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
