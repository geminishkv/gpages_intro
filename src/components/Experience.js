import { useEffect, useState } from 'react';
import '../styles/Experience.css';
import { useLang } from '../context/LangContext';
import SectionHead from './SectionHead';
import { RESUME_URL } from '../constants';

// First year in a period string ("Апр 2019 — Янв 2020" → 2019).
const yearOf = (period) => (period.match(/\d{4}/) || [''])[0];

function Node({ item }) {
  const logos = item.logos ?? [{ src: item.logo, alt: item.company, url: item.url, round: item.logoRound }];
  // White marks (Poly Play, the Rosbank wordmark) need a dark disc; everything else
  // sits on white. A logo flagged `pill` gets its own white pill inside a dark disc.
  const dark = item.logoLight || logos.length > 1;
  const cls = `pipe__node${dark ? ' pipe__node--dark' : ''}${logos.length > 1 ? ' pipe__node--pair' : ''}`;
  return (
    <div className={cls}>
      {logos.map((l, j) => {
        const linkCls = `pipe__logo-link${l.pill ? ' pipe__logo-link--pill' : ''}`;
        const imgCls = `pipe__logo${l.round ? ' pipe__logo--round' : ''}`;
        return l.url ? (
          <a key={j} href={l.url} target="_blank" rel="noreferrer" className={linkCls} aria-label={l.alt}>
            <img src={l.src} alt="" className={imgCls} />
          </a>
        ) : (
          <span key={j} className={linkCls}><img src={l.src} alt={l.alt} className={imgCls} /></span>
        );
      })}
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

// Results of one stage, under the pipe. Hovering, focusing or tapping a node switches it.
function Results({ item, head }) {
  const items = item.results ?? [];
  return (
    <div className="gp-res" key={item.company}>
      <div className="gp-res__head">
        <span className="gp-res__eyebrow">{`// ${head.results}`}</span>
        <h3 className="gp-res__title">{item.company}</h3>
        <span className="gp-res__meta">{item.role} · {item.period}</span>
      </div>
      {items.length ? (
        <ul className="gp-res__list">
          {items.map((x, i) => <li key={i} style={{ '--i': i }}>{x}</li>)}
        </ul>
      ) : (
        <p className="gp-res__empty">{head.resultsEmpty}</p>
      )}
    </div>
  );
}

export default function Experience() {
  const { t } = useLang();
  const head = t.sectionHead.experience;
  // Oldest first: the pipe flows left to right, the current role is the last node.
  const stages = [...t.experience].reverse();
  const currentIndex = Math.max(0, stages.findIndex((s) => s.current));
  const [active, setActive] = useState(currentIndex);

  // language switch rebuilds the list; keep the same stage selected
  useEffect(() => { setActive((a) => Math.min(a, stages.length - 1)); }, [stages.length]);

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
          <li
            key={i}
            className={`pipe__st${item.current ? ' pipe__st--now' : ''}${active === i ? ' is-hover' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
          >
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
      <Results item={stages[active]} head={head} />
    </section>
  );
}
