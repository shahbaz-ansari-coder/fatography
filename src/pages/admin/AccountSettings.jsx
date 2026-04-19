import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Lock,
  Eye,
  EyeOff,
  Save,
  Loader,
  ShieldCheck,
  AlertTriangle,
  X,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "../../style/accountSettings.css";

const API_URL = "https://fatography-backend.vercel.app/api/admin/update-credentials";

export default function AccountSettings() {
  const [showWarning, setShowWarning] = useState(false);

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // check if redirected from forgot password
  useEffect(() => {
    const required = localStorage.getItem("new-pass");
    if (required === "true") {
      setShowWarning(true);
    }
  }, []);

  const closeWarning = () => {
    setShowWarning(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.newPassword.trim()) {
      return toast.error("Password is required");
    }

    if (form.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.put(API_URL, {
        newPassword: form.newPassword,
      });

      toast.success("Password updated successfully");

      localStorage.removeItem("new-pass");
      setShowWarning(false);

      setForm({
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="as-container">
      <ToastContainer position="top-right" />

      {/* WARNING POPUP */}

      {showWarning && (
        <div className="as-modal-overlay">
          <div className="as-modal-card">
            <div className="as-modal-header">
              <AlertTriangle size={40} color="#ff9800" />

              <button className="as-close-modal" onClick={closeWarning}>
                <X size={20} />
              </button>
            </div>

            <h3>Security Update Required</h3>

            <p>
              You logged in using the forgot password process. Please update
              your <b>password</b> before continuing to use the admin panel.
            </p>

            <button className="as-modal-btn" onClick={closeWarning}>
              Update Now
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}

      <div className="as-header">
        <ShieldCheck size={32} color="rgb(182,82,79)" />

        <div>
          <h1 className="as-title">Account Settings</h1>
          <p className="as-subtitle">Update your admin password</p>
        </div>
      </div>

      {/* FORM */}

      <div className="as-grid">
        <div className="as-card">
          <div className="as-card-header">
            <div className="as-icon-wrap">
              <Lock size={20} color="rgb(182,82,79)" />
            </div>

            <div>
              <h2 className="as-card-title">Update Password</h2>
              <p className="as-card-sub">Change your admin login password</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="as-form">
            {/* NEW PASSWORD */}

            <div className="as-form-group">
              <label>New Password</label>

              <div className="as-input-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  className="as-input"
                  placeholder="Minimum 6 characters"
                  value={form.newPassword}
                  onChange={(e) =>
                    setForm({ ...form, newPassword: e.target.value })
                  }
                />

                <button
                  type="button"
                  className="as-eye-btn"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}

            <div className="as-form-group">
              <label>Confirm Password</label>

              <div className="as-input-wrap">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="as-input"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                />

                <button
                  type="button"
                  className="as-eye-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="as-submit-btn" disabled={loading}>
              {loading ? (
                <Loader size={16} className="as-spin" />
              ) : (
                <Save size={16} />
              )}

              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
