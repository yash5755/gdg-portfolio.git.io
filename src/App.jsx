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
        {!showProjects && !showActivities && <Nav onSeeAllProjects={() => setShowProjects(true)} />}
        {showActivities ? (
          <ExtraActivity
            onBack={() => {
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
            setShowProjects(false);
            // After closing Projects, scroll to the projects section on Landing
            setTimeout(() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
          }} />
        ) : (
          <LandingPage
            onSeeAllProjects={() => setShowProjects(true)}
            onSeeMoreActivities={() => setShowActivities(true)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
