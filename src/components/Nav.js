import { LOGO_IMG } from '../constants';

export default function Nav({ navRef }) {
  return (
    <nav ref={navRef} className="nav" style={{ opacity: 0 }}>
      <div className="nav__logo">
        <img src={LOGO_IMG} alt="logo" className="nav__logo-img" />
        <span className="nav__brand">geminishkv</span>
      </div>
      <div className="nav__links">
        <a href="#about">ABOUT</a>
        <a href="https://my.idot.vip/geminishkv" target="_blank" rel="noreferrer">NFC CARD</a>
        <a href="https://t.me/shmakovis_appsec" target="_blank" rel="noreferrer">BLOG</a>
        <a href="https://www.instagram.com/geminishkv" target="_blank" rel="noreferrer">INSTAGRAM</a>
        <a href="https://www.linkedin.com/in/geminishkvdev/" target="_blank" rel="noreferrer">LINKEDIN</a>
      </div>
    </nav>
  );
}
