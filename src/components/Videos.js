import '../styles/Videos.css';
import { useLang } from '../context/LangContext';

function PlayIcon() {
  return (
    <svg className="video-card__play-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="26,20 48,32 26,44" fill="currentColor" />
    </svg>
  );
}

export default function Videos() {
  const { t } = useLang();
  const videos = t.videos;

  return (
    <section className="videos">
      <div className="videos__header">
        <span className="videos__label">YouTube</span>
      </div>
      <div className="videos__grid">
        {videos.map((v) => (
          <a
            key={v.url}
            href={v.url}
            target="_blank"
            rel="noreferrer"
            className="card-base card-base--elevated video-card"
          >
            <div className="video-card__thumb-wrap">
              <img
                src={v.thumb}
                alt={v.title}
                className={`video-card__thumb${v.thumbZoom ? ' video-card__thumb--zoom' : ''}`}
                loading="lazy"
              />
              <div className="video-card__overlay">
                <PlayIcon />
              </div>
            </div>

            <div className="video-card__body">
              <span className="video-card__label">{v.label}</span>
              <p className="video-card__title">{v.title}</p>
            </div>

            <div className="video-card__footer">
              <span className="video-card__btn">{t.gaming.watchBtn}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
