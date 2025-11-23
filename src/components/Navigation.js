import React from "react";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="nav">
      <span className="logo">AppSecT.A.</span>
      <ul>
        <li>Обо мне</li>
        <li>GitHub</li>
        <li>Блог</li>
        <li>CheatSheet</li>
        <li>References</li>
      </ul>
    </nav>
  );
}
