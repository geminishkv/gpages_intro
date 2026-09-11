import { useState } from 'react';
import '../styles/Tools.css';
import { useLang } from '../context/LangContext';
import SectionHead from './SectionHead';

/* Tool groups; the numbers are kept only to order the chips (they are no longer shown). */
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

/* Domains with an honest three-step scale instead of percentages. */
const DOMAIN_ITEMS = [
  ['Application Security', 95], ['DevSecOps', 95], ['Secure SDLC', 95],
  ['Supply Chain Security', 90], ['Vulnerability Management', 85],
  ['Architecture Security Review', 80], ['DevOps', 80],
  ['Threat Modeling', 75], ['API Security', 75],
  ['Payment Systems Security', 70], ['Mobile AppSec', 65], ['GRC', 50],
];

const STACK_INITIAL = 4;
const CERTS_INITIAL = 4;

const levelOf = (pct) => (pct >= 90 ? 'core' : pct >= 75 ? 'strong' : 'work');

function Chip({ level, children }) {
  return <span className={`chip chip--${level}`}>{children}</span>;
}

export default function Tools() {
  const [stackExpanded, setStackExpanded] = useState(false);
  const [certsExpanded, setCertsExpanded] = useState(false);
  const { t } = useLang();
  const s = t.skills;
  const CERTS = t.certs;
  const visibleGroups = stackExpanded ? TOOL_GROUPS : TOOL_GROUPS.slice(0, STACK_INITIAL);
  const visibleCerts  = certsExpanded ? CERTS       : CERTS.slice(0, CERTS_INITIAL);

  return (
    <section className="tools">
      <SectionHead eyebrow={t.sectionHead.skills.eyebrow} title={t.sections.skills} sub={t.sectionHead.skills.sub} />

      <div className="skills">
        <div className="skills__panel">
          <h3 className="skills__panel-title">{t.sections.domains}<small>{DOMAIN_ITEMS.length}</small></h3>
          <div className="chips">
            {DOMAIN_ITEMS.map(([name, pct]) => <Chip key={name} level={levelOf(pct)}>{name}</Chip>)}
          </div>
          <div className="chips-legend" aria-hidden="true">
            <span><i className="chips-legend__core" />{s.levels.core}</span>
            <span><i className="chips-legend__strong" />{s.levels.strong}</span>
            <span><i className="chips-legend__work" />{s.levels.work}</span>
          </div>
        </div>

        <div className="skills__panel">
          <h3 className="skills__panel-title">{t.sections.certifications}<small>{CERTS.length}</small></h3>
          <div className="tools__certs-grid">
            {visibleCerts.map((c, i) => (
              <div key={i} className="cert-card">
                <span className="cert-card__area">{c.area}</span>
                <span className="cert-card__title">{c.title}</span>
              </div>
            ))}
          </div>
          {!certsExpanded && CERTS.length > CERTS_INITIAL && (
            <button type="button" className="tools__show-more" onClick={() => setCertsExpanded(true)}>
              {s.moreCerts(CERTS.length - CERTS_INITIAL)}
            </button>
          )}
        </div>
      </div>

      <h3 className="skills__stack-title">{t.sections.techStack}</h3>
      <div className="stack">
        {visibleGroups.map(({ label, items }) => (
          <div key={label} className="skills__panel skills__panel--stack">
            <h3 className="skills__panel-title">{label}</h3>
            <div className="chips">
              {items.map(([name]) => <Chip key={name} level="tool">{name}</Chip>)}
            </div>
          </div>
        ))}
      </div>
      {!stackExpanded && TOOL_GROUPS.length > STACK_INITIAL && (
        <button type="button" className="tools__show-more tools__show-more--full" onClick={() => setStackExpanded(true)}>
          {s.moreGroups(TOOL_GROUPS.length - STACK_INITIAL)}
        </button>
      )}
    </section>
  );
}
