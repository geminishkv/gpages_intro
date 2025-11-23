import React from "react";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="nav">
      <span className="logo">geminishkv DevSecOps</span>
      <ul>
        <li>Обо мне</li>
        <li>Проекты</li>
        <li>Блог</li>
      </ul>
    </nav>
  );
}
