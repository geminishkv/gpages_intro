import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/AboutModal.css';
import { AVATAR_IMG, CERTS } from '../constants';

const TABS = ['Профиль', 'Навыки', 'Достижения', 'Сертификаты'];

const SEC_TOOLS = [
  { label: 'SAST',            items: ['Semgrep', 'SonarQube', 'Checkov', 'cqase', 'Bandit', 'BlackDuck', 'Fortify'] },
  { label: 'SCA',             items: ['Dependency-Check', 'Grype', 'Trivy', 'Syft', 'Cycode', 'Clair'] },
  { label: 'Secret Detection',items: ['HashiCorp Vault', 'Bitwarden', 'Senhasegura', 'OPA', 'Gitleaks', 'Keycloak'] },
  { label: 'DAST',            items: ['Acunetix', 'Nuclei', 'Burp Suite', 'AutoSwagger', 'Checkmarx'] },
  { label: 'Mobile AppSec',   items: ['Frida', 'MobSF', 'QARK'] },
  { label: 'Infrasec',        items: ['Nmap', 'MaxPatrol', 'Akto'] },
  { label: 'Container & Image',items: ['Qualys', 'Cilium', 'Harbor', 'Falco', 'Quay', 'Dagda', 'Prisma', 'Cosign'] },
  { label: 'SBOM',            items: ['cdxgen', 'RetireJS', 'Sonatype'] },
];

const DEV_TOOLS = [
  { label: 'DevOps',       items: ['Git', 'GitLab CI/CD', 'Jenkins', 'Docker', 'Kubernetes', 'Helm', 'Makefile', 'WSO2'] },
  { label: 'Мониторинг',   items: ['Grafana', 'Zabbix'] },
  { label: 'Языки & стеки',items: ['Python', 'Java', 'JavaScript', 'React', 'Swift', 'LaTeX', 'Bash'] },
];

const DOMAINS = [
  'Application Security', 'DevSecOps', 'DevOps', 'Threat Modeling',
  'Vulnerability Management', 'Supply Chain Security', 'Architecture Security Review',
  'API Security', 'Mobile AppSec', 'Payment Systems Security', 'GRC', 'Secure SDLC',
];

function Chips({ items }) {
  return (
    <div className="about-chips">
      {items.map(item => <span key={item} className="about-chip">{item}</span>)}
    </div>
  );
}

function TabProfile() {
  return (
    <div className="about-tab-content">
      <p className="about-meta">
        Москва, Россия
        <span className="about-meta__dot">·</span>
        Открыт к релокации и командировкам
      </p>

      <div className="about-info">
        <div className="about-info__item">
          <span className="about-info__label">Желаемые роли</span>
          <span className="about-info__value">
            DevSecOps Team Lead · AppSec Team Lead · Руководитель ОИБ · CTO
          </span>
        </div>
        <div className="about-info__item">
          <span className="about-info__label">Занятость</span>
          <span className="about-info__value">Полная или проектная</span>
        </div>
        <div className="about-info__item">
          <span className="about-info__label">Формат работы</span>
          <span className="about-info__value">Гибридный или удалённый</span>
        </div>
        <div className="about-info__item">
          <span className="about-info__label">Языки</span>
          <span className="about-info__value">Русский (родной) · Английский (Intermediate)</span>
        </div>
      </div>

      <div className="about-section">
        <div className="about-section__title">Профессиональное резюме</div>
        <ul className="about-section__list">
          <li>Руководитель с опытом построения функции безопасности приложений с нуля в enterprise и fintech среде (банкинг, крипто)</li>
          <li>Проектирует и внедряет Secure SDLC: интеграция SAST, SCA, DAST, сканирования контейнеров и секретов в CI/CD, программы Security Champions, риск-ориентированное устранение уязвимостей</li>
          <li>Сильный бэкграунд в управлении рисками ИБ и комплаенсе (PCI DSS, КИИ, финтех-стандарты), доказанный баланс между безопасностью и скоростью выхода на рынок</li>
        </ul>
      </div>
    </div>
  );
}

function TabSkills() {
  return (
    <div className="about-tab-content">
      <div className="about-section">
        <div className="about-section__title">Инструменты безопасности</div>
        {SEC_TOOLS.map(({ label, items }) => (
          <div key={label} className="about-toolgroup">
            <span className="about-toolgroup__label">{label}</span>
            <Chips items={items} />
          </div>
        ))}
      </div>

      <div className="about-section">
        <div className="about-section__title">Технологии и DevOps</div>
        {DEV_TOOLS.map(({ label, items }) => (
          <div key={label} className="about-toolgroup">
            <span className="about-toolgroup__label">{label}</span>
            <Chips items={items} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TabAchievements() {
  return (
    <div className="about-tab-content">
      <div className="about-section">
        <div className="about-section__title">Достижения</div>
        <ul className="about-section__list">
          <li>Получил благодарственное письмо от В. Селина за значительный вклад в AppSec (SAST) в рамках сертификации ФСТЭК России по ГОСТ 71207</li>
          <li>Лидер сообщества FinDevSecOps для российского финтех-рынка</li>
          <li>Организатор первого DevSecOps-хакатона в России — продолжение серии в 2026 году</li>
          <li>
            Преподаватель безопасной разработки ПО и ИБ в ведущих технических вузах:
            <ul className="about-section__sublist">
              <li>МГТУ им. Н.Э. Баумана</li>
              <li>Московский физико-технический институт (МФТИ)</li>
            </ul>
          </li>
          <li>Автор статей и докладов по DevSecOps, безопасной разработке и практическому AppSec</li>
        </ul>
      </div>

      <div className="about-section">
        <div className="about-section__title">Основные домены</div>
        <Chips items={DOMAINS} />
      </div>
    </div>
  );
}

function TabCerts() {
  return (
    <div className="about-tab-content">
      <div className="about-certs-grid">
        {CERTS.map((c, i) => (
          <div key={i} className="about-cert">
            <span className="about-cert__area">{c.area}</span>
            <span className="about-cert__title">{c.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutModal({ isOpen, onClose }) {
  const [tab, setTab]   = useState(0);
  const modalRef        = useRef(null);
  const bodyRef         = useRef(null);

  /* закрытие по Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  /* focus trap */
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const modal    = modalRef.current;
    const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusable = [...modal.querySelectorAll(selector)];
    if (focusable.length) focusable[0].focus();

    const trap = (e) => {
      if (e.key !== 'Tab') return;
      const all   = [...modal.querySelectorAll(selector)];
      const first = all[0];
      const last  = all[all.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    };

    modal.addEventListener('keydown', trap);
    return () => modal.removeEventListener('keydown', trap);
  }, [isOpen]);

  /* сброс состояния при закрытии */
  useEffect(() => {
    if (!isOpen) {
      setTab(0);
    }
  }, [isOpen]);

  /* сброс скролла при смене таба */
  const handleTabChange = (i) => {
    setTab(i);
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  };

  return createPortal(
    <div
      className={`about-overlay${isOpen ? ' about-overlay--open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="about-modal" ref={modalRef}>

        {/* ── Header ── */}
        <div className="about-modal__header">
          <div className="about-modal__identity">
            <img src={AVATAR_IMG} alt="Elijah S. Shmakov" className="about-modal__avatar" />
            <div className="about-modal__identity-text">
              <span className="about-modal__name">Elijah S. Shmakov</span>
              <span className="about-modal__role">AppSec &amp; DevSecOps Lead</span>
            </div>
          </div>
          <button className="about-modal__close" onClick={onClose} aria-label="Закрыть">✕</button>
        </div>

        {/* ── Tabs ── */}
        <div className="about-tabs" role="tablist">
          {TABS.map((t, i) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === i}
              className={`about-tab${tab === i ? ' about-tab--active' : ''}`}
              onClick={() => handleTabChange(i)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ── Body ── */}
        <div className="about-modal__body" ref={bodyRef} role="tabpanel">
          {tab === 0 && <TabProfile />}
          {tab === 1 && <TabSkills />}
          {tab === 2 && <TabAchievements />}
          {tab === 3 && <TabCerts />}
        </div>

      </div>
    </div>,
    document.body
  );
}
