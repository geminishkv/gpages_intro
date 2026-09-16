import { useEffect, useRef, useState } from 'react';
import '../styles/Contacts.css';
import { useLang } from '../context/LangContext';
import { RESUME_URL } from '../constants';

const LINKS = {
  tg: 'https://t.me/geminishkv',
  mail: 'shmakovis@inbox.ru',
  li: 'https://www.linkedin.com/in/geminishkvdev/',
  gh: 'https://github.com/geminishkv',
  ig: 'https://www.instagram.com/geminishkv',
  blog: '/blog/',
  appsecta: 'https://t.me/appsecta',
  course: 'https://course.geminishkv.tech/',
  map: 'https://findevsecops.github.io/oss_toolchainmap/',
  nfc: 'https://my.idot.vip/geminishkv',
};

function Btn({ href, children, ext = true, className = '' }) {
  const extra = ext ? { target: '_blank', rel: 'noreferrer' } : {};
  return (
    <a className={`pkg-btn${className ? ` ${className}` : ''}`} href={href} {...extra}>
      <i /><span>{children}</span>
    </a>
  );
}

// Contacts screen: one message, the NFC card as a physical object, then the links
// grouped into profile and content. The footer below it is trimmed by Screens.css.
export default function Contacts() {
  const { t } = useLang();
  const c = t.contacts;
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const copyEmail = async () => {
    let text = c.copied + LINKS.mail;
    try { await navigator.clipboard.writeText(LINKS.mail); } catch { text = LINKS.mail; }
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2200);
  };

  return (
    <section className="gp-cts" aria-label={c.title}>
      <div className="gp-cts__head">
        <span className="sec-head__eyebrow">{`// ${c.eyebrow}`}</span>
        <h2 className="gp-cts__title">{c.title}</h2>
        <p className="gp-cts__sub">{c.sub}</p>
        <div className="gp-cts__cta">
          <Btn href={LINKS.tg} className="gp-btn--primary">{c.telegram}</Btn>
          <button className="pkg-btn gp-copy" type="button" onClick={copyEmail}><i /><span>{c.copyEmail}</span></button>
        </div>
        <p className="gp-live"><i className="gp-live__dot" aria-hidden="true" />{c.live}</p>
      </div>

      <a className="gp-nfc" href={LINKS.nfc} target="_blank" rel="noreferrer" aria-label={c.nfc.aria}>
        <span className="gp-nfc__glow" aria-hidden="true" />
        <span className="gp-nfc__top">
          <span className="gp-nfc__brand">geminishkv</span>
          <span className="gp-nfc__chip"><span className="gp-nfc__ring" /><span className="gp-nfc__label">NFC</span></span>
        </span>
        <span className="gp-nfc__mid"><b>{c.nfc.title}</b><small>{c.nfc.sub}</small></span>
        <span className="gp-nfc__bot"><span>my.idot.vip/geminishkv</span><span className="gp-nfc__arrow">→</span></span>
      </a>

      <div className="gp-cts__links">
        <div className="gp-cts__group">
          <span className="gp-cts__label">{c.profile}</span>
          <div className="gp-cts__btns">
            <Btn href={LINKS.gh}>GitHub</Btn>
            <Btn href={RESUME_URL}>{t.footer.resume}</Btn>
            <Btn href={LINKS.li}>LinkedIn*</Btn>
            <Btn href={LINKS.ig}>Instagram*</Btn>
          </div>
        </div>
        <div className="gp-cts__group">
          <span className="gp-cts__label">{c.content}</span>
          <div className="gp-cts__btns">
            <Btn href={LINKS.blog} ext={false}>{c.blog}</Btn>
            <Btn href={LINKS.appsecta}>AppSecTA · Telegram</Btn>
            <Btn href={LINKS.course}>{c.course}</Btn>
            <Btn href={LINKS.map}>OSS Toolchain Map</Btn>
          </div>
        </div>
      </div>
      <p className="gp-cts__foot">{c.foot}</p>

      <div className={`gp-toast${toast ? ' is-on' : ''}`} role="status" aria-live="polite">{toast}</div>
    </section>
  );
}
