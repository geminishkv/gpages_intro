import { useState } from 'react';
import '../styles/Gaming.css';
import DATA from '../data/gaming.json';

const PLATINUM_INITIAL = 17;
const XBOX_INITIAL     = 17;

/* ─── Icons ─── */
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

const TROPHY_PATH = "M7 4V2H17V4H21V7C21 9.21 19.47 11.07 17.41 11.5C16.78 13.19 15.44 14.54 13.77 15.17L13 20H16V22H8V20H11L10.23 15.17C8.56 14.54 7.22 13.19 6.59 11.5C4.53 11.07 3 9.21 3 7V4H7ZM5 6V7C5 8.1 5.67 9.03 6.61 9.42C6.1 8.72 5.73 7.91 5.53 7H5V6ZM18.47 9.42C19.33 9.03 20 8.1 20 7V6H18.47C18.27 6.91 17.9 7.72 17.39 8.42C17.5 8.76 17.57 9.09 17.57 9.42H18.47Z";

function TrophyIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={TROPHY_PATH} />
    </svg>
  );
}

export default function Gaming() {
  const [platExpanded, setPlatExpanded] = useState(false);
  const [xboxExpanded, setXboxExpanded] = useState(false);
  const { psn, xbox, platinums = [], xboxGames = [] } = DATA;

  // Xbox: all games for the grid, cover-only for count display
  const xboxAll = xboxGames;

  const visiblePlatinums = platExpanded ? platinums : platinums.slice(0, PLATINUM_INITIAL);
  const visibleXbox      = xboxExpanded ? xboxAll   : xboxAll.slice(0, XBOX_INITIAL);

  const hasPlatinumWall = platinums.length > 0;
  const hasXboxGames    = xboxAll.length > 0;
  const hasXboxStats    = (xbox.gamerscore ?? 0) > 0;

  // Last platinum earned (first in array = most recent from stratege)
  const lastPlatinum = platinums[0]?.title ?? null;

  // Xbox average completion %
  const xboxWithPct = xboxAll.filter(g => g.pct > 0);
  const xboxAvgPct  = xboxWithPct.length > 0
    ? Math.round(xboxWithPct.reduce((s, g) => s + g.pct, 0) / xboxWithPct.length)
    : null;

  return (
    <section className="gaming">

      {/* ── Header ── */}
      <div className="gaming__header">
        <span className="gaming__label">Interests</span>
      </div>

      {/* ── Platform cards row (equal height via shared grid) ── */}
      <div className="gaming__cards-row">

        {/* PSN card */}
        <div className="gaming__platform-card">
          <div className="platform-card__head">
            <span className="platform-card__icon platform-card__icon--psn">
              <PsnIcon />
            </span>
            <span className="platform-card__id">{psn.id}</span>
            <span className="platform-card__platform-label">PlayStation</span>
          </div>

          <div className="platform-card__level-row">
            <span className="platform-card__level-icon">
              <TrophyIcon size={14} />
            </span>
            <span className="platform-card__level-num">{psn.level}</span>
            <div className="platform-card__bar-wrap">
              <div
                className="platform-card__bar"
                style={{ width: `${psn.levelPercent || 0}%` }}
              />
            </div>
            {psn.levelPercent > 0 && (
              <span className="platform-card__level-pct">{psn.levelPercent}%</span>
            )}
          </div>

          <div className="platform-card__trophies">
            <span className="trophy-badge trophy-badge--platinum">
              <TrophyIcon />
              {psn.platinum}
            </span>
            <span className="trophy-badge trophy-badge--gold">
              <TrophyIcon />
              {psn.gold}
            </span>
            <span className="trophy-badge trophy-badge--silver">
              <TrophyIcon />
              {psn.silver}
            </span>
            <span className="trophy-badge trophy-badge--bronze">
              <TrophyIcon />
              {psn.bronze}
            </span>
            <span className="trophy-badge trophy-badge--total">
              {psn.total.toLocaleString('ru-RU')}
            </span>
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
            <span className="platform-card__icon platform-card__icon--xbox">
              <XboxIcon />
            </span>
            <span className="platform-card__id">{xbox.id}</span>
            <span className="platform-card__platform-label">Xbox</span>
          </div>

          {hasXboxStats ? (
            <>
              <div className="platform-card__xbox-stats">
                <div className="xbox-stat">
                  <span className="xbox-stat__value">{xbox.gamerscore.toLocaleString('ru-RU')}</span>
                  <span className="xbox-stat__label">Gamerscore</span>
                </div>
                {xbox.games > 0 && (
                  <div className="xbox-stat">
                    <span className="xbox-stat__value">{xbox.games}</span>
                    <span className="xbox-stat__label">Games</span>
                  </div>
                )}
                {xboxAvgPct !== null && (
                  <div className="xbox-stat">
                    <span className="xbox-stat__value">{xboxAvgPct}%</span>
                    <span className="xbox-stat__label">Avg. completion</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="platform-card__no-data">Stats loading via CI…</p>
          )}
        </div>

      </div>

      {/* ── Game grids row (two aligned columns) ── */}
      <div className="gaming__columns">

        {/* PSN platinums */}
        <div className="gaming__col">
          {hasPlatinumWall && (
            <>
              <div className="gaming__wall-header">
                <span className="gaming__wall-label">Platinum Wall</span>
                <span className="gaming__wall-count">{platinums.length} trophies</span>
              </div>
              <div className="gaming__mini-grid">
                {visiblePlatinums.map((p, i) => (
                  <div
                    key={i}
                    className={`platinum-item${!p.image ? ' platinum-item--no-img' : ''}`}
                    data-tooltip={p.title}
                  >
                    {p.image ? (
                      <img src={p.image} alt={p.title} loading="lazy" />
                    ) : (
                      <span className="platinum-item__fallback">
                        <TrophyIcon size={22} />
                      </span>
                    )}
                  </div>
                ))}
                {!platExpanded && platinums.length > PLATINUM_INITIAL && (
                  <button className="gaming__show-more" onClick={() => setPlatExpanded(true)}>
                    +{platinums.length - PLATINUM_INITIAL}
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Xbox games */}
        <div className="gaming__col">
          {hasXboxGames && (
            <>
              <div className="gaming__wall-header">
                <span className="gaming__wall-label">Game History</span>
                <span className="gaming__wall-count">{xboxAll.length} games</span>
              </div>
              <div className="gaming__mini-grid">
                {visibleXbox.map((g, i) => {
                  const tooltip = g.maxScore
                    ? `${g.title} · ${g.gameScore}/${g.maxScore}G`
                    : g.title;
                  return (
                    <div
                      key={i}
                      className={`platinum-item platinum-item--xbox${!g.image ? ' platinum-item--no-img' : ''}`}
                      data-tooltip={tooltip}
                    >
                      {g.image ? (
                        <img src={g.image} alt={g.title} loading="lazy" />
                      ) : (
                        <span className="platinum-item__fallback"><XboxIcon size={18} /></span>
                      )}
                    </div>
                  );
                })}
                {!xboxExpanded && xboxAll.length > XBOX_INITIAL && (
                  <button className="gaming__show-more" onClick={() => setXboxExpanded(true)}>
                    +{xboxAll.length - XBOX_INITIAL}
                  </button>
                )}
              </div>
            </>
          )}
        </div>

      </div>

    </section>
  );
}
