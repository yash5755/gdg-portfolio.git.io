import React, { useState, useEffect } from "react";  // keep this
import "./App.css";
import Introduction from "./components/Introduction";
import MouseFollower from "./components/MouseFollower";
import LandingPage from "./components/Landingpage";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import ExtraActivity from "./components/ExtraActivity";


function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (showProjects || showActivities) {
        setShowProjects(false);
        setShowActivities(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showProjects, showActivities]);

  // Push state when navigating to projects or activities
  const handleSeeAllProjects = () => {
    window.history.pushState({ page: 'projects' }, '');
    setShowProjects(true);
  };

  const handleSeeMoreActivities = () => {
    window.history.pushState({ page: 'activities' }, '');
    setShowActivities(true);
  };

  if (showIntro) {
    return <Introduction onFinish={() => setShowIntro(false)} />;
  }

  return (
    <div className="app-wrapper">
      <div className="app">
        <MouseFollower
          size={showActivities ? 5 : 12}
          disableHoverEffects={showActivities}
        />
        {!showProjects && !showActivities && <Nav onSeeAllProjects={handleSeeAllProjects} />}
        {showActivities ? (
          <ExtraActivity
            onBack={() => {
              window.history.back();
              setShowActivities(false);
              // Optional: scroll back to activities section on landing
              setTimeout(() => {
                const el = document.getElementById("activities");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 50);
            }}
          />
        ) : showProjects ? (
          <Projects onBack={() => {
            window.history.back();
            setShowProjects(false);
            // After closing Projects, scroll to the projects section on Landing
            setTimeout(() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
          }} />
        ) : (
          <LandingPage
            onSeeAllProjects={handleSeeAllProjects}
            onSeeMoreActivities={handleSeeMoreActivities}
          />
        )}
      </div>
    </div>
  );
}

export default App;
