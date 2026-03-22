import { useState } from 'react';
import '../styles/Tools.css';
import { DOMAINS, CERTS } from '../constants';

const TOOL_GROUPS = [
  { label: 'SAST',      items: ['Semgrep', 'SonarQube', 'Checkov', 'Bandit', 'BlackDuck', 'Fortify'] },
  { label: 'SCA',       items: ['Dependency-Check', 'Grype', 'Trivy', 'Syft', 'Cycode', 'Clair'] },
  { label: 'DAST',      items: ['Acunetix', 'Nuclei', 'Burp Suite', 'AutoSwagger', 'Checkmarx'] },
  { label: 'Secrets',   items: ['HashiCorp Vault', 'Gitleaks', 'OPA', 'Bitwarden', 'Keycloak'] },
  { label: 'Container', items: ['Trivy', 'Harbor', 'Falco', 'Cosign', 'Prisma', 'Cilium', 'Quay'] },
  { label: 'Mobile',    items: ['Frida', 'MobSF', 'QARK'] },
  { label: 'SBOM',      items: ['cdxgen', 'RetireJS', 'Sonatype'] },
  { label: 'DevOps',    items: ['Docker', 'Kubernetes', 'Helm', 'GitLab CI/CD', 'Jenkins', 'WSO2'] },
];

const STACK_INITIAL  = 4;
const CERTS_INITIAL  = 4;

export default function Tools() {
  const [stackExpanded, setStackExpanded] = useState(false);
  const [certsExpanded, setCertsExpanded] = useState(false);

  const visibleGroups = stackExpanded ? TOOL_GROUPS : TOOL_GROUPS.slice(0, STACK_INITIAL);
  const visibleCerts  = certsExpanded ? CERTS       : CERTS.slice(0, CERTS_INITIAL);

  return (
    <section className="tools">

      {/* ── Domains ── */}
      <div className="tools__domains">
        <div className="tools__header">
          <span className="tools__label">Domains</span>
        </div>
        <div className="tools__domain-grid">
          {DOMAINS.map((d, i) => (
            <div key={d} className="domain-item">
              <span className="domain-item__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="domain-item__name">{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tech Stack ── */}
      <div className="tools__header tools__header--stack">
        <span className="tools__label">Tech Stack</span>
        <span className="tools__count">{TOOL_GROUPS.length} categories</span>
      </div>
      <div className="tools__grid">
        {visibleGroups.map(({ label, items }) => (
          <div key={label} className="tool-group">
            <span className="tool-group__label">{label}</span>
            <div className="tool-group__chips">
              {items.map(item => (
                <span key={item} className="tool-chip">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {!stackExpanded && TOOL_GROUPS.length > STACK_INITIAL && (
        <button className="tools__show-more" onClick={() => setStackExpanded(true)}>
          Show {TOOL_GROUPS.length - STACK_INITIAL} more categories ↓
        </button>
      )}

      {/* ── Certifications ── */}
      <div className="tools__header tools__header--stack">
        <span className="tools__label">Certifications</span>
        <span className="tools__count">{CERTS.length} total</span>
      </div>
      <div className="tools__certs-grid">
        {visibleCerts.map((c, i) => (
          <div key={i} className="cert-card">
            <span className="cert-card__area">{c.area}</span>
            <span className="cert-card__title">{c.title}</span>
          </div>
        ))}
      </div>
      {!certsExpanded && CERTS.length > CERTS_INITIAL && (
        <button className="tools__show-more" onClick={() => setCertsExpanded(true)}>
          Show {CERTS.length - CERTS_INITIAL} more certifications ↓
        </button>
      )}

    </section>
  );
}
