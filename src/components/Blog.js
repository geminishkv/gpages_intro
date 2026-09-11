import { useState, useEffect } from 'react';
import '../styles/Blog.css';
import DATA from '../data/tg-posts.json';
import { useLang } from '../context/LangContext';
import GlitchLabel from './GlitchLabel';

const CHANNEL_URL    = 'https://t.me/appsecta';
const MOBILE_BP      = 576;
const MOBILE_INITIAL = 3;
const DESKTOP_INITIAL = 14;
const posts       = DATA.posts  ?? [];
const subscribers = DATA.subscribers ?? 0;

function formatViews(n) {
  if (!n) return null;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.0', '')}\u202fK`;
  return String(n);
}

function formatDate(iso, locale) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(locale, {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function TgIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M1 12C1 12 5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ── Card — links to /blog/{id}/ ── */

function BlogCard({ post, locale, readBtn, lang }) {
  const displayText = (lang === 'en' && post.text_en) ? post.text_en : post.text;
  const views = formatViews(post.views);
  const [imgBroken, setImgBroken] = useState(false);
  const href = lang === 'en' ? `/blog/en/${post.id}/` : `/blog/${post.id}/`;

  return (
    <a href={href} className="card-base blog-card">
      {post.image && !imgBroken && (
        <img
          className="blog-card__cover"
          src={post.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={() => setImgBroken(true)}
        />
      )}
      <div className="card-base__inner">
        <div className="blog-card__meta">
          <span className="blog-card__date">{formatDate(post.date, locale)}</span>
          {views && <span className="blog-card__views"><EyeIcon />{views}</span>}
        </div>
        <p className="blog-card__text">{displayText}</p>
        {post.tags?.length > 0 && (
          <div className="blog-card__tags">
            {post.tags.slice(0, 4).map(t => (
              <span key={t} className="blog-tag blog-tag--sm">#{t}</span>
            ))}
          </div>
        )}
        <span className="card-base__cta">{readBtn}</span>
      </div>
    </a>
  );
}

/* ── Section ── */

export default function Blog() {
  const { t, lang } = useLang();
  const { locale } = t;
  const b = t.blog;

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BP,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const initial = isMobile ? MOBILE_INITIAL : DESKTOP_INITIAL;
  const visible = posts.slice(0, initial);

  if (!posts.length) return null;

  return (
    <section className="blog">
      <div className="blog__header">
        <div className="blog__header-left">
          <GlitchLabel text={t.sections.blog} className="blog__label" />
          {subscribers > 0 && (
            <span className="blog__subs">{b.subscribersFmt(subscribers)}</span>
          )}
        </div>
        <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className="blog__channel-link">
          <TgIcon />appsecta →
        </a>
      </div>

      <div className="blog__grid">
        {visible.map(p => (
          <BlogCard key={p.id} post={p} locale={locale} readBtn={b.readBtn} lang={lang} />
        ))}

        <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className="blog-cta">
          <TgIcon size={28} />
          <span className="blog-cta__title">AppSECT.A.</span>
          <span className="blog-cta__sub">{b.ctaSub}</span>
          <span className="blog-cta__btn">{b.subscribeBtn}</span>
        </a>
      </div>

    </section>
  );
}
