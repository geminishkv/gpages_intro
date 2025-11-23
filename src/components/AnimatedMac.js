import React from "react";
import "./AnimatedMac.css";

export default function AnimatedMac() {
  return (
    <div className="mac-container">
      <div className="mac-image-wrapper">
        <img src={process.env.PUBLIC_URL + "/mak.jpeg"} alt="MacIntosh" className="mac-image" />
        <div className="mac-screen">
          <img
            src={process.env.PUBLIC_URL + "/code.jpeg"}
            alt="Вторая картинка внутри экрана"
            className="mac-inside"
          />
        </div>
      </div>
    </div>
  );
}
