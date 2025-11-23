import React from "react";
import "./Hero.css";
import AnimatedSphere from "./AnimatedSphere";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>
          <span className="highlight">Development, Security & Operations</span>
        </h1>
      </div>
      <AnimatedSphere />
    </div>
  );
}
