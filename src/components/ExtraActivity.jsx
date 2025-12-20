import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./ExtraActivity.css"; // use standalone styles to avoid affecting Projects UI
import ParticleBackground from "./ParticleBackground";

function ExtraActivity({ onBack }) {
  const activities = [
    { title: "Best Speaker", img: "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766226384/best_speaker_an6l5w.jpg", desc: "I won the Best Speaker Award at Policython The Ultimate Debate at VVCE! Presented strong arguments as part of the ruling party and learned a lot about policy, governance, and public speaking. Honoured to receive the book “The India Way” by Dr. S. Jaishankar as a prize. Grateful for the experience and excited to grow further! ", link: "https://www.linkedin.com/posts/ryashu_thrilled-to-share-that-i-won-the-best-speaker-activity-7403636014898208768-l1h6?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFMrWvYB1ukNfb0ciqJYPC50TnD6-6SgmtE" },
    { title: "Codeforge 2025", img: "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766229115/codeforge_u4lyco.jpg", desc: "I’m excited to share that I participated in CODEFORGE 2025 on 26th November and successfully qualified through Round 1, Round 2, and Round 3, making it all the way to the Final Round – Top 10 teams! It was an incredible learning journey filled with innovation, teamwork, and problem-solving. Grateful for the opportunity and the experience! 🚀Looking forward to exploring more such challenges and growing further.", link: "https://www.linkedin.com/posts/ryashu_hackathon-innovation-activity-7403129785020776448-09NG?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFMrWvYB1ukNfb0ciqJYPC50TnD6-6SgmtE" },
    { title: "Hack-AI-Thon", img: "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766229470/hackaithon_tmn2cf.jpg", desc: "Thrilled to share that our team “Retry” made it to the final round (Top 15) out of 50 teams in the recent 30 hour Hack-AI-Thon! 🚀 Proud to have worked with my amazing teammates — Yashas MV, Yuvika A Jain, Yashaswini I V. Each of us contributed to building this project from scratch — from UI design and backend integration to AI automation and testing.", link: "https://www.linkedin.com/posts/ryashu_hackathon-ai-innovation-activity-7393197103579074561-ld1U?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFMrWvYB1ukNfb0ciqJYPC50TnD6-6SgmtE" },
    { title: "Industrial Visit", img: "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766229697/industryvisit_okr8tq.jpg", desc: "The Department of CSE, Vidyavardhaka College of Engineering organized an industrial visit to the Karnataka State Remote Sensing Application Center (KSRSAC), Bangalore on 3rd December 2025. A great opportunity to learn about GIS, satellite data analysis, and real-world applications of remote sensing.Truly an enriching experience! 🌍📡.", link: "https://www.linkedin.com/posts/ryashu_the-department-of-cse-vidyavardhaka-college-activity-7403318532337262592-P3GZ?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFMrWvYB1ukNfb0ciqJYPC50TnD6-6SgmtE" },
    { title: "Techtatva - 2025", img: "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766227371/techtatva_b0iwxc.jpg", desc: "Thrilled to be among the Top 10 teams at TechTatva, MIT Mysore for our project presentation. A great learning experience and proud of the teamwork!", link: "https://linkedin.com/in/ryashu" },
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
