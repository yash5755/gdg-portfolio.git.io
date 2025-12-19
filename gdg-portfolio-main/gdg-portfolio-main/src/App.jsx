import React from 'react';
import './App.css';

function App() {
  return (
    <div className="portfolio-container">
      {/* Hero Section */}
      <section id="hero" className="section hero">
        <h1>Yashwanth R</h1>
        <h2>CSE Student</h2>
        <p className="career-goal">
          Description about yourself.
        </p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills">
        <h3>Skills</h3>
        <div className="skills-grid">
          <div className="skill-category">
            <h4>Languages</h4>
            <ul>
              <li>JavaScript (ES6+)</li>
              <li>Python</li>
              <li>Java</li>
              <li>C++</li>
            </ul>
          </div>
          <div className="skill-category">
            <h4>Frameworks & Libraries</h4>
            <ul>
              <li>React.js</li>
              <li>Node.js</li>
              <li>Express</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div className="skill-category">
            <h4>Tools</h4>
            <ul>
              <li>Git & GitHub</li>
              <li>VS Code</li>
              <li>Postman</li>
              <li>MongoDB</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="section projects">
        <h3>Projects</h3>
        <div className="projects-grid">
          <div className="project-card">
            <h4>Project Name 1</h4>
            <p>Brief description of the project, technologies used, and your role.</p>
            <div className="project-links">
              <a href="#" target="_blank">Demo</a>
              <a href="#" target="_blank">GitHub</a>
            </div>
          </div>
          <div className="project-card">
            <h4>Project Name 2</h4>
            <p>Brief description of the project, technologies used, and your role.</p>
            <div className="project-links">
              <a href="#" target="_blank">Demo</a>
              <a href="#" target="_blank">GitHub</a>
            </div>
          </div>
          <div className="project-card">
            <h4>Project Name 3</h4>
            <p>Brief description of the project, technologies used, and your role.</p>
            <div className="project-links">
              <a href="#" target="_blank">Demo</a>
              <a href="#" target="_blank">GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Hackathons */}
      <section id="experience" className="section experience">
        <h3>Experience & Hackathons</h3>
        <div className="experience-item">
          <h4>Hackathon Name / Internship Role</h4>
          <span className="date">Month Year - Month Year</span>
          <p>Description of what you built, achieved, or learned.</p>
        </div>
        <div className="experience-item">
          <h4>Club Activity / Competition</h4>
          <span className="date">Month Year - Month Year</span>
          <p>Description of your contribution and impact.</p>
        </div>
      </section>

      {/* Contact & Links */}
      <section id="contact" className="section contact">
        <h3>Contact & Links</h3>
        <div className="contact-links">
          <a href="mailto:your.email@example.com">Email</a>
          <a href="https://github.com/yourusername" target="_blank">GitHub</a>
          <a href="https://linkedin.com/in/yourusername" target="_blank">LinkedIn</a>
          <a href="/resume.pdf" target="_blank">Resume</a>
        </div>
      </section>
    </div>
  );
}

export default App
