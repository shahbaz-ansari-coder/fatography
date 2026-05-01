import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "../../style/adminLogin.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://fatography-backend.vercel.app/api/admin/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="al-page-wrapper">
      <ToastContainer />

      <div className="al-container">
        <div className="al-card">
          <div className="al-header">
            <h2 className="al-logo">
              FATOGRAPHY<span className="al-dot">.</span>
            </h2>
            <p className="al-subtitle">Admin Portal</p>
          </div>

          <form onSubmit={handleLogin} className="al-form">
            <div className="al-input-group">
              <label className="al-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="al-input"
                required
              />
            </div>

            <div className="al-input-group">
              <label className="al-label">Password</label>

              <div className="al-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="al-input al-input-pass"
                  required
                />

                <button
                  type="button"
                  className="al-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#888" />
                  ) : (
                    <Eye size={18} color="#888" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="al-submit-btn">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
