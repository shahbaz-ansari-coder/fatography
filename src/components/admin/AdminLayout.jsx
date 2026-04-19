import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#080808",
      }}
    >
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div style={{ marginLeft: "260px", width: "100%", minHeight: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
