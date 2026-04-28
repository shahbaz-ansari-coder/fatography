import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Image,
  Settings,
  LogOut,
  MessageSquare,
  Camera,
  Sliders,
  UserCog,
  Menu,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "../../style/adminSidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
    <>
      {/* ── Mobile Top Bar ── */}
      <header className="fatoadmin__topbar">
        <Link to="/" className="fatoadmin__topbar-logo">
          FATOGRAPHY<span className="fatoadmin__dot">.</span>
        </Link>
        <button
          className="fatoadmin__hamburger"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* ── Overlay ── */}
      {isOpen && (
        <div
          className="fatoadmin__overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fatoadmin__sidebar ${isOpen ? "fatoadmin__sidebar--open" : ""}`}
      >
        <div className="fatoadmin__sidebar-header">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <h2 className="fatoadmin__logo">
              FATOGRAPHY<span className="fatoadmin__dot">.</span>
            </h2>
          </Link>
        </div>

        <nav className="fatoadmin__nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `fatoadmin__nav-item${isActive ? " fatoadmin__nav-item--active" : ""}`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="fatoadmin__footer">
          <NavLink
            to="/admin/account-settings"
            className="fatoadmin__footer-link"
          >
            <UserCog size={18} /> <span>Account Settings</span>
          </NavLink>
          <button className="fatoadmin__logout-btn" onClick={handleLogout}>
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
