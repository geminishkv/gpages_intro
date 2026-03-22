import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import '../styles/Blog.css';
import DATA from '../data/tg-posts.json';

const CHANNEL_URL = 'https://t.me/shmakovis_appsec';
const MOBILE_BP   = 576;
const posts       = DATA.posts  ?? [];
const subscribers = DATA.subscribers ?? 0;

/* ─────────────────── helpers ─────────────────── */

function pluralRu(n, one, few, many) {
  const mod10  = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return `${n} ${many}`;
  if (mod10 === 1)                   return `${n} ${one}`;
  if (mod10 >= 2 && mod10 <= 4)     return `${n} ${few}`;
  return `${n} ${many}`;
}

function formatViews(n) {
  if (!n) return null;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.0', '')}\u202fK`;
  return String(n);
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

/* ─────────────────── icons ─────────────────── */

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

/* ─────────────────── modal ─────────────────── */

function BlogModal({ post, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);

    // Lock scroll on .main-page (not body — it's inside a fixed overflow:auto container)
    const mainPage = document.querySelector('.main-page');
    if (mainPage) mainPage.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      if (mainPage) mainPage.style.overflow = '';
    };
  }, [onClose]);

  const views = formatViews(post.views);

  return createPortal(
    <div className="blog-modal-backdrop" onClick={onClose}>
      <div
        className="blog-modal"
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
      >
        <button className="blog-modal__close" onClick={onClose} aria-label="Закрыть">✕</button>

        {post.image && (
          <img src={post.image} alt="" className="blog-modal__cover" loading="lazy" />
        )}

        <div className="blog-modal__body">
          <div className="blog-modal__meta">
            <span className="blog-modal__date">{formatDate(post.date)}</span>
            {views && (
              <span className="blog-modal__views">
                <EyeIcon />{views}
              </span>
            )}
          </div>

          <p className="blog-modal__text">{post.text}</p>

          {post.tags?.length > 0 && (
            <div className="blog-modal__tags">
              {post.tags.slice(0, 6).map(t => (
                <span key={t} className="blog-tag">#{t}</span>
              ))}
            </div>
          )}

          <a
            href={post.url}
            target="_blank"
            rel="noreferrer"
            className="blog-modal__open"
          >
            <TgIcon size={15} />
            Открыть в Telegram
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ─────────────────── card ─────────────────── */

function BlogCard({ post, onClick }) {
  const views = formatViews(post.views);

  return (
    <div className="blog-card" role="button" tabIndex={0} onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}>
      {post.image && (
        <div
          className="blog-card__cover"
          style={{ backgroundImage: `url(${post.image})` }}
          aria-hidden="true"
        />
      )}

      <div className="blog-card__inner">
        <div className="blog-card__meta">
          <span className="blog-card__date">{formatDate(post.date)}</span>
          {views && (
            <span className="blog-card__views">
              <EyeIcon />{views}
            </span>
          )}
        </div>

        <p className="blog-card__text">{post.text}</p>

        {post.tags?.length > 0 && (
          <div className="blog-card__tags">
            {post.tags.slice(0, 4).map(t => (
              <span key={t} className="blog-tag blog-tag--sm">#{t}</span>
            ))}
          </div>
        )}

        <span className="blog-card__read">Читать →</span>
      </div>
    </div>
  );
}

/* ─────────────────── section ─────────────────── */

export default function Blog() {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

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

  const visible = (isMobile && !expanded) ? posts.slice(0, 1) : posts;

  if (!posts.length) return null;

  return (
    <section className="blog">
      {/* Header */}
      <div className="blog__header">
        <div className="blog__header-left">
          <span className="blog__label">Blog</span>
          {subscribers > 0 && (
            <span className="blog__subs">
              {pluralRu(subscribers, 'подписчик', 'подписчика', 'подписчиков')}
            </span>
          )}
        </div>
        <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className="blog__channel-link">
          <TgIcon />shmakovis_appsec →
        </a>
      </div>

      {/* Grid */}
      <div className="blog__grid">
        {visible.map(p => (
          <BlogCard key={p.id} post={p} onClick={() => setSelected(p)} />
        ))}

        {/* CTA block */}
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noreferrer"
          className="blog-cta"
        >
          <TgIcon size={28} />
          <span className="blog-cta__title">AppSECT.A.</span>
          <span className="blog-cta__sub">
            Авторский канал про AppSec и DevSecOps
          </span>
          <span className="blog-cta__btn">Подписаться →</span>
        </a>
      </div>

      {isMobile && !expanded && posts.length > 1 && (
        <button className="blog__show-more" onClick={() => setExpanded(true)}>
          Показать ещё {posts.length - 1} {posts.length - 1 === 1 ? 'пост' : 'поста'} ↓
        </button>
      )}

      {/* Modal */}
      {selected && <BlogModal post={selected} onClose={close} />}
    </section>
  );
}
