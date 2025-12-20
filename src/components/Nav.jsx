import React, { useState, useEffect } from "react";
import "./Nav.css";

function Nav({ onSeeAllProjects }) {
  const [hide, setHide] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY < 600) {
            setHide(false);
          } else {
            setHide(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSeeAllProjects = () => {
    setMobileMenuOpen(false);
    if (onSeeAllProjects) {
      onSeeAllProjects();
    }
  };

  return (
    <>
      <nav className={`navbar ${hide ? "hide" : ""}`} data-dark="true">
        <div className="logo" id="magnet">My Portfolio</div>

        <ul className="nav-links desktop-nav">
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("about")}>About</li>
          <li onClick={() => scrollToSection("projects")}>Projects</li>
          <li onClick={() => scrollToSection("activities")}>Activities</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
        </ul>

        <button
          className={`hamburger ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <ul className="mobile-nav-links">
              <li onClick={() => scrollToSection("home")}>Home</li>
              <li onClick={() => scrollToSection("about")}>About</li>
              <li onClick={() => scrollToSection("projects")}>Projects</li>
              <li onClick={handleSeeAllProjects} className="see-all-projects-mobile">
                See All Projects
              </li>
              <li onClick={() => scrollToSection("activities")}>Activities</li>
              <li onClick={() => scrollToSection("contact")}>Contact</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;