import { useState } from 'react';
import '../styles/Tools.css';
import '../styles/SkillCard.css';
import { useLang } from '../context/LangContext';
import GlitchLabel from './GlitchLabel';

/* items sorted max→min by percent */
const TOOL_GROUPS = [
  { label: 'SAST',      items: [['Semgrep',95], ['SonarQube',95], ['Checkov',95], ['Bandit',80], ['BlackDuck',70]] },
  { label: 'SCA',       items: [['Dependency-Check',95], ['Trivy',95], ['Syft',85], ['Grype',80], ['Clair',75]] },
  { label: 'DAST',      items: [['AutoSwagger',90], ['Nuclei',80], ['Burp Suite',80], ['Checkmarx',60], ['Acunetix',40]] },
  { label: 'Secrets',   items: [['HashiCorp Vault',95], ['Gitleaks',95], ['Bitwarden',95], ['Keycloak',80], ['OPA',65]] },
  { label: 'Container', items: [['Trivy',95], ['Harbor',95], ['Cosign',95], ['Cilium',80], ['Falco',70]] },
  { label: 'Mobile',    items: [['MobSF',85], ['APKTool',70], ['Frida',65], ['Objection',60], ['QARK',45]] },
  { label: 'SBOM',      items: [['cdxgen',95], ['RetireJS',95], ['Syft',85], ['Sonatype',70]] },
  { label: 'DevOps',    items: [['Docker',95], ['GitLab CI/CD',95], ['Jenkins',95], ['Helm',90], ['Kubernetes',65]] },
];

/* domains sorted max→min */
const DOMAIN_ITEMS = [
  ['Application Security', 95], ['DevSecOps', 95], ['Secure SDLC', 95],
  ['Supply Chain Security', 90], ['Vulnerability Management', 85],
  ['Architecture Security Review', 80], ['DevOps', 80],
  ['Threat Modeling', 75], ['API Security', 75],
  ['Payment Systems Security', 70], ['Mobile AppSec', 65], ['GRC', 50],
];

const STACK_INITIAL = 2;
const CERTS_INITIAL = 4;

function SkillRow({ name, percent }) {
  return (
    <div className="skill-row">
      <span className="skill-row__name">{name}</span>
      <div className="skill-row__bar">
        <div className="skill-row__fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="skill-row__pct">{percent}%</span>
    </div>
  );
}

function SkillCard({ title, items, className = '' }) {
  return (
    <div className={`skill-card${className ? ` ${className}` : ''}`}>
      <div className="skill-card__header">{title}</div>
      <div className="skill-card__body">
        {items.map(([name, pct]) => (
          <SkillRow key={name} name={name} percent={pct} />
        ))}
      </div>
    </div>
  );
}

export default function Tools() {
  const [stackExpanded, setStackExpanded] = useState(false);
  const [certsExpanded, setCertsExpanded] = useState(false);
  const { t } = useLang();
  const CERTS = t.certs;

  const visibleGroups = stackExpanded ? TOOL_GROUPS : TOOL_GROUPS.slice(0, STACK_INITIAL);
  const visibleCerts  = certsExpanded ? CERTS       : CERTS.slice(0, CERTS_INITIAL);

  return (
    <section className="tools">

      {/* ── Domains (2/4) + Tech Stack first 2 (1/4 + 1/4) ── */}
      <div className="tools__header">
        <GlitchLabel text={t.sections.domains} className="tools__label" />
        <span className="tools__sep">·</span>
        <GlitchLabel text={t.sections.techStack} className="tools__label" />
      </div>
      <div className="skill-layout">
        <SkillCard title={t.sections.domains} items={DOMAIN_ITEMS} className="skill-card--wide" />
        <div className="skill-layout__right">
          {visibleGroups.slice(0, 2).map(({ label, items }) => (
            <SkillCard key={label} title={label} items={items} />
          ))}
        </div>
      </div>

      {/* ── Remaining Tech Stack ── */}
      {visibleGroups.length > 2 && (
        <div className="skill-grid">
          {visibleGroups.slice(2).map(({ label, items }) => (
            <SkillCard key={label} title={label} items={items} />
          ))}
        </div>
      )}
      {!stackExpanded && TOOL_GROUPS.length > STACK_INITIAL && (
        <button className="skill-grid__more skill-grid__more--full" onClick={() => setStackExpanded(true)}>
          +{TOOL_GROUPS.length - STACK_INITIAL} categories ↓
        </button>
      )}

      {/* ── Certifications ── */}
      <div className="tools__header tools__header--stack">
        <GlitchLabel text={t.sections.certifications} className="tools__label" />
        <span className="tools__count">{CERTS.length} total</span>
      </div>
      <div className="tools__certs-grid">
        {visibleCerts.map((c, i) => (
          <div key={i} className="cert-card">
            <span className="cert-card__area">{c.area}</span>
            <span className="cert-card__title">{c.title}</span>
          </div>
        ))}
        {!certsExpanded && CERTS.length > CERTS_INITIAL && (
          <button className="tools__show-more" onClick={() => setCertsExpanded(true)}>
            Show {CERTS.length - CERTS_INITIAL} more certifications ↓
          </button>
        )}
      </div>

    </section>
  );
}
