import { useEffect, useState } from "react";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  // body scroll lock
  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }
  }, [isNavOpen]);

  // sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderActive(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isHeaderActive ? "active" : ""}`} data-header>
      <div className="container">
        {/* Logo */}
        <a href="#" className="logo">
          <img src="/logo.png" width="40" height="40" alt="Robert home" />
        </a>

        {/* Mobile Menu Button */}
        <button
          className="nav-open-btn"
          aria-label="open menu"
          onClick={toggleNav}
        >
          <img src="/menu.svg" width="17" height="17" alt="menu icon" />
        </button>

        {/* Navbar */}
        <nav className={`navbar ${isNavOpen ? "active" : ""}`} data-navbar>
          <div className="navbar-top">
            <a href="#" className="logo">
              <img
                src="/logo.png"
                width="40"
                height="40"
                alt="Robert home"
                className="img"
              />
            </a>

            <button
              className="nav-close-btn"
              aria-label="close menu"
              onClick={toggleNav}
            >
              <span className="span one"></span>
              <span className="span two"></span>
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="navbar-list">
            <li className="navbar-item">
              <a href="#home" className="navbar-link" onClick={closeNav}>
                Home
              </a>
            </li>

            <li className="navbar-item">
              <a href="#gallery" className="navbar-link" onClick={closeNav}>
                Gallery
              </a>
            </li>

            <li className="navbar-item">
              <a href="#about" className="navbar-link" onClick={closeNav}>
                About
              </a>
            </li>

            <li className="navbar-item">
              <a href="#services" className="navbar-link" onClick={closeNav}>
                Services
              </a>
            </li>

            <li className="navbar-item">
              <a href="#portfolio" className="navbar-link" onClick={closeNav}>
                Portfolio
              </a>
            </li>

            <li className="navbar-item">
              <a href="#contact" className="navbar-link" onClick={closeNav}>
                Contact us
              </a>
            </li>
          </ul>

          {/* Studio Info */}
          <p className="navbar-title">Our Address:</p>

          <address className="navbar-text">
            Arjan Al Barsha South - Dubai - UAE
          </address>

          <p className="navbar-text">
            Urgent issue? call us at{" "}
            <a href="tel:8314927761" className="contact-link">
              +971 509396784
            </a>
          </p>
        </nav>

        {/* Overlay */}
        <div
          className={`overlay ${isNavOpen ? "active" : ""}`}
          data-overlay
          onClick={toggleNav}
        ></div>
      </div>
    </header>
  );
}

export default Header;
