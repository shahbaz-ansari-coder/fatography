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
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (!res.ok) navigate("/login");
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
    <div className="fatoadmin__layout">
      <Sidebar />
      <main className="fatoadmin__main">
        <Outlet />
      </main>

      <style>{`
        .fatoadmin__layout {
          display: flex;
          min-height: 100vh;
          background-color: #080808;
        }
        .fatoadmin__main {
          margin-left: 260px;
          width: 100%;
          min-height: 100vh;
        }
        @media (max-width: 768px) {
          .fatoadmin__main {
            margin-left: 0 !important;
            padding-top: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
