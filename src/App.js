export default App;

import React from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <footer className="footer">
        <span>geminishkv (C), 2025</span>
        <a href="@geminishkv" className="contact">Связаться</a>
      </footer>
    </div>
  );
}

export default App;