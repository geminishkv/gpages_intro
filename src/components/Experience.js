import '../styles/Experience.css';
import { EXPERIENCE } from '../constants';

export default function Experience() {
  return (
    <section className="experience">
      <div className="experience__header">
        <span className="experience__label">Experience</span>
      </div>

      <div className="experience__grid">
        {EXPERIENCE.map((item, i) => (
          <div key={i} className={`exp-card${item.current ? ' exp-card--current' : ''}`}>

            <div className="exp-card__logo-area">
              {item.logos ? (
                <div className="exp-card__logo-pair">
                  {item.logos.map((l, j) => (
                    <a key={j} href={l.url} target="_blank" rel="noreferrer" className="exp-card__logo-link">
                      <img src={l.src} alt={l.alt} className={`exp-card__logo${item.logoColor ? ' exp-card__logo--color' : ''}`} />
                    </a>
                  ))}
                </div>
              ) : (
                <a href={item.url} target="_blank" rel="noreferrer" className="exp-card__logo-link">
                  <img
                    src={item.logo}
                    alt={item.company}
                    className={`exp-card__logo${item.logoColor ? ' exp-card__logo--color' : ''}${item.logoInvert ? ' exp-card__logo--invert' : ''}`}
                  />
                </a>
              )}
            </div>

            <div className="exp-card__body">
              {item.logos ? (
                <div className="exp-card__names">
                  {item.logos.map((l, j) => (
                    <span key={j}>
                      <a href={l.url} target="_blank" rel="noreferrer" className="exp-card__company">{l.alt}</a>
                      {j < item.logos.length - 1 && <span className="exp-card__slash"> / </span>}
                    </span>
                  ))}
                </div>
              ) : (
                <a href={item.url} target="_blank" rel="noreferrer" className="exp-card__company">
                  {item.company}
                </a>
              )}
              <span className="exp-card__role">{item.role}</span>
              <span className="exp-card__period">{item.period}</span>
            </div>

            {item.current && <span className="exp-card__badge">current</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
