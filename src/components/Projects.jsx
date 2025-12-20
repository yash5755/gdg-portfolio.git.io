import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Projects.css";
import ParticleBackground from "./ParticleBackground";

function Projects({ onBack }) {
  const projects = [
    {
      title: "EduSphere A College Management System",
      img: "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766232895/pro1_zczet2.png",
      desc: "College Management System powered by AI, designed to solve real-time challenges faced by students, faculty, and administrators. Features include AI-driven attendance tracking, smart timetable generation, automated grading, and personalized learning paths to enhance the educational experience.",
      link: "https://github.com/yash5755/college-management-system",
      skills: [
        "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766232116/flutter_pjsw9l.png",
        "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766232116/dart_hg6caz.jpg",
        "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766228320/supabase_m4pibe.jpg",
      ]
    },
    {
      title: "Raktkosh",
      img: "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766233220/blood2_xln2kc.png",
      desc: "Raktkosh is a life-saving Progressive Web App (PWA) designed to address critical blood shortage emergencies by creating a real-time ecosystem connecting blood donors, receivers, and blood banks.",
      link: "https://github.com/yash5755",
      skills: [
        "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766232116/flutter_pjsw9l.png",
        "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766232116/dart_hg6caz.jpg",
        "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766228320/supabase_m4pibe.jpg",
      ],
      className: "contain-image"
    },
    {
      title: "Campus Connect",
      img: "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766234207/Screenshot_2025-06-29_223035_iikxxm.png",
      desc: "Designed to solve real-time challenges faced by students, faculty, and administrators. Features include AI-driven attendance tracking, smart timetable generation, automated grading, and personalized learning paths to enhance the educational experience. ",
      link: "https://github.com/yash5755/vvceweb",
      skills: [
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/html_n9844z.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/css_gbkd0w.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/js_n0jchn.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/sql_cku96s.png",
      ]
    },
    {
      title: "Portfolio",
      img: "https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766234565/Screenshot_2025-12-20_181201_sy8yqf.png",
      desc: "Portfolio website built in the workshop conducted by GDG with OSL on 19th December 2025.",
      link: "https://github.com/yash5755",
      skills: [
         "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/html_n9844z.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/css_gbkd0w.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/js_n0jchn.png"
      ]
    },
  
  ];

  return (
    <div className="projects-page">
      <ParticleBackground variant="connect" colorTheme="gray" />
      {/* 🔹 Only Back Button (No Top Bar). Use callback to avoid URL change */}
      <button
        type="button"
        className="back-button"
        onClick={() => {
          if (onBack) onBack();
        }}
      >
        ← Back
      </button>

      {/* Header */}
      <div className="projects-header">
        <h2 className="projects-title">Projects</h2>
        <p className="projects-subtitle">
          Scroll down to explore — Projects that reflect my journey from idea to implementation.
        </p>
      </div>

      {/* Project Cards */}
      <div className="projects-container">
        {projects.map((project, idx) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { margin: "-35% 0px -35% 0px" });

          return (
            <motion.div
              ref={ref}
              key={idx}
              className={`project-card ${project.className || ''}`}
              initial={{ opacity: 0.5, scale: 0.92, rotateX: -18, y: 10 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, rotateX: 0, y: 0, z: 0 }
                  : { opacity: 0.3, scale: 0.92, rotateX: -20, y: 10, z: -120 }
              }
              transition={{ duration: 0.7, ease: [0.36, 0.66, 0.36, 1] }}

            >
              <div className="project-image">
                <img src={project.img} alt={project.title} />
              </div>

              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="skills-row">
                  {project.skills.map((s, i) => (
                    <img key={i} src={s} alt="skill" />
                  ))}
                </div>
                <a href={project.link} className="project-link" target="_blank" rel="noreferrer">
                  View Project →
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* More projects coming */}
      <div className="more-projects-dots">
        <span>•</span>
        <span>•</span>
        <span>•</span>
      </div>
    </div>
  );
}

export default Projects;
