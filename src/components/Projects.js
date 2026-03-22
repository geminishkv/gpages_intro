import { useState, useEffect } from 'react';
import '../styles/Projects.css';
import { PROJECTS } from '../constants';

const MOBILE_BP = 576;

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  );
}

export default function Projects({ isVisible }) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BP,
  );
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP}px)`);
    const handler = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setExpanded(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const visible = (isMobile && !expanded) ? PROJECTS.slice(0, 1) : PROJECTS;

  return (
    <section className={`projects${isVisible ? ' projects--visible' : ''}`}>
      <div className="projects__header">
        <span className="projects__label">Open-Source Projects</span>
        <a
          href="https://github.com/geminishkv"
          target="_blank"
          rel="noreferrer"
          className="projects__github-link"
        >
          GitHub →
        </a>
      </div>

      <div className="projects__grid">
        {visible.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="project-card"
          >
            <div className="project-card__top">
              <span className="project-card__name">{p.name}</span>
            </div>
            <p className="project-card__desc">{p.desc}</p>
            <div className="project-card__meta">
              <span className="project-card__lang">
                <span className="project-card__lang-dot" style={{ background: p.langColor }} />
                {p.lang}
              </span>
              {p.stars > 0 && (
                <span className="project-card__stat"><StarIcon />{p.stars}</span>
              )}
              {p.forks > 0 && (
                <span className="project-card__stat"><ForkIcon />{p.forks}</span>
              )}
            </div>
          </a>
        ))}
      </div>

      {isMobile && !expanded && PROJECTS.length > 1 && (
        <button className="projects__show-more" onClick={() => setExpanded(true)}>
          Show {PROJECTS.length - 1} more projects ↓
        </button>
      )}
    </section>
  );
}
