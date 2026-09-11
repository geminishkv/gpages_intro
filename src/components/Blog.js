import { useState, useEffect, useMemo } from 'react';
import '../styles/Blog.css';
import DATA from '../data/tg-posts.json';
import { useLang } from '../context/LangContext';
import SectionHead from './SectionHead';

const CHANNEL_URL   = 'https://t.me/appsecta';
const MOBILE_BP     = 576;
const LIST_DESKTOP  = 5;
const LIST_MOBILE   = 3;
const TAG_LIMIT     = 7;
const WORDS_PER_MIN = 180;

const posts       = DATA.posts ?? [];
const subscribers = DATA.subscribers ?? 0;

// The most used tags become the filter row.
const TOP_TAGS = (() => {
  const count = new Map();
  posts.forEach(p => (p.tags ?? []).forEach(tag => count.set(tag, (count.get(tag) ?? 0) + 1)));
  return [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, TAG_LIMIT).map(([tag]) => tag);
})();

function formatViews(n) {
  if (!n) return null;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.0', '')} K`;
  return String(n);
}

function formatDate(iso, locale) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
}

function readTime(text) {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / WORDS_PER_MIN));
}

function postText(post, lang) {
  return (lang === 'en' && post.text_en) ? post.text_en : post.text;
}

function postHref(post, lang) {
  return lang === 'en' ? `/blog/en/${post.id}/` : `/blog/${post.id}/`;
}

// The first line of a post reads as its title; the rest is the excerpt.
function splitPost(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l && !/^(#[\wа-яё_]+\s*)+$/i.test(l));
  const title = (lines[0] ?? '').replace(/(\s*#[\wа-яё_]+)+$/i, '').slice(0, 120);
  const body = lines.slice(1).join(' ');
  return { title, body };
}

function TgIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
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

function Cover({ post, className }) {
  const [broken, setBroken] = useState(false);
  if (!post.image || broken) return <div className={`${className} ${className}--empty`} aria-hidden="true" />;
  return (
    <img
      className={className}
      src={post.image}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
    />
  );
}

function Featured({ post, lang, locale, b }) {
  const text = postText(post, lang);
  const { title, body } = splitPost(text);
  const views = formatViews(post.views);
  return (
    <a href={postHref(post, lang)} className="card-base blog-feat">
      <Cover post={post} className="blog-feat__cover" />
      <div className="card-base__inner blog-feat__inner">
        <div className="blog-meta">
          <span>{formatDate(post.date, locale)}</span>
          {views && <span><EyeIcon />{views}</span>}
          <span>{b.readTime(readTime(text))}</span>
          {post.tags?.slice(0, 3).map(tag => <span key={tag} className="blog-tag">#{tag}</span>)}
        </div>
        <h3 className="blog-feat__title">{title}</h3>
        {body && <p className="blog-feat__text">{body}</p>}
        <span className="card-base__cta">{b.readBtn}</span>
      </div>
    </a>
  );
}

function Mini({ post, lang, locale }) {
  const text = postText(post, lang);
  const { title, body } = splitPost(text);
  return (
    <a href={postHref(post, lang)} className="blog-mini">
      <Cover post={post} className="blog-mini__thumb" />
      <div className="blog-mini__body">
        <div className="blog-meta blog-meta--sm">
          <span>{formatDate(post.date, locale)}</span>
          {post.tags?.[0] && <span className="blog-tag">#{post.tags[0]}</span>}
        </div>
        <p className="blog-mini__text">{title}{body ? ` — ${body}` : ''}</p>
      </div>
    </a>
  );
}

export default function Blog() {
  const { t, lang } = useLang();
  const { locale } = t;
  const b = t.blog;
  const [tag, setTag] = useState(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BP,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const filtered = useMemo(
    () => (tag ? posts.filter(p => p.tags?.includes(tag)) : posts),
    [tag],
  );
  const listSize = isMobile ? LIST_MOBILE : LIST_DESKTOP;
  const [featured, ...rest] = filtered;
  const list = rest.slice(0, listSize);

  if (!posts.length) return null;

  return (
    <section className="blog">
      <SectionHead
        eyebrow={t.sectionHead.blog.eyebrow}
        title={t.sections.blog}
        sub={t.sectionHead.blog.sub}
        action={{ href: lang === 'en' ? '/blog/en/' : '/blog/', label: t.sectionHead.blog.action }}
      >
        {subscribers > 0 && (
          <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className="blog__subs"><TgIcon />{b.subscribersFmt(subscribers)}</a>
        )}
      </SectionHead>

      {TOP_TAGS.length > 0 && (
        <div className="blog-filters" role="group" aria-label={b.filtersLabel}>
          <button type="button" className={`blog-filter${tag === null ? ' blog-filter--on' : ''}`} onClick={() => setTag(null)}>
            {b.filtersAll}
          </button>
          {TOP_TAGS.map(tg => (
            <button
              key={tg}
              type="button"
              className={`blog-filter${tag === tg ? ' blog-filter--on' : ''}`}
              onClick={() => setTag(tag === tg ? null : tg)}
            >
              #{tg}
            </button>
          ))}
        </div>
      )}

      {featured ? (
        <div className="blog__layout">
          <Featured post={featured} lang={lang} locale={locale} b={b} />
          <div className="blog__list">
            {list.map(p => <Mini key={p.id} post={p} lang={lang} locale={locale} />)}
          </div>
        </div>
      ) : (
        <p className="blog__empty">{b.empty}</p>
      )}

      <a href={CHANNEL_URL} target="_blank" rel="noreferrer" className="blog-channel">
        <span className="blog-channel__icon"><TgIcon size={20} /></span>
        <span className="blog-channel__body">
          <b>@appsecta</b>
          <span>{subscribers > 0 ? `${b.subscribersFmt(subscribers)} · ` : ''}{t.now.postsFmt(posts.length)} · {b.ctaSub}</span>
        </span>
        <span className="blog-channel__btn">{b.subscribeBtn}</span>
      </a>
    </section>
  );
}
