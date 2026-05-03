import { ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isVideoOpenMobile, setIsVideoOpenMobile] = useState(false);

  const location = useLocation();

  const toggleNav = () => setIsNavOpen((prev) => !prev);
  const closeNav = () => setIsNavOpen(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", isNavOpen);
  }, [isNavOpen]);

  useEffect(() => {
    const handleScroll = () => setIsHeaderActive(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeNav();
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about-us", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/videography", label: "Videography" },
    { to: "/celebrity-shoots", label: "Celebrity Shoots" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact-us", label: "Contact Us" },
  ];

  const videographySubLinks = [
    { to: "/videography/pre-wedding", label: "Pre Wedding" },
    { to: "/videography/wedding-events", label: "Wedding Events" },
    { to: "/videography/food-videography", label: "Food Videography" },
  ];

  const isVideographyActive = videographySubLinks.some(
    (sub) => location.pathname === sub.to,
  );

  return (
    <header className={`header ${isHeaderActive ? "active" : ""}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="/text_logo.png" width="130" alt="Fatography Logo" />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="navbar-desktop">
          <ul className="navbar-desktop-list">
            {navLinks.map(({ to, label }) =>
              label === "Videography" ? (
                <li key={to} className="ftg-dd-desktop">
                  <div
                    className={`ftg-dd-trigger ${isVideographyActive ? "active" : ""}`}
                  >
                    <span className="link-text">{label}</span>
                    <span className="ftg-arrow">
                      <ChevronDown size={14} />
                    </span>
                    <span className="link-underline" />
                  </div>

                  <ul className="ftg-dd-menu">
                    {videographySubLinks.map((sub) => (
                      <li key={sub.to}>
                        <Link
                          to={sub.to}
                          className={
                            location.pathname === sub.to ? "active" : ""
                          }
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={to}>
                  <Link
                    to={to}
                    className={`desktop-link ${location.pathname === to ? "active" : ""}`}
                  >
                    <span className="link-text">{label}</span>
                    <span className="link-underline" />
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="nav-open-btn"
          onClick={toggleNav}
          aria-label="Open menu"
        >
          <span className={`hamburger ${isNavOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* ================= MOBILE NAV ================= */}
        <nav className={`navbar-mobile ${isNavOpen ? "active" : ""}`}>
          <div className="navbar-top">
            <Link to="/" className="logo" onClick={closeNav}>
              <img src="/text_logo.png" width="130" alt="logo" />
            </Link>
            <button
              className="nav-close-btn"
              onClick={closeNav}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <ul className="navbar-mobile-list">
            {navLinks.map(({ to, label }) =>
              label === "Videography" ? (
                <li key={to} className="ftg-dd-mobile">
                  <button
                    className={`ftg-dd-mobile-btn ${isVideographyActive ? "active" : ""}`}
                    onClick={() => setIsVideoOpenMobile(!isVideoOpenMobile)}
                  >
                    <span>Videography</span>
                    <span
                      className={`ftg-arrow ${isVideoOpenMobile ? "open" : ""}`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  <ul
                    className={`ftg-dd-mobile-menu ${isVideoOpenMobile ? "open" : ""}`}
                  >
                    {videographySubLinks.map((sub) => (
                      <li key={sub.to}>
                        <Link
                          to={sub.to}
                          className={`mobile-sub-link ${location.pathname === sub.to ? "active" : ""}`}
                          onClick={closeNav}
                        >
                          <span className="dot" />
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={to}>
                  <Link
                    to={to}
                    className={`mobile-link ${location.pathname === to ? "active" : ""}`}
                    onClick={closeNav}
                  >
                    <span className="mobile-link-indicator" />
                    <span className="mobile-link-text">{label}</span>
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="navbar-footer">
            <address>Arjan Al Barsha South – Dubai – UAE</address>
            <a href="tel:+971509396784">+971 509 396 784</a>
          </div>
        </nav>

        {/* Overlay */}
        <div
          className={`overlay ${isNavOpen ? "active" : ""}`}
          onClick={closeNav}
        />
      </div>
    </header>
  );
}

export default Header;
