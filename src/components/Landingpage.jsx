import React, { useState, useEffect } from "react";
import "./Landingpage.css";
import ParticleBackground from "./ParticleBackground";
import Particles from "./Particles";



function LandingPage({ onSeeAllProjects, onSeeMoreActivities }) {
  const [showAll, setShowAll] = useState(false);
  const [visitorCount, setVisitorCount] = useState(null);
  const [visitorError, setVisitorError] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Inject GoatCounter script once to record unique visits (bot-filtered).
  useEffect(() => {
    const existing = document.querySelector('script[data-goatcounter]');
    if (existing) return undefined;

    const script = document.createElement('script');
    script.setAttribute('data-goatcounter', 'https://yashoneth.goatcounter.com/count');
    script.async = true;
    script.src = 'https://gc.zgo.at/count.js';
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Pull the unique visitor count from GoatCounter for display in the footer.
  useEffect(() => {
    let cancelled = false;

    const parseCount = (data) => {
      if (!data || typeof data !== 'object') return null;
      return (
        data.count ||
        data.unique ||
        data.total ||
        data?.counts?.unique ||
        data?.totals?.unique ||
        null
      );
    };

    const fetchCount = async () => {
      try {
        // Fetch visitor count from GoatCounter public API (must enable in settings)
        const res = await fetch('https://yashoneth.goatcounter.com/counter//.json', {
          cache: 'no-store',
        });
        if (!res.ok) throw new Error('failed to load visitor count');
        const data = await res.json();
        // GoatCounter counter endpoint returns {count: number, count_unique: number}
        const count = data?.count_unique || data?.count || parseCount(data);
        if (!cancelled && count !== null) {
          setVisitorCount(Number(count));
          setVisitorError(false);
        }
      } catch (err) {
        if (!cancelled) {
          setVisitorError(true);
        }
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 60000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);


  useEffect(() => {
    const elements = document.querySelectorAll("#magnet, #gif0"); // multiple elements
    const strength = 15;
    const radius = 60;

    let ticking = false;
    let lastX = 0;
    let lastY = 0;

    const run = () => {
      ticking = false;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const offsetX = lastX - (rect.left + rect.width / 2);
        const offsetY = lastY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(offsetX ** 2 + offsetY ** 2);

        if (distance < radius) {
          const moveX = (offsetX / radius) * strength;
          const moveY = (offsetY / radius) * strength;
          el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          el.style.transform = `translate(0px, 0px)`;
        }
      });
    };

    const onMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(run);
      }
    };

    const handleMouseLeave = (e) => {
      e.currentTarget.style.transform = `translate(0px, 0px)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    elements.forEach((el) => el.addEventListener("mouseleave", handleMouseLeave, { passive: true }));

    return () => {
      window.removeEventListener("mousemove", onMove);
      elements.forEach((el) => el.removeEventListener("mouseleave", handleMouseLeave));
    };
  }, []);

  // Scroll direction detection for headline animation
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const headlineScroll = document.querySelector('.headline-scroll');
      if (!headlineScroll) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down - remove reverse class (scroll left)
        headlineScroll.classList.remove('reverse');
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - add reverse class (scroll right)
        headlineScroll.classList.add('reverse');
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);







  return (
    <>
      {/* 1) Hero with video (100vh) */}
      <section className="landing" id="home" data-dark="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766215971/Screenshot_2025-12-20_130222_ul1lnm.png"
          className="video-bg"
        >
          <source src="https://res.cloudinary.com/ddo4qy8bi/video/upload/v1766215065/309-135920073_small_sp8p0k.mp4" type="video/mp4" />
        </video>

        <div className="overlay">
          <h3>Hello I’m...</h3>
          <h1>Yashwanth R</h1>
          <div className="box">
            <p className="box-p">Computer Science | Student | Developer | Learning</p>
          </div>
        </div>
      </section>

      {/* 2) Full image section (100vh) */}
      <section className="hero-section" id="about" data-dark="true">
        <div className="hero-top"></div>
        <div className="hero-content-wrapper">
          <div className="image-cursor-wrapper">
            <div className="image-box">
              <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766215519/picc_voss3f.png" alt="Design Preview" className="image" />
              <div className="custom-cursor" />
            </div>
          </div>

          <div className="hero-text-content">
            <h1>
              Hi, I’m <span className="highlight-name">Yashwanth R</span> <br />
              A Computer Science <span className="highlight-role">Student</span>
            </h1>
            <p>
              Computer Science student learning different technologies, adapting with new AI and tools for efficient and faster processes.
              Still learning, still growing, breaking things—but already building projects that matter.
            </p>
            <button id="magnet" className="cta-button" onClick={scrollToContact}>Let's Connect</button>
          </div>
        </div>

        <div className="card-container">
          {/* Left Section */}
          <div className="card-left">
            <p>I’m learning new tech skills across different domains and always exploring something fresh. This portfolio is just a space to share what I build and how I think. I’m not perfect at everything yet, but I’m growing every day using different tools, tech, and AI to improve my work. I believe meaningful collaboration helps ideas grow when knowledge is shared.
              Let’s connect and have some good learning conversations along the way.</p>

          </div>

          <div className="midd"></div>

          {/* Right Section */}
          <div className="card-right">
            <p>Skills,
              I can say i'm quite good at</p>

            <div className="small-images-grid">
              {/* <div className="small-img">
                <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/react_ijir1p.png" alt="img1" />
              </div> */}
              <div className="small-img">
                <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/js_n0jchn.png" alt="img2" />
              </div>
              {/* <div className="small-img">
                <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/sql_cku96s.png" alt="img3" />
              </div> */}
              <div className="small-img">
                <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/nodejs_y6ptov.png" alt="img4" />
              </div>
              <div className="small-img">
                <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/html_n9844z.png" alt="img5" />
              </div>
              <div className="small-img">
                <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/css_gbkd0w.png" alt="img6" />
              </div>
              <div className="small-img">
                <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766228321/java_zrnojc.png" alt="img7" />
              </div>
              <div className="small-img">
                <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766228320/c_program_qphxzq.jpg" alt="img8" />
              </div>
              <div className="small-img">
                <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766228320/supabase_m4pibe.jpg" alt="img9" />
              </div>
              {/* <div className="small-img">
                <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/icons8-redux-96_aomziq.png" alt="img10" />
              </div>
              <div className="small-img">
                <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/next_pw23l9.png" alt="img11" />
              </div> */}
              {/* <div className="small-img">
                <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/fastapi_ghpk7j.webp" alt="img12" />
              </div> */}
              <div className="small-img skill-loading">
                <div className="spinner"></div>
              </div>
              <div className="small-img skill-loading">
                <div className="spinner"></div>
              </div>
            </div>


          </div>
        </div>


      </section>

      {/* 3) New video grid section (40vh) */}
      <section className="video-grid-section">
        <div className="video-grid">
          {/* <div className="social-icons">
      <a
        href="https://www.linkedin.com/in/your-profile"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-btn"
      >
        <i className="fab fa-linkedin-in"></i>
      </a>

      <a
        href="https://twitter.com/your-handle"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-btn"
      >
        <i className="fab fa-twitter"></i>
      </a>

      <a
        href="https://www.instagram.com/your-handle"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-btn"
      >
        <i className="fab fa-instagram"></i>
      </a>

      <a
        href="mailto:yourmail@gmail.com"
        className="icon-btn"
      >
        <i className="fas fa-envelope"></i>
      </a>
    </div> */}

          <div className="headline">
            <div className="headline-scroll">
              <span className="headline-text">hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span></span>
              <span className="headline-text">hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span> hey everyone <span className="arrow">→</span></span>
            </div>
          </div>
        </div>
      </section>



      {/* 4) Card section (230vh) */}
      <section className="card-section" id="projects" data-dark="true">
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
          <Particles
            particleColors={['#b7c8ecff', '#73aae8ff']}
            particleCount={1000}
            particleSpread={8}
            speed={0.05}
            particleBaseSize={70}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
        <ParticleBackground variant="connect" />

        <h2 className="card-heading">Projects</h2>
        <p className="card-para">
          Tried, broke, fixed, learned, retried,<br />finally doing something right.
        </p>

        <div className="card-grid ">
          <a href="https://github.com/yash5755/college-management-system" target="_blank" className="card">
            <div className="card-image">
              <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766232895/pro1_zczet2.png" alt="paisa+" />
            </div>
            <h3>EduSphere A College Management System </h3>
            <p>College Management System powered by AI, designed to solve real-time challenges faced by students, faculty, and administrators. Features include AI-driven attendance tracking, smart timetable generation, automated grading, and personalized learning paths to enhance the educational experience.</p>
            <div className="skill-icons">
              <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766232116/flutter_pjsw9l.png" alt="Flutter" />
              <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766232116/dart_hg6caz.jpg" alt="Dart" />
              <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766228320/supabase_m4pibe.jpg" alt="HTML" />
            </div>
          </a>

          <div className="card">
            <div className="card-image">
              <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766233220/blood2_xln2kc.png" alt="Krishi Mitra" />
            </div>
            <h3>Raktkosh</h3>
            <p>Raktkosh is a life-saving Progressive Web App (PWA) designed to address critical blood shortage emergencies by creating a real-time ecosystem connecting blood donors, receivers, and blood banks.</p>
            <div className="skill-icons">
              <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766232116/flutter_pjsw9l.png" alt="Flutter" />
              <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766232116/dart_hg6caz.jpg" alt="Dart" />
              <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766228320/supabase_m4pibe.jpg" alt="HTML" />
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/gemini_x6sreu.jpg" alt="Gemini AI" />
            </div>
          </div>

          <a href="https://github.com/yash5755/vvceweb" target="_blank" className="card">
            <div className="card-image">
              <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766234207/Screenshot_2025-06-29_223035_iikxxm.png" alt="Genora One" />
            </div>
            <h3>Campus Connect</h3>
            <p>Designed to solve real-time challenges faced by students, faculty, and administrators. Features include AI-driven attendance tracking, smart timetable generation, automated grading, and personalized learning paths to enhance the educational experience. </p>
            <div className="skill-icons">
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/html_n9844z.png" alt="HTML" />
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/css_gbkd0w.png" alt="CSS" />
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/js_n0jchn.png" alt="JavaScript" />
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/sql_cku96s.png" alt="SQL" />
            </div>
          </a>
        </div>
        <div className="mobile-see-all-container">
          <button
            className="cta-button-card"
            onClick={() => onSeeAllProjects && onSeeAllProjects()}
          >
            See All Projects
          </button>
        </div>
        <div className="desktop-see-all" style={{ display: "flex", justifyContent: "center", marginTop: "3rem", position: "relative", zIndex: 100 }}>
          <button
            id="seeall"
            className="cta-button-card"
            onClick={() => onSeeAllProjects && onSeeAllProjects()}
          >
            See All Projects
          </button>
        </div>
      </section>


      {/* Extra Curricular Activities */}
      <section className="featured-news" id="activities" data-follower-color="black-dot">
        <ParticleBackground variant="connect" colorTheme="gray" />
        <div className="hero-toop"></div>

        <div className="featured-header">
          <h2 className="featured-title">
            EXTRA CURRICULAR <br />ACTIVITIES..
          </h2>
          <p className="featured-subtitle">
            Explore the latest updates, insights, and projects shaping the future.
          </p>
        </div>

        {/* Only 2 visible cards */}
        <div className="news-container">
          <div className="news-item">
            <div className="news-img" style={{ backgroundImage: "url('https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766225811/best_award_jbht2x.jpg')" }}></div>
            <div className="news-content">
              <h2>Best Innovation Project Award</h2>
              <p className="news-text">
                Grateful to share that our team received the Best Innovation Award at the National Level Project Expo – V-Vision 2025, organized by Vidya Vikas Institute of Technology, Mysore, held on 11th December 2025.
                This achievement was possible with the collective efforts of my teammates Yuvika A Jain, YASHAS U, and Vibha .S. Competing among 50+ teams, it was a valuable opportunity to present our work and learn from the experience.

              </p>
              <a href="https://www.instagram.com/p/DSINxoQjt8Y/?igsh=MWI0dXJ0YXhzdg==" target="_blank" rel="noopener noreferrer" className="news-link">
                View Details →
              </a>
            </div>
          </div>

          <div className="news-item">
            <div className="news-img" style={{ backgroundImage: "url('https://res.cloudinary.com/ddo4qy8bi/image/upload/v1766226384/best_speaker_an6l5w.jpg')" }}></div>
            <div className="news-content">
              <h2>Best Speaker</h2>
              <p className="news-text">
                I won the Best Speaker Award at Policython – The Ultimate Debate at VVCE! Presented strong arguments as part of the ruling party and learned a lot about policy, governance, and public speaking.
Honoured to receive the book “The India Way” by Dr. S. Jaishankar as a prize.
Grateful for the experience and excited to grow further! 
              </p>
              <a href="https://www.linkedin.com/posts/ryashu_thrilled-to-share-that-i-won-the-best-speaker-activity-7403636014898208768-l1h6?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFMrWvYB1ukNfb0ciqJYPC50TnD6-6SgmtE" target="_blank" rel="noopener noreferrer" className="news-link">
                View Details →
              </a>
            </div>
          </div>
        </div>

        {/* Button to see more */}
        <div className="see-more-btn-container">
          <button
            id="seeall"
            className="see-more-btn"
            onClick={() => {
              if (onSeeMoreActivities) {
                onSeeMoreActivities();
              } else {
                window.location.href = '/extraactivity';
              }
            }}
          >
            See All Activities
          </button>
        </div>
      </section>






      {/* Resume and Connect */}
      <div className="landing-layers" data-dark="true">

        <section className="resume-section">
          <div className="resume-content">
            <h2 className="resume-title">Resume</h2>
            <p className="resume-desc">
              A quick glimpse into my professional journey, skills, and achievements —
              crafted with experience and dedication. Download my resume below.
            </p>
            <a
              href="https://drive.google.com/file/d/1VeVWNIYsUpwFoq712WjJwwS6OYQO5QL1/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn"
            >
              Download Resume
            </a>
          </div>
        </section>



        <div className="connect-headline">
          <ParticleBackground variant="connect" colorTheme="gray" />
          <h1>
            <span className="pink">Connect.</span>
            <span className="blue"> Discuss.</span>
            <span className="green"> Progress.</span>
          </h1>
        </div>
      </div>

      {/* Footer */}
      <section className="footer-section" id="contact" data-dark="true">
        <ParticleBackground variant="connect" colorTheme="blue" />
        <div className="footer-left">
          <h2 className="footer-title">Let's Connect</h2>

          {/* Email */}
          <div className="footer-contact-item">
            <span className="footer-label">Email:</span>
            <span className="footer-icon" aria-hidden="true">📧</span>
            <a
              href="mailto:yashachar246@gmail.com"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              yashachar246@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="footer-contact-item">
            <span className="footer-label">Phone:</span>
            <span className="footer-icon" aria-hidden="true">📞</span>
            <a href="tel:+919686214691" className="footer-link">
              +91 9686214691
            </a>
          </div>

          {/* Social Label */}
          <h3 className="footer-subtitle">My Socials</h3>

          {/* Social Icons */}
          <div className="footer-socials">
            <a
              href="https://linkedin.com/in/ryashu"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/linkedin_b3clom.png" alt="LinkedIn" />
            </a>

            <a
              href="https://www.instagram.com/yash1th_r?igsh=c2V4Y2x2dXg3ajZo"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/instagram_i43uld.png" alt="Instagram" />
            </a>

            <a
              href="https://github.com/yash5755/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <img src="https://res.cloudinary.com/ddo4qy8bi/image/upload/v1768929824/git_logo_wi3mxl.png" alt="Github" />
            </a>

            <a
              href="https://wa.me/919686214691"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/whatsapp_yo1hkj.png" alt="whatsapp" />
            </a>
          </div>

          {/* Visitor Counter */}
          <div className="visitor-counter">
            <span className="visitor-label">Visitors</span>
            {visitorCount !== null && !visitorError ? (
              <span className="visitor-value">{visitorCount.toLocaleString()}</span>
            ) : visitorError ? (
              <span className="visitor-value dim">Offline</span>
            ) : (
              <span className="visitor-value dim">Loading…</span>
            )}
          </div>
        </div>


        <div className="info-section"></div>

        <div className="footer-right">
          <div className="gif-grid">
            <div id="gif0" className="gif-box">
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525785/linklogo_uzv9tb.gif" alt="gif1" />
            </div>
            <div id="gif0" className="gif-box">
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/emaillogo_owln2j.gif" alt="gif2" />
            </div>
            <div id="gif0" className="gif-box">
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/calllogo_hp4ygx.gif" alt="gif3" />
            </div>
            <div id="gif0" className="gif-box">
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/calllogo_hp4ygx.gif" alt="gif4" />
            </div>
            <div id="gif0" className="gif-box">
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525785/linklogo_uzv9tb.gif" alt="gif5" />
            </div>
            <div id="gif0" className="gif-box">
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/emaillogo_owln2j.gif" alt="gif6" />
            </div>
            <div id="gif0" className="gif-box">
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/emaillogo_owln2j.gif" alt="gif7" />
            </div>
            <div id="gif0" className="gif-box">
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/calllogo_hp4ygx.gif" alt="gif8" />
            </div>
            <div id="gif0" className="gif-box">
              <img src="https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525785/linklogo_uzv9tb.gif" alt="gif9" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
