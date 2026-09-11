import '../styles/SectionHead.css';
import GlitchLabel from './GlitchLabel';

// One header pattern for every section: mono eyebrow in code-comment style, display
// title (keeps the glitch typewriter), optional subtitle, extras and an action link.
export default function SectionHead({ eyebrow, title, sub, action, children }) {
  return (
    <div className="sec-head">
      <div className="sec-head__main">
        {eyebrow && <span className="sec-head__eyebrow">{`// ${eyebrow}`}</span>}
        <h2 className="sec-head__title"><GlitchLabel text={title} /></h2>
        {sub && <p className="sec-head__sub">{sub}</p>}
        {children}
      </div>
      {action && (
        <a
          className="sec-head__action"
          href={action.href}
          target={action.external ? '_blank' : undefined}
          rel={action.external ? 'noreferrer' : undefined}
        >
          {action.label} <b>{action.external ? '↗' : '→'}</b>
        </a>
      )}
    </div>
  );
}
