import React from "react";
import "./Hero.css";
import Typewriter from "./Typewriter";
import AnimatedMac from "./AnimatedMac";

export default function Hero() {
  return (
      <div className="hero">
        <div className="hero-text">
          <h1>
            <Typewriter text="DevSecOps" className="highlight"/><br/>
            <Typewriter text="AppSec" className="highlight2"/>
          </h1>
          <h2>
            <br />- Toolchain<br />
            - DevOps<br />
           - Infosec Risks<br />
            - Стратегии и процессы<br />
            - PMI<br />
            - Кулуарный ИБ<br />
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
