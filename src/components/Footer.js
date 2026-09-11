import '../styles/Footer.css';
import { useLang } from '../context/LangContext';
import { LOGO_IMG, RESUME_URL } from '../constants';

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const n = t.nav;

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <a href="#top" className="footer__logo">
            <img src={LOGO_IMG} alt="" width="28" height="28" />
            <span>geminishkv</span>
          </a>
          <span className="footer__motto">Sic Parvis Magna</span>
          <p className="footer__about">{f.about}</p>
        </div>

        <div className="footer__col">
          <h4>{f.sections}</h4>
          <ul>
            <li><a href="#projects">{n.projects ?? t.sections.projects}</a></li>
            <li><a href="#blog">{n.blog}</a></li>
            <li><a href="#experience">{n.experience}</a></li>
            <li><a href="#skillset">{n.skillset}</a></li>
            <li><a href="#interests">{n.interests}</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>{f.contacts}</h4>
          <ul>
            <li><a href="https://t.me/geminishkv" target="_blank" rel="noreferrer">Telegram · @geminishkv</a></li>
            <li><a href="mailto:shmakovis@inbox.ru">Email</a></li>
            <li><a href="https://www.linkedin.com/in/geminishkvdev/" target="_blank" rel="noreferrer">LinkedIn*</a></li>
            <li><a href="https://www.instagram.com/geminishkv" target="_blank" rel="noreferrer">Instagram*</a></li>
            <li><a href={RESUME_URL} target="_blank" rel="noreferrer">{f.resume}</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>{f.projects}</h4>
          <ul>
            <li><a href="https://t.me/appsecta" target="_blank" rel="noreferrer">AppSecTA · Telegram</a></li>
            <li><a href="https://course.geminishkv.tech/" target="_blank" rel="noreferrer">{f.course}</a></li>
            <li><a href="https://findevsecops.github.io/oss_toolchainmap/" target="_blank" rel="noreferrer">OSS Toolchain Map</a></li>
            <li><a href="https://github.com/geminishkv/sbom_genform" target="_blank" rel="noreferrer">sbom_genform</a></li>
            <li><a href="https://github.com/geminishkv" target="_blank" rel="noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <span className="footer__copy">© 2026 Elijah S Shmakov</span>
        <span className="footer__links">
          <a href="/privacy/">{f.privacy}</a>
          <a href="/#consent">{f.consent}</a>
          <a href="/rss.xml">RSS</a>
          <a href="https://my.idot.vip/geminishkv" target="_blank" rel="noreferrer">{n.nfcCard}</a>
        </span>
        <span className="footer__tagline">AppSecTA</span>
      </div>
    </footer>
  );
}
