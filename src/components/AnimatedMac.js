// src/components/AnimatedMac.js
import React from "react";
import "./AnimatedMac.css";

export default function AnimatedMac({ children }) {
  return (
    <div className="mac-container">
      <div className="mac-image-wrapper">
        <img src={process.env.PUBLIC_URL + "/mak.jpeg"} alt="MacIntosh" className="mac-image" />
        <div className="mac-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
