import { ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);

  // ============ MOBILE: accordion state ============
  const [isVideoOpenMobile, setIsVideoOpenMobile] = useState(false);

  // ============ DESKTOP: hover dropdown states ============
  const [isVideoOpenDesktop, setIsVideoOpenDesktop] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

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
    setIsVideoOpenMobile(false);
  }, [location.pathname]);

  // ============ Videography sub-links (shared: desktop dropdown + mobile accordion) ============
  const videographySubLinks = [
    { to: "/pre-wedding-videography", label: "Pre Wedding Videography" },
    { to: "/wedding-events-videography", label: "Wedding Events Videography" },
    { to: "/digital-video-commercials", label: "Digital Video Commercials" },
  ];

  const isVideographyActive = videographySubLinks.some(
    (sub) => location.pathname === sub.to,
  );

  // ============ More sub-links ============
  const moreLinks = [
    { to: "/testimonials", label: "Testimonials" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contact-us", label: "Contact Us" },
  ];

  const isMoreActive = moreLinks.some((link) => location.pathname === link.to);

  // ============ DESKTOP: primary visible links ============
  const primaryLinks = [
    { to: "/", label: "Home" },
    { to: "/about-us", label: "About" },
    { to: "/our-services", label: "Services" },
    { to: "/celebrity-shoots", label: "Celebrity Shoots" },
  ];

  // ============ MOBILE: nav links ============
  const mobileNavLinks = [
    { to: "/", label: "Home" },
    { to: "/about-us", label: "About" },
    { to: "/our-services", label: "Services" },
    { to: "/celebrity-shoots", label: "Celebrity Shoots" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contact-us", label: "Contact Us" },
  ];

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
            {primaryLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`desktop-link ${location.pathname === to ? "active" : ""}`}
                >
                  <span className="link-text">{label}</span>
                  <span className="link-underline" />
                </Link>
              </li>
            ))}

            {/* ============ VIDEOGRAPHY DROPDOWN (Desktop, hover — same as More) ============ */}
            <li className="ftg-more-dd">
              <div
                className={`ftg-more-trigger ${isVideographyActive ? "active" : ""}`}
                onMouseEnter={() => setIsVideoOpenDesktop(true)}
                onMouseLeave={() => setIsVideoOpenDesktop(false)}
              >
                <span className="link-text">Videography</span>
                <span
                  className={`ftg-more-arrow ${isVideoOpenDesktop ? "open" : ""}`}
                >
                  <ChevronDown size={14} />
                </span>
                <span className="link-underline" />

                <ul
                  className={`ftg-more-menu ${isVideoOpenDesktop ? "open" : ""}`}
                >
                  {videographySubLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className={
                          location.pathname === link.to ? "active" : ""
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* ============ MORE DROPDOWN (Desktop, hover) ============ */}
            <li className="ftg-more-dd">
              <div
                className={`ftg-more-trigger ${isMoreActive ? "active" : ""}`}
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                <span className="link-text">More</span>
                <span className={`ftg-more-arrow ${isMoreOpen ? "open" : ""}`}>
                  <ChevronDown size={14} />
                </span>
                <span className="link-underline" />

                <ul className={`ftg-more-menu ${isMoreOpen ? "open" : ""}`}>
                  {moreLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className={
                          location.pathname === link.to ? "active" : ""
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
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
            {mobileNavLinks.slice(0, 4).map(({ to, label }) => (
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
            ))}

            {/* ============ VIDEOGRAPHY (Mobile accordion) ============ */}
            <li className="ftg-dd-mobile">
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

            {mobileNavLinks.slice(4).map(({ to, label }) => (
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
            ))}
          </ul>

          <div className="navbar-footer">
            <address>Fatography - Pakistan & Dubai</address>
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
