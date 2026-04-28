import React from "react";
import {
  LayoutDashboard,
  Image,
  Settings,
  LogOut,
  MessageSquare,
  Star,
  Camera,
  Sliders,
  UserCog,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import "../../style/adminSidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "Overview",
      icon: <LayoutDashboard size={20} />,
    },
    {
      path: "/admin/services",
      label: "Manage Services",
      icon: <Settings size={20} />,
    },
    {
      path: "/admin/new-post",
      label: "Add New Post",
      icon: <Image size={20} />,
    },
    {
      path: "/admin/testimonials",
      label: "Add Testimonials",
      icon: <MessageSquare size={20} />,
    },
    {
      path: "/admin/celebrity-shoots",
      label: "Celebrity Shoots",
      icon: <Camera size={20} />,
    },
    {
      path: "/admin/sliders",
      label: "Manage Sliders",
      icon: <Sliders size={20} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="ad-sidebar">
      <div className="ad-sidebar-header">
        <Link to={'/'}>
        <h2 className="ad-logo">
          FATOGRAPHY<span className="ad-dot">.</span>
        </h2>
        </Link>
      </div>

      <nav className="ad-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `ad-nav-item ${isActive ? "active" : ""}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="ad-sidebar-footer">
        <NavLink to="/admin/account-settings" className="ad-footer-item">
          <UserCog size={18} /> <span>Account Settings</span>
        </NavLink>

        <button className="ad-logout-btn" onClick={handleLogout}>
          <LogOut size={18} /> <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
