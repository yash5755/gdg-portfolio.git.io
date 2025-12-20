import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Projects.css";
import ParticleBackground from "./ParticleBackground";

function Projects({ onBack }) {
  const projects = [
    {
      title: "Paisa+ A Finance & Management App",
      img: "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765196163/Screenshot_2025-12-08_at_1.03.38_PM_x7j0od.png",
      desc: "An all-in-one AI-powered platform for personal finance management featuring expense tracking, budget planning, investment insights, and automated financial reporting with smart analytics.",
      link: "https://github.com/yash5755/-Paisa-A-Finance-Investment-Management-App",
      skills: [
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/react_ijir1p.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/nodejs_y6ptov.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/html_n9844z.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/css_gbkd0w.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/js_n0jchn.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/Tailwind_b15bq7.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/sql_cku96s.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/figma_zy4ykk.png"
      ]
    },
    {
      title: "Krishi Mitra",
      img: "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765008355/krishi_mitra_cuaclb.webp",
      desc: "Comprehensive agricultural platform connecting farmers with markets, equipment rentals, expert advice, and logistics. Features AI-powered crop recommendations and real-time marketplace for buying and selling produce.",
      link: "",
      skills: [
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/react_ijir1p.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/html_n9844z.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/css_gbkd0w.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/js_n0jchn.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/nodejs_y6ptov.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/mongodb_o5gxo2.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/next_pw23l9.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/gemini_x6sreu.jpg"
      ],
      className: "contain-image"
    },
    {
      title: "Genora One",
      img: "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765204073/Screenshot_2025-12-08_at_7.10.49_PM_pumgul.png",
      desc: "Multi-functional AI platform combining image generation, content creation, email parsing, video script writing, and caption generation into one seamless experience. Designed for efficiency, it helps creators produce high-quality content faster by centralizing all essential AI tools.",
      link: "https://github.com/yash5755/Genora-One-A-Saas-Platform",
      skills: [
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/react_ijir1p.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/nodejs_y6ptov.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/html_n9844z.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/css_gbkd0w.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/js_n0jchn.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/Tailwind_b15bq7.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/sql_cku96s.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/figma_zy4ykk.png"
      ]
    },
    {
      title: "Earthquake In-depth Analysis",
      img: "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765198075/Screenshot_2025-12-08_at_6.17.23_PM_dpnms3.png",
      desc: "Comprehensive data analysis and visualization of earthquake patterns from 1900-2014.",
      link: "https://public.tableau.com/views/EarthquakeIndepthAnalysis/EarthquakeFrom1900-2014",
      skills: [
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/tableau_mhdzxn.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/sql_cku96s.png"
      ]
    },
    {
      title: "Pareto Based Optimization",
      img: "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765008350/pareto_y3grxx.webp",
      desc: "Smart agricultural tool that recommends optimal fertilizer usage and water consumption based on your land size and local weather conditions. Uses advanced algorithms to balance multiple farming objectives and maximize crop yield while minimizing resource waste.",
      link: "https://pareto-based-analysis-app.streamlit.app/",
      skills: [
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/react_ijir1p.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/js_n0jchn.png",
        "https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/python_nfqcqe.png"
      ],
      className: "pareto-card"
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
