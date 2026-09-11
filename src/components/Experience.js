import '../styles/Experience.css';
import { useLang } from '../context/LangContext';
import SectionHead from './SectionHead';
import { RESUME_URL } from '../constants';

// First year in a period string ("Апр 2019 — Янв 2020" → 2019).
const yearOf = (period) => (period.match(/\d{4}/) || [''])[0];

function logoClass(item) {
  // Company marks are dark or coloured and sit on a white node as they are;
  // the few white marks (logoLight) get inverted.
  if (item.logoLight) return 'pipe__logo pipe__logo--light';
  return 'pipe__logo';
}

function Node({ item }) {
  const logos = item.logos ?? [{ src: item.logo, alt: item.company, url: item.url }];
  const cls = logoClass(item);
  return (
    <div className={`pipe__node${logos.length > 1 ? ' pipe__node--pair' : ''}`}>
      {logos.map((l, j) => l.url ? (
        <a key={j} href={l.url} target="_blank" rel="noreferrer" className="pipe__logo-link" aria-label={l.alt}>
          <img src={l.src} alt="" className={cls} />
        </a>
      ) : (
        <img key={j} src={l.src} alt={l.alt} className={cls} />
      ))}
    </div>
  );
}

function Company({ item }) {
  if (item.logos) {
    return (
      <span className="pipe__company">
        {item.logos.map((l, j) => (
          <span key={j}>
            {j > 0 && <span className="pipe__slash"> / </span>}
            <a href={l.url} target="_blank" rel="noreferrer">{l.alt}</a>
          </span>
        ))}
      </span>
    );
  }
  return item.url
    ? <span className="pipe__company"><a href={item.url} target="_blank" rel="noreferrer">{item.company}</a></span>
    : <span className="pipe__company">{item.company}</span>;
}

export default function Experience() {
  const { t } = useLang();
  const head = t.sectionHead.experience;
  // Oldest first: the pipe flows left to right, the current role is the last node.
  const stages = [...t.experience].reverse();

  return (
    <section className="experience">
      <SectionHead
        eyebrow={head.eyebrow}
        title={t.sections.experience}
        sub={head.sub}
        action={{ href: RESUME_URL, label: head.action, external: true }}
      />
      <ol className="pipe" aria-label={t.sections.experience}>
        {stages.map((item, i) => (
          <li key={i} className={`pipe__st${item.current ? ' pipe__st--now' : ''}`}>
            <span className="pipe__year">{yearOf(item.period)}</span>
            <Node item={item} />
            <div className="pipe__body">
              <h3 className="pipe__title">
                <Company item={item} />
                {item.current && <span className="pipe__now">{head.now}</span>}
              </h3>
              <span className="pipe__role">{item.role}</span>
              <span className="pipe__period">{item.period}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
