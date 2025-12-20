import React, { useEffect, useState } from "react";
import "./Introduction.css";

const greetings = [
  "Hello",
  "Namaste",
  "Namaskar",
  "Bonjour",
  "Hola",
  "Ciao",
  "Guten Tag",
  "Hej",
  "ನಮಸ್ಕಾರ"
];

function Introduction({ onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    let interval;
    let timeout;

    const intervalTime = 200; // 0.25s per greeting
    const totalDuration = greetings.length * intervalTime; // 10 * 250ms = 2.5s

    // change greeting every 250ms
    interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % greetings.length);
    }, intervalTime);

    // after all greetings, fade out and finish
    timeout = setTimeout(() => {
      clearInterval(interval);
      setFade(true);
      // after fade out (1s) call onFinish
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 400);
    }, totalDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <div className={`intro-wrapper ${fade ? "fade-out" : ""}`}>
      <h1>{greetings[currentIndex]}</h1>
    </div>
  );
}

export default Introduction;
