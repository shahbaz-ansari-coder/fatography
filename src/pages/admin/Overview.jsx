import React from "react";
import {
  LayoutDashboard,
  Layers,
  Image as ImageIcon,
  Star,
  Users,
  Camera,
  ArrowRight,
  PlusCircle,
  SlidersHorizontal,
  UploadCloud,
  MessageSquarePlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../style/adminOverview.css";

const DashboardOverview = () => {
  const navigate = useNavigate();

  // Sidebar.jsx ke exact paths ke mutabiq cards
  const navigationCards = [
    {
      title: "Manage Services",
      desc: "View & Edit Services",
      icon: <Layers />,
      path: "/admin/services",
      color: "#b6524f",
    },
    {
      title: "Testimonials",
      desc: "Client Reviews",
      icon: <Star />,
      path: "/admin/testimonials",
      color: "#f59e0b",
    },
    {
      title: "Celebrity Shoots",
      desc: "Premium Projects",
      icon: <Users />,
      path: "/admin/celebrity-shoots",
      color: "#8b5cf6",
    },
    {
      title: "Gallery Posts",
      desc: "Manage All Shoots",
      icon: <Camera />,
      path: "/admin/new-post",
      color: "#3b82f6",
    },
  ];

  const quickUploads = [
    {
      title: "Upload New Post",
      icon: <UploadCloud />,
      path: "/admin/new-post",
      color: "#3b82f6",
    },
    {
      title: "New Service",
      icon: <PlusCircle />,
      path: "/admin/services",
      color: "#b6524f",
    },
    {
      title: "Update Sliders",
      icon: <SlidersHorizontal />,
      path: "/admin/sliders",
      color: "#10b981",
    },
    {
      title: "Add Review",
      icon: <MessageSquarePlus />,
      path: "/admin/testimonials",
      color: "#f59e0b",
    },
  ];

  return (
    <div className="ov-container">
      <div className="ov-header">
        <h1 className="ov-title">Control Panel</h1>
        <p className="ov-subtitle">
          Quickly navigate through your portfolio management tools.
        </p>
      </div>

      {/* Main Stats/Navigation Grid: 4 in 1 row on PC */}
      <div className="ov-stats-grid">
        {navigationCards.map((card, i) => (
          <div key={i} className="ov-card" onClick={() => navigate(card.path)}>
            <div
              className="ov-card-icon"
              style={{ background: `${card.color}15`, color: card.color }}
            >
              {card.icon}
            </div>
            <div className="ov-card-info">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
            <ArrowRight className="ov-arrow" size={16} />
          </div>
        ))}
      </div>

      {/* Quick Uploads Section: Functional Cards */}
      <div className="ov-upload-section">
        <h2 className="ov-sec-title">Quick Actions</h2>
        <div className="ov-upload-grid">
          {quickUploads.map((item, i) => (
            <div
              key={i}
              className="ov-upload-box"
              onClick={() => navigate(item.path)}
            >
              <div className="ov-up-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
