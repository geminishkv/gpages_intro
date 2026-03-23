import '../styles/Videos.css';

const VIDEOS = [
  {
    label: 'Podcast',
    title: 'Подкаст по безопасной разработке',
    url:   'https://www.youtube.com/watch?v=LifFzjdvGTc',
    thumb: process.env.PUBLIC_URL + '/img/yt_preroll/LifFzjdvGTc.jpg',
  },
  {
    label:     'Interview',
    title:     'Интервью с ассоциацией BISA по безопасной разработке ПО',
    url:       'https://youtu.be/sPGhWWaWUdE',
    thumb:     process.env.PUBLIC_URL + '/img/yt_preroll/sPGhWWaWUdE.jpg',
    thumbZoom: true,
  },
];

function PlayIcon() {
  return (
    <svg className="video-card__play-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="26,20 48,32 26,44" fill="currentColor" />
    </svg>
  );
}

export default function Videos() {
  return (
    <section className="videos">
      <div className="videos__header">
        <span className="videos__label">YouTube</span>
      </div>
      <div className="videos__grid">
        {VIDEOS.map((v) => (
          <a
            key={v.id}
            href={v.url}
            target="_blank"
            rel="noreferrer"
            className="video-card"
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
              <span className="video-card__btn">Смотреть →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
