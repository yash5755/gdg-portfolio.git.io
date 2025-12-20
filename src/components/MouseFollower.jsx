import React, { useEffect, useRef, useState } from "react";
import "./MouseFollower.css";

const MouseFollower = ({ size = 12, videoSrc = "https://res.cloudinary.com/dphe5xhwj/video/upload/v1765008356/abcd1_sa7vgu.mp4", disableHoverEffects = false }) => {
  const followerRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [hoveringSection, setHoveringSection] = useState(false);
  const [hoveringNav, setHoveringNav] = useState(false);
  const [hoveringBlackDot, setHoveringBlackDot] = useState(false);

  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 🟣 Hero section hover
    const heroElements = document.querySelectorAll(
      ".hero-text-content h1, .hero-text-content p,  .hero-image"
    );

    const handleHeroEnter = () => setHovering(true);
    const handleHeroLeave = () => setHovering(false);

    heroElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHeroEnter);
      el.addEventListener("mouseleave", handleHeroLeave);
    });

    // 🟢 Activities section hover
    const activitiesSection = document.querySelector(
      "[data-follower-color='activities']"
    );

    const handleSectionEnter = () => setHoveringSection(true);
    const handleSectionLeave = () => setHoveringSection(false);

    if (activitiesSection) {
      activitiesSection.addEventListener("mouseenter", handleSectionEnter);
      activitiesSection.addEventListener("mouseleave", handleSectionLeave);
    }

    // ⚫ Black Dot section hover
    const blackDotSection = document.querySelector(
      "[data-follower-color='black-dot']"
    );

    const handleBlackDotEnter = () => setHoveringBlackDot(true);
    const handleBlackDotLeave = () => setHoveringBlackDot(false);

    if (blackDotSection) {
      blackDotSection.addEventListener("mouseenter", handleBlackDotEnter);
      blackDotSection.addEventListener("mouseleave", handleBlackDotLeave);
    }

    // ⚪ Navbar links hover
    const navLinks = document.querySelectorAll("nav a, .navbar a, .nav-links");
    const handleNavEnter = (e) => {
      setHoveringNav(true);
      e.target.classList.add("nav-hovered"); // highlight nav text
    };
    const handleNavLeave = (e) => {
      setHoveringNav(false);
      e.target.classList.remove("nav-hovered");
    };

    navLinks.forEach((link) => {
      link.addEventListener("mouseenter", handleNavEnter);
      link.addEventListener("mouseleave", handleNavLeave);
    });

    // 🧭 Cursor position tracking
    const moveFollower = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    let frameId;
    const animate = () => {
      // Check scroll position to determine speed
      const scrollY = window.scrollY;
      const isInFirstSection = scrollY < 800; // First 800px

      // Dynamic speed: slow lag in first section, instant elsewhere
      const speed = isInFirstSection ? 0.08 : 1.0; // 0.08 = lag, 1.0 = instant

      followerPos.current.x += (pos.current.x - followerPos.current.x) * speed;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * speed;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x}px, ${followerPos.current.y}px) translate(-50%, -50%)`;

        // Check disableHoverEffects first
        if (disableHoverEffects) {
          followerRef.current.style.width = `${size}px`;
          followerRef.current.style.height = `${size}px`;
          followerRef.current.style.backgroundColor = "rgb(255,255,255)";
          followerRef.current.style.filter = "none";
          followerRef.current.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.8)"; // Add subtle glow for sparkle feel
          followerRef.current.style.backdropFilter = "none";
          followerRef.current.style.webkitBackdropFilter = "none";
          followerRef.current.style.zIndex = "9999";
        }
        // 🔵 Navbar: large pure white, no shadow, text on top
        else if (hoveringNav) {
          followerRef.current.style.width = "70px";
          followerRef.current.style.height = "70px";
          followerRef.current.style.backgroundColor = "rgb(255,255,255";
          followerRef.current.style.boxShadow = "none";
          followerRef.current.style.filter = "none";
          followerRef.current.style.backdropFilter = "none";
          followerRef.current.style.webkitBackdropFilter = "none";
          followerRef.current.style.zIndex = "100"; // behind text
        }

        // ⚫ Black Dot: small black dot
        else if (hoveringBlackDot) {
          followerRef.current.style.width = "12px";
          followerRef.current.style.height = "12px";
          followerRef.current.style.backgroundColor = "rgb(0, 0, 0)";
          followerRef.current.style.boxShadow = "none";
          followerRef.current.style.filter = "none";
          followerRef.current.style.backdropFilter = "none";
          followerRef.current.style.webkitBackdropFilter = "none";
          followerRef.current.style.zIndex = "9999";
        }

        // 🖤 Activities: grayscale transparent
        else if (hoveringSection) {
          followerRef.current.style.width = "120px";
          followerRef.current.style.height = "120px";
          followerRef.current.style.backgroundColor = "rgba(0,0,0,0.35)";
          followerRef.current.style.backdropFilter = "grayscale(100%)";
          followerRef.current.style.webkitBackdropFilter = "grayscale(100%)";
          followerRef.current.style.boxShadow = "none";
          followerRef.current.style.zIndex = "9999";
        }

        // 🎥 Hero: video effect
        else if (hovering) {
          followerRef.current.style.width = "140px";
          followerRef.current.style.height = "140px";
          followerRef.current.style.backgroundColor = "transparent";
          followerRef.current.style.filter = "none";
          followerRef.current.style.boxShadow = "none";
          followerRef.current.style.zIndex = "9999";
        }

        // ⚪ Default: small white dot
        else {
          followerRef.current.style.width = `${size}px`;
          followerRef.current.style.height = `${size}px`;
          followerRef.current.style.backgroundColor = "rgb(255,255,255)";
          followerRef.current.style.filter = "none";
          followerRef.current.style.boxShadow = "none";
          followerRef.current.style.backdropFilter = "none";
          followerRef.current.style.webkitBackdropFilter = "none";
          followerRef.current.style.zIndex = "9999";
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", moveFollower);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", moveFollower);
      heroElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHeroEnter);
        el.removeEventListener("mouseleave", handleHeroLeave);
      });
      if (activitiesSection) {
        activitiesSection.removeEventListener("mouseenter", handleSectionEnter);
        activitiesSection.removeEventListener("mouseleave", handleSectionLeave);
      }
      if (blackDotSection) {
        blackDotSection.removeEventListener("mouseenter", handleBlackDotEnter);
        blackDotSection.removeEventListener("mouseleave", handleBlackDotLeave);
      }
      navLinks.forEach((link) => {
        link.removeEventListener("mouseenter", handleNavEnter);
        link.removeEventListener("mouseleave", handleNavLeave);
      });
    };
  }, [size, disableHoverEffects]);

  return (
    <div
      ref={followerRef}
      className={`mouse-follower ${hovering ? "hovering" : ""}`}
      style={{ width: size, height: size }}
    >
      {hovering && !hoveringSection && !hoveringNav && !hoveringBlackDot && (
        <video src={videoSrc} autoPlay muted loop className="follower-video" />
      )}
    </div>
  );
};

export default MouseFollower;
