import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./ExtraActivity.css"; // use standalone styles to avoid affecting Projects UI
import ParticleBackground from "./ParticleBackground";

function ExtraActivity({ onBack }) {
  const activities = [
    { title: "Vice President", img: "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765008353/vice_bypdob.jpg", desc: "Appointed as Vice-President of the I2IC-TPO Student Council (2024-25), leading 140+ council members and successfully organizing major initiatives including alumni meets (Saturday Clubs), a 30-hour mega hybrid hackathon (Nirmaan), multiple department-level hackathons, guidance sessions, and more.", link: "https://www.instagram.com/i2ioc.tpo.vit?igsh=MXU2a3N6b2lwb212OA==" },
    { title: "Finance & Sponsorship Secretary", img: "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765105228/finance_goacsd.jpg", desc: "Served as Finance & Sponsorship In-charge for Gandharva-2025, the college annual fest. Successfully partnered with multiple renowned brands to secure event funding. Handled all aspects of financial management including sponsorship coordination, budget distribution, and comprehensive financial documentation.", link: "https://www.instagram.com/student_council_viit?igsh=dHNncWp2OG5wYmt6" },
    { title: "Award Recognition", img: "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765008351/award_rx9iut.jpg", desc: "Awarded by the National Institute of Event Management (NIEM) as the “Event Manager of the Year (EMY)” for 2024–2025 for successfully managing multiple events across My institute level, and received the trophy from college faculty in recognition of my contributions.", link: "https://linkedin.com/in/ryashu" },
    { title: "Industry Submit", img: "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765008352/hyatt_lvuvvi.jpg", desc: "Participated in the Indo-French Chamber’s Regional Industry Summit held at Hyatt Pune, learned from various industry leaders, and actively applied the insights gained to real-world scenarios.", link: "https://linkedin.com/in/ryashu" },
    { title: "Techathon-2025", img: "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765008353/techathon_oihr9v.jpg", desc: "Participated and competed till the tie-breaker round in Techathon 2.0, a national-level 24-hour hackathon, where we competed with students from across the country and significantly enhanced my technical abilities and time-management skills.", link: "https://linkedin.com/in/ryashu" },
  ];

  return (
    <div className="extra-page">
      <ParticleBackground variant="connect" colorTheme="white" />
      {/* Back Button */}
      <button
        type="button"
        className="extra-back-button"
        onClick={() => {
          if (onBack) onBack();
        }}
      >
        ← Back
      </button>

      {/* Header */}
      <div className="extra-header">
        <h2 className="extra-title">Extra Curricular<br />Activities</h2>
        <p className="extra-subtitle">
          A glimpse into roles, events, and contributions beyond academics.
        </p>
      </div>

      {/* Cards (same animations, with own class names) */}
      <div className="extra-container">
        {activities.map((item, idx) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { margin: "-35% 0px -35% 0px" });

          return (
            <motion.div
              ref={ref}
              key={idx}
              className="extra-card"
              initial={{ opacity: 0.5, scale: 0.92, rotateX: -18, y: 10 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1.1, rotateX: 0, y: 0, z: 0 }
                  : { opacity: 0.3, scale: 0.92, rotateX: -20, y: 10, z: -120 }
              }
              transition={{ duration: 0.7, ease: [0.36, 0.66, 0.36, 1] }}
            >
              <div className="extra-image">
                <img src={item.img} alt={item.title} />
              </div>

              <div className="extra-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                {/* No skills row on this page */}
                {item.link && (
                  <a href={item.link} className="extra-link" target="_blank" rel="noreferrer">
                    View Details →
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* More activities coming */}
      <div className="more-activities-dots">
        <span>•</span>
        <span>•</span>
        <span>•</span>
      </div>
    </div>
  );
}

export default ExtraActivity;
