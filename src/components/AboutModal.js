import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import '../styles/AboutModal.css';

export default function AboutModal({ isOpen, onClose }) {
  /* закрытие по Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <div
      className={`about-overlay${isOpen ? ' about-overlay--open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="about-modal">

        {/* ── Header ── */}
        <div className="about-modal__header">
          <span className="about-modal__title">About</span>
          <button className="about-modal__close" onClick={onClose} aria-label="Закрыть">✕</button>
        </div>

        {/* ── Body ── */}
        <div className="about-modal__body">

          {/* Локация */}
          <p className="about-meta">
            Москва, Россия
            <span className="about-meta__dot">·</span>
            Открыт к релокации и командировкам
          </p>

          {/* Ключевые параметры */}
          <div className="about-info">
            <div className="about-info__item">
              <span className="about-info__label">Желаемые роли</span>
              <span className="about-info__value">
                DevSecOps Team Lead · AppSec Team Lead ·
                Руководитель ОИБ · CTO в командах с фокусом на безопасность
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

          {/* Профессиональное резюме */}
          <div className="about-section">
            <div className="about-section__title">Профессиональное резюме</div>
            <ul className="about-section__list">
              <li>Руководитель с опытом построения функции безопасности приложений с нуля в enterprise и fintech среде (банкинг, крипто)</li>
              <li>Проектирует и внедряет Secure SDLC: интеграция SAST, SCA, DAST, сканирования контейнеров и секретов в CI/CD, программы security champions, риск-ориентированное устранение уязвимостей</li>
              <li>Сильный бэкграунд в управлении рисками ИБ и комплаенсе (PCI DSS, КИИ, финтех-стандарты), доказанный баланс между безопасностью и скоростью выхода на рынок</li>
            </ul>
          </div>

          {/* Домены */}
          <div className="about-section">
            <div className="about-section__title">Основные навыки — домены</div>
            <ul className="about-section__list">
              <li>Application Security, DevSecOps, DevOps, моделирование угроз</li>
              <li>Vulnerability Management, проектирование архитектуры приложений, безопасность цепочки поставок</li>
              <li>Анализ безопасности архитектур (web, mobile, API, микросервисы), проектирование защиты платёжных и крипто-систем</li>
              <li>Governance, Risk &amp; Compliance (SGRC / IRM), разработка политик и стандартов ИБ, защита коммерческой тайны и ключевых продуктов</li>
            </ul>
          </div>

          {/* Инструменты безопасности */}
          <div className="about-section">
            <div className="about-section__title">Инструменты безопасности</div>
            <div className="about-tools">
              <div className="about-tools__row">
                <span className="about-tools__label">SAST</span>
                <span className="about-tools__value">semgrep, sonarqube, checkov, cqase, bandit, blackduck, fortify</span>
              </div>
              <div className="about-tools__row">
                <span className="about-tools__label">SCA</span>
                <span className="about-tools__value">dependency-check, grype, trivy, syft, cycode, clair</span>
              </div>
              <div className="about-tools__row">
                <span className="about-tools__label">Secret Detection</span>
                <span className="about-tools__value">hashicorp vault, bitwarden, senhasegura, OPA, gitleaks, keycloak</span>
              </div>
              <div className="about-tools__row">
                <span className="about-tools__label">DAST</span>
                <span className="about-tools__value">acunetix, nuclei, burpsuite, autoswagger, checkmarx</span>
              </div>
              <div className="about-tools__row">
                <span className="about-tools__label">Mobile AppSec</span>
                <span className="about-tools__value">frida, MobSF, QARK (Android / iOS)</span>
              </div>
              <div className="about-tools__row">
                <span className="about-tools__label">Infrasec</span>
                <span className="about-tools__value">nmap, maxpatrol, akto</span>
              </div>
              <div className="about-tools__row">
                <span className="about-tools__label">Container &amp; Image</span>
                <span className="about-tools__value">qualys, cilium (CNI), harbor, falco, quay, dagda, prisma, cosign</span>
              </div>
              <div className="about-tools__row">
                <span className="about-tools__label">SBOM</span>
                <span className="about-tools__value">cdxgen, retirejs, sonatype</span>
              </div>
            </div>
          </div>

          {/* Технологии */}
          <div className="about-section">
            <div className="about-section__title">Технологии и инструменты</div>
            <div className="about-tools">
              <div className="about-tools__row">
                <span className="about-tools__label">DevOps</span>
                <span className="about-tools__value">Git, GitLab CI/CD, Jenkins, Docker / Docker Swarm, Kubernetes, Helm, Makefile, bash/sh, пакетные реестры, WSO2, API-шлюзы</span>
              </div>
              <div className="about-tools__row">
                <span className="about-tools__label">Мониторинг</span>
                <span className="about-tools__value">Grafana, Zabbix, кастомные дашборды инфраструктуры и состояния безопасности, IRM-системы</span>
              </div>
              <div className="about-tools__row">
                <span className="about-tools__label">Стеки</span>
                <span className="about-tools__value">Java, Python, JavaScript, React, Swift (junior strong), LaTeX</span>
              </div>
            </div>
          </div>

          {/* Достижения */}
          <div className="about-section">
            <div className="about-section__title">Достижения</div>
            <ul className="about-section__list">
              <li>Получил благодарственное письмо от В. Селина за значительный вклад в деятельность по безопасности приложений (SAST) в рамках процесса сертификации ФСТЭК России по ГОСТ 71207</li>
              <li>Руководитель сообщества FinDevSecOps для российского финтех-рынка</li>
              <li>Организатор первого DevSecOps-хакатона в России — и продолжение серии в 2026 году</li>
              <li>
                Преподаватель безопасной разработки программного обеспечения и информационной безопасности в ведущих технических вузах:
                <ul className="about-section__sublist">
                  <li>МГТУ им. Н.Э. Баумана</li>
                  <li>Московский физико-технический институт (МФТИ)</li>
                </ul>
              </li>
              <li>Автор статей и докладов по DevSecOps, безопасной разработке и практическому AppSec</li>
            </ul>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
