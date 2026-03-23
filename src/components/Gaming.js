import '../styles/Gaming.css';
import DATA    from '../data/gaming.json';
import IG_DATA from '../data/instagram.json';

const GRID_LIMIT = 18;
const IG_LIMIT   = 8;

/* ─── Platform icons ─── */
function PsnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8.984 2.596v15.81l3.77 1.18V6.68c0-.76.34-1.29.88-1.12.62.18.74.8.74 1.56v5.5c2.65 1.14 4.64-.18 4.64-3.38 0-3.28-1.12-4.76-4.94-5.62-1.4-.32-3.27-.7-5.08-1.02zM4 19.662l4.318 1.342v-2.846L4 16.936v2.726zm15.162-5.65c-1.628-.506-3.408-.39-4.762.21v2.04c1.01-.51 2.638-.734 3.77-.21.644.307.736.8.43 1.162-.46.553-1.674.687-3.64.016v2.642c2.814.742 6.04.44 6.04-2.42 0-1.61-.9-2.796-1.838-3.44z"/>
    </svg>
  );
}

function XboxIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zm11.16-14.406c2.5 2.961 7.484 10.313 6.076 12.912C23.002 17.48 24 14.861 24 12.004c0-3.34-1.365-6.362-3.57-8.536 0 0-.027-.022-.082-.042-.063-.022-.152-.045-.281-.045-.592 0-1.985.434-4.805 3.246zM3.654 3.426c-.057.02-.082.041-.086.042C1.365 5.642 0 8.664 0 12.004c0 2.854.998 5.473 2.661 7.533-1.401-2.605 3.579-9.951 6.08-12.91-2.82-2.813-4.216-3.245-4.806-3.245-.131 0-.223.021-.281.046v-.002zM12 3.551S9.055 1.828 6.755 1.746c-.903-.033-1.454.295-1.521.339C7.379.646 9.659 0 11.984 0H12c2.334 0 4.605.646 6.766 2.085-.068-.046-.615-.372-1.52-.339C14.946 1.828 12 3.545 12 3.545v.006z"/>
    </svg>
  );
}

/* ─── PSN level star icon ─── */
function PsnLevelIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.09 6.26H21l-5.47 3.97 2.09 6.26L12 14.52l-5.62 4.07 2.09-6.26L3 8.26h6.91z"/>
    </svg>
  );
}

/* ─── Xbox stat icons ─── */
function GamerscoreIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12.5L13.62 12H18l-3.5 2.54 1.34 4.12L12 16.1l-3.84 2.56 1.34-4.12L6 12h4.38z"/>
    </svg>
  );
}

function AchievementsIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V18H7v2h10v-2h-4v-2.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
    </svg>
  );
}

function GamesPlayedIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H9v2H7v-2H5v-2h2V9h2v2h2v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5S14.67 12 15.5 12s1.5.67 1.5 1.5S16.33 15 15.5 15zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5S19.33 12 18.5 12z"/>
    </svg>
  );
}

function CompletionIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );
}

/* ─── Small trophy icon for "last platinum" row ─── */
function TrophyIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4V2H17V4H21V7C21 9.21 19.47 11.07 17.41 11.5C16.78 13.19 15.44 14.54 13.77 15.17L13 20H16V22H8V20H11L10.23 15.17C8.56 14.54 7.22 13.19 6.59 11.5C4.53 11.07 3 9.21 3 7V4H7ZM5 6V7C5 8.1 5.67 9.03 6.61 9.42C6.1 8.72 5.73 7.91 5.53 7H5V6ZM18.47 9.42C19.33 9.03 20 8.1 20 7V6H18.47C18.27 6.91 17.9 7.72 17.39 8.42C17.5 8.76 17.57 9.09 17.57 9.42H18.47Z"/>
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export default function Gaming() {
  const { psn, xbox, platinums = [], xboxGames = [] } = DATA;
  const igPosts = IG_DATA.posts ?? [];

  const hasPlatinumWall = platinums.length > 0;
  const hasXboxGames    = xboxGames.length > 0;
  const hasXboxStats    = (xbox.gamerscore ?? 0) > 0;

  const lastPlatinum = platinums[0]?.title ?? null;
  const lastXboxGame = xbox.lastGame ?? xboxGames[0]?.title ?? null;

  const xboxWithPct = xboxGames.filter(g => g.pct > 0);
  const xboxAvgPct  = xboxWithPct.length > 0
    ? Math.round(xboxWithPct.reduce((s, g) => s + g.pct, 0) / xboxWithPct.length)
    : null;

  return (
    <section className="gaming">

      <div className="gaming__header">
        <span className="gaming__label">Interests</span>
      </div>

      {/* ── Instagram ── */}
      {igPosts.length > 0 && (
        <div className="gaming__ig-section">
          <div className="gaming__ig-grid">
            {igPosts.slice(0, IG_LIMIT).map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="ig-card"
              >
                {p.image && (
                  <img src={p.image} alt="" className="ig-card__cover" loading="lazy" />
                )}
                <div className="ig-card__inner">
                  {p.timestamp > 0 && (
                    <span className="ig-card__date">
                      {new Date(p.timestamp).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                  {p.caption && <p className="ig-card__caption">{p.caption}</p>}
                  <span className="ig-card__read">Смотреть →</span>
                </div>
              </a>
            ))}

            {/* CTA */}
            <a
              href="https://www.instagram.com/geminishkv"
              target="_blank"
              rel="noreferrer"
              className="ig-cta"
            >
              <InstagramIcon size={28} />
              <span className="ig-cta__title">@geminishkv</span>
              <span className="ig-cta__sub">Личный профиль</span>
              <span className="ig-cta__btn">Перейти →</span>
            </a>
          </div>
        </div>
      )}

      {/* ── Platform cards row ── */}
      <div className="gaming__cards-row">
        

        {/* PSN card */}
        <div className="gaming__platform-card">
          <div className="platform-card__head">
            <span className="platform-card__icon platform-card__icon--psn"><PsnIcon /></span>
            <span className="platform-card__id">{psn.id}</span>
            <span className="platform-card__platform-label">PlayStation</span>
          </div>

          <div className="platform-card__xbox-stats">
            <div className="xbox-stat">
              <span className="xbox-stat__icon" style={{ color: '#d4a520' }}><PsnLevelIcon size={18} /></span>
              <span className="xbox-stat__text">
                <span className="xbox-stat__value">{psn.level}</span>
                <span className="xbox-stat__label">Level</span>
              </span>
            </div>
            <div className="xbox-stat">
              <span className="xbox-stat__icon" style={{ color: '#c9a0dc' }}><TrophyIcon size={18} /></span>
              <span className="xbox-stat__text">
                <span className="xbox-stat__value">{psn.platinum}</span>
                <span className="xbox-stat__label">Platinum</span>
              </span>
            </div>
            <div className="xbox-stat">
              <span className="xbox-stat__icon" style={{ color: '#d4a520' }}><TrophyIcon size={18} /></span>
              <span className="xbox-stat__text">
                <span className="xbox-stat__value">{psn.gold}</span>
                <span className="xbox-stat__label">Gold</span>
              </span>
            </div>
            <div className="xbox-stat">
              <span className="xbox-stat__icon" style={{ color: '#94a3b8' }}><TrophyIcon size={18} /></span>
              <span className="xbox-stat__text">
                <span className="xbox-stat__value">{psn.silver}</span>
                <span className="xbox-stat__label">Silver</span>
              </span>
            </div>
            <div className="xbox-stat">
              <span className="xbox-stat__icon" style={{ color: '#b46e3c' }}><TrophyIcon size={18} /></span>
              <span className="xbox-stat__text">
                <span className="xbox-stat__value">{psn.bronze}</span>
                <span className="xbox-stat__label">Bronze</span>
              </span>
            </div>
            <div className="xbox-stat">
              <span className="xbox-stat__icon" style={{ color: '#555' }}><TrophyIcon size={18} /></span>
              <span className="xbox-stat__text">
                <span className="xbox-stat__value">{psn.total.toLocaleString('ru-RU')}</span>
                <span className="xbox-stat__label">Total</span>
              </span>
            </div>
          </div>

          {lastPlatinum && (
            <div className="platform-card__last-plat">
              <TrophyIcon size={11} />
              <span className="platform-card__last-plat-label">Last platinum:</span>
              <span className="platform-card__last-plat-title">{lastPlatinum}</span>
            </div>
          )}
        </div>

        {/* Xbox card */}
        <div className="gaming__platform-card">
          <div className="platform-card__head">
            <span className="platform-card__icon platform-card__icon--xbox"><XboxIcon /></span>
            <span className="platform-card__id">{xbox.id}</span>
            <span className="platform-card__platform-label">Xbox</span>
          </div>

          {hasXboxStats ? (
            <>
              <div className="platform-card__xbox-stats">
                <div className="xbox-stat">
                  <span className="xbox-stat__icon"><GamerscoreIcon size={18} /></span>
                  <span className="xbox-stat__text">
                    <span className="xbox-stat__value">{xbox.gamerscore.toLocaleString('ru-RU')}</span>
                    <span className="xbox-stat__label">Gamerscore</span>
                  </span>
                </div>
                {xbox.games > 0 && (
                  <div className="xbox-stat">
                    <span className="xbox-stat__icon"><GamesPlayedIcon size={18} /></span>
                    <span className="xbox-stat__text">
                      <span className="xbox-stat__value">{xbox.games}</span>
                      <span className="xbox-stat__label">Games</span>
                    </span>
                  </div>
                )}
                {xboxAvgPct !== null && (
                  <div className="xbox-stat">
                    <span className="xbox-stat__icon"><CompletionIcon size={18} /></span>
                    <span className="xbox-stat__text">
                      <span className="xbox-stat__value">{xboxAvgPct}%</span>
                      <span className="xbox-stat__label">Avg. completion</span>
                    </span>
                  </div>
                )}
                {xbox.achievements > 0 && (
                  <div className="xbox-stat">
                    <span className="xbox-stat__icon"><AchievementsIcon size={18} /></span>
                    <span className="xbox-stat__text">
                      <span className="xbox-stat__value">{xbox.achievements.toLocaleString('ru-RU')}</span>
                      <span className="xbox-stat__label">Achievements</span>
                    </span>
                  </div>
                )}
              </div>
              {lastXboxGame && (
                <div className="platform-card__last-plat">
                  <XboxIcon size={11} />
                  <span className="platform-card__last-plat-label">Last played:</span>
                  <span className="platform-card__last-plat-title">{lastXboxGame}</span>
                </div>
              )}
            </>
          ) : (
            <p className="platform-card__no-data">Stats loading via CI…</p>
          )}
        </div>

      </div>

      {/* ── Game grids — same layout for both ── */}
      <div className="gaming__columns">

        {/* PSN Platinum Wall */}
        <div className="gaming__col">
          {hasPlatinumWall && (
            <>
              <div className="gaming__wall-header">
                <span className="gaming__wall-label">Platinum Wall</span>
                <span className="gaming__wall-count">{psn.platinum ?? platinums.length} trophies</span>
              </div>
              <div className="gaming__mini-grid">
                {platinums.slice(0, GRID_LIMIT).map((p, i) => (
                  <div
                    key={i}
                    className={`platinum-item${!p.image ? ' platinum-item--empty' : ''}`}
                    data-tooltip={p.title}
                  >
                    {p.image
                      ? <img src={p.image} alt={p.title} loading="lazy" />
                      : <span className="platinum-item__fallback"><TrophyIcon size={22} /></span>
                    }
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Xbox Game History */}
        <div className="gaming__col">
          {hasXboxGames && (
            <>
              <div className="gaming__wall-header">
                <span className="gaming__wall-label">Game History</span>
                <span className="gaming__wall-count">{xbox.games ?? xboxGames.length} games</span>
              </div>
              <div className="gaming__mini-grid">
                {xboxGames.slice(0, GRID_LIMIT).map((g, i) => {
                  const tooltip = g.maxScore
                    ? `${g.title} · ${g.gameScore}/${g.maxScore}G`
                    : g.title;
                  return (
                    <div
                      key={i}
                      className={`platinum-item${!g.image ? ' platinum-item--empty' : ''}`}
                      data-tooltip={tooltip}
                    >
                      {g.image
                        ? <img src={g.image} alt={g.title} loading="lazy" />
                        : <span className="platinum-item__fallback"><XboxIcon size={18} /></span>
                      }
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

      </div>

    </section>
  );
}
