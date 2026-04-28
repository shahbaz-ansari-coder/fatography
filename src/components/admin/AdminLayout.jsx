import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await fetch(
          "https://fatography-backend.vercel.app/api/admin/verify-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!res.ok) {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    verifyAdmin();
  }, [navigate]);

  if (loading) return null;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#080808",
      }}
    >
      <Sidebar />

      {/* Main content: shifts right on desktop, drops below topbar on mobile */}
      <div
        style={{
          marginLeft: "260px",
          width: "100%",
          minHeight: "100vh",
        }}
        className="ad-main-content"
      >
        <Outlet />
      </div>

      {/* Inline responsive override — keeps AdminLayout self-contained */}
      <style>{`
        @media (max-width: 768px) {
          .ad-main-content {
            margin-left: 0 !important;
            padding-top: 60px; /* height of mobile topbar */
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
