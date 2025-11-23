import React from "react";
import "./Hero.css";
import AnimatedMac from "./AnimatedMac";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>
          <span className="highlight">DevSecOps</span>
        <br/><span className="highlight2">AppSec</span></h1>
        <h2><br/>- Toolchain<br/>
           - DevOps
            <br />
           - Infosec Risks 
            <br />
           - Стратегии и процессы
            <br />
           - PMI
            <br />
           - Кулуарный ИБ
            <br />
        </h2>
      </div>
      {/* В этот блок вставляйте вашу анимацию или любой JSX для отображения внутри "экрана" */}
      <AnimatedMac>
        {/* Пример: внутри можно отобразить анимацию, изображение, gif или компонент */}
        {/* <CanvasAnimation /> */}
        {/* <img src={process.env.PUBLIC_URL + "/some_gif.gif"} alt="Anim" /> */}
        {/* <YourComponent /> */}
      </AnimatedMac>
    </div>
  );
}
