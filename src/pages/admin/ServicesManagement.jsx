import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Save,
  Loader,
  Camera,
  Layers,
  Edit3,
  ArrowLeft,
  UploadCloud,
  RefreshCw,
  X,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "../../style/servicesManagement.css";

const API_BASE = "https://fatography-backend.vercel.app/api/services";

const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [view, setView] = useState("list"); // list, create, edit, manage-shoots
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState("");

  // Thumbnails States
  const [thumbnails, setThumbnails] = useState([]);
  const [thumbPreviews, setThumbPreviews] = useState([]);

  const [currentService, setCurrentService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setServices(res.data.data);
    } catch {
      toast.error("Failed to load services");
    }
    setLoading(false);
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleThumbnailsChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.warn("You can only upload up to 3 thumbnails");
      return;
    }
    setThumbnails(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setThumbPreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    if (banner) data.append("banner", banner);

    // Append thumbnails
    thumbnails.forEach((file) => {
      data.append("thumbnails", file);
    });

    try {
      if (view === "create") {
        await axios.post(`${API_BASE}/create`, data);
        toast.success("Service created!");
      } else {
        await axios.put(`${API_BASE}/${currentService._id}`, data);
        toast.success("Service updated!");
      }
      setView("list");
      fetchServices();
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (
      !window.confirm("Are you sure? This will delete all shoots and images!")
    )
      return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      toast.success("Service deleted");
      fetchServices();
    } catch {
      toast.error("Delete failed");
    }
  };

  // --- Shoot Management Functions ---
  const refreshActiveService = async (id) => {
    const res = await axios.get(`${API_BASE}/${id}`);
    setCurrentService(res.data.data);
  };

  const handleCreateNewShoot = async (files) => {
    setActionLoading(true);
    const data = new FormData();
    Array.from(files).forEach((f) => data.append("images", f));
    try {
      await axios.post(`${API_BASE}/${currentService._id}/shoot`, data);
      toast.success("New shoot created!");
      refreshActiveService(currentService._id);
    } catch {
      toast.error("Failed to create shoot");
    }
    setActionLoading(false);
  };

  const handleAddImagesToShoot = async (shootId, files) => {
    setActionLoading(true);
    const data = new FormData();
    Array.from(files).forEach((f) => data.append("images", f));
    try {
      await axios.post(
        `${API_BASE}/${currentService._id}/shoot/${shootId}/images`,
        data,
      );
      toast.success("Images added!");
      refreshActiveService(currentService._id);
    } catch {
      toast.error("Upload failed");
    }
    setActionLoading(false);
  };

  const handleDeleteImage = async (shootId, imageId) => {
    try {
      await axios.delete(
        `${API_BASE}/${currentService._id}/shoot/${shootId}/image/${imageId}`,
      );
      toast.success("Image removed");
      refreshActiveService(currentService._id);
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleReplaceImage = async (shootId, imageId, file) => {
    setActionLoading(true);
    const data = new FormData();
    data.append("image", file);
    try {
      await axios.put(
        `${API_BASE}/${currentService._id}/shoot/${shootId}/image/${imageId}`,
        data,
      );
      toast.success("Image replaced!");
      refreshActiveService(currentService._id);
    } catch {
      toast.error("Replace failed");
    }
    setActionLoading(false);
  };

  const handleDeleteShoot = async (shootId) => {
    if (!window.confirm("Delete this entire shoot?")) return;
    try {
      await axios.delete(`${API_BASE}/${currentService._id}/shoot/${shootId}`);
      toast.success("Shoot deleted");
      refreshActiveService(currentService._id);
    } catch {
      toast.error("Failed to delete shoot");
    }
  };

  return (
    <div className="adm-container">
      <ToastContainer theme="dark" />

      <div className="adm-header">
        <div>
          <h1 className="adm-title">
            {view === "manage-shoots"
              ? "Manage Shoots Gallery"
              : "Services Management"}
          </h1>
          <p className="adm-subtitle">
            {view === "manage-shoots"
              ? `Editing shoots for: ${currentService?.title}`
              : "Create and organize your business services"}
          </p>
        </div>
        <div className="adm-header-actions">
          {view === "list" ? (
            <button
              className="adm-btn-primary"
              onClick={() => {
                setView("create");
                setBannerPreview("");
                setThumbPreviews([]);
                setThumbnails([]);
                setFormData({ title: "", description: "" });
              }}
            >
              <Plus size={18} /> Create Service
            </button>
          ) : (
            <button
              className="adm-btn-outline"
              onClick={() => {
                setView("list");
                fetchServices();
              }}
            >
              <ArrowLeft size={18} /> Back to List
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="adm-loader-wrap">
          <Loader className="adm-spin" size={40} />
        </div>
      ) : view === "list" ? (
        <div className="adm-grid">
          {services.map((svc) => (
            <div key={svc._id} className="adm-card">
              <div className="adm-card-banner">
                <img src={svc.banner?.url} alt={svc.title} />
                <div className="adm-card-badge">
                  <Layers size={12} /> {svc.shoots?.length || 0} Shoots
                </div>
              </div>
              <div className="adm-card-content">
                <h3>{svc.title}</h3>
                <p>{svc.description.substring(0, 80)}...</p>
                <div className="adm-card-footer">
                  <button
                    className="adm-btn-sm"
                    onClick={() => {
                      setCurrentService(svc);
                      setView("manage-shoots");
                    }}
                  >
                    <Camera size={14} /> Manage Shoots
                  </button>
                  <div className="adm-card-btns">
                    <button
                      className="adm-icon-btn edit"
                      onClick={() => {
                        setCurrentService(svc);
                        setFormData(svc);
                        setBannerPreview(svc.banner?.url);
                        setThumbPreviews(
                          svc.thumbnails?.map((t) => t.url) || [],
                        );
                        setView("edit");
                      }}
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      className="adm-icon-btn del"
                      onClick={() => handleDeleteService(svc._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : view === "manage-shoots" ? (
        <div className="adm-shoots-container">
          <div className="adm-shoot-top-bar">
            <label className="adm-btn-primary">
              <Plus size={18} /> Add New Shoot
              <input
                type="file"
                multiple
                hidden
                onChange={(e) => handleCreateNewShoot(e.target.files)}
              />
            </label>
            {actionLoading && (
              <div className="adm-status-mini">
                <RefreshCw size={14} className="adm-spin" /> Processing...
              </div>
            )}
          </div>
          <div className="adm-shoots-list">
            {currentService?.shoots?.map((shoot, sIdx) => (
              <div key={shoot._id} className="adm-shoot-block">
                <div className="adm-shoot-header">
                  <h4>
                    Shoot #{sIdx + 1}{" "}
                    <span>({shoot.images.length} images)</span>
                  </h4>
                  <div className="adm-shoot-actions">
                    <label className="adm-btn-sm ghost">
                      <UploadCloud size={14} /> Add Images
                      <input
                        type="file"
                        multiple
                        hidden
                        onChange={(e) =>
                          handleAddImagesToShoot(shoot._id, e.target.files)
                        }
                      />
                    </label>
                    <button
                      className="adm-icon-btn del"
                      onClick={() => handleDeleteShoot(shoot._id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="adm-shoot-grid">
                  {shoot.images.map((img) => (
                    <div key={img._id} className="adm-shoot-item">
                      <img src={img.url} alt="shoot" />
                      <div className="adm-item-overlay">
                        <label className="adm-overlay-btn">
                          <RefreshCw size={14} />
                          <input
                            type="file"
                            hidden
                            onChange={(e) =>
                              handleReplaceImage(
                                shoot._id,
                                img._id,
                                e.target.files[0],
                              )
                            }
                          />
                        </label>
                        <button
                          className="adm-overlay-btn del"
                          onClick={() => handleDeleteImage(shoot._id, img._id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="adm-form-wrapper">
          <form onSubmit={handleSubmit} className="adm-main-form">
            <div className="adm-form-grid">
              <div className="adm-upload-col">
                <label className="adm-banner-label">Service Banner</label>
                <div
                  className="adm-banner-preview"
                  onClick={() => document.getElementById("svc-file").click()}
                >
                  {bannerPreview ? (
                    <img src={bannerPreview} alt="Preview" />
                  ) : (
                    <div className="adm-up-box">
                      <ImageIcon size={40} />
                      <p>Select Banner</p>
                    </div>
                  )}
                  <input
                    id="svc-file"
                    type="file"
                    hidden
                    onChange={handleBannerChange}
                  />
                </div>
              </div>
              <div className="adm-inputs-col">
                <div className="adm-input-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                {/* Thumbnails Section */}
                <div className="adm-input-group">
                  <label>Service Thumbnails (Max 3)</label>
                  <div className="adm-thumb-upload-wrapper">
                    <label
                      className="adm-btn-sm ghost"
                      style={{ cursor: "pointer", marginBottom: "10px" }}
                    >
                      <UploadCloud size={14} /> Choose Thumbnails
                      <input
                        type="file"
                        multiple
                        hidden
                        onChange={handleThumbnailsChange}
                        accept="image/*"
                      />
                    </label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {thumbPreviews.map((url, i) => (
                        <div key={i} className="adm-mini-preview">
                          <img
                            src={url}
                            alt="thumb"
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "4px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="adm-input-group">
              <label>Description</label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
            <div className="adm-form-actions">
              <button
                type="button"
                className="adm-btn-outline"
                onClick={() => setView("list")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="adm-btn-submit"
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <Loader className="adm-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
                {actionLoading ? "Saving..." : "Save Service"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ServicesManagement;
