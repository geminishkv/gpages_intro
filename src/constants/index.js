export const MAC_IMG   = process.env.PUBLIC_URL + '/img/hero/mac_ns.png';
export const LOGO_IMG  = process.env.PUBLIC_URL + '/img/hero/logo2.png';
export const WIN_IMG   = process.env.PUBLIC_URL + '/img/hero/window3.png';
export const UWU_IMG   = process.env.PUBLIC_URL + '/img/hero/uwu.png';
export const AVATAR_IMG = process.env.PUBLIC_URL + '/img/hero/avatar.jpg';
export const LIDER_IMG = process.env.PUBLIC_URL + '/img/badges/lider.png';
export const LANIT_IMG = process.env.PUBLIC_URL + '/img/badges/lanit.png';
export const BMSTU_IMG = process.env.PUBLIC_URL + '/img/badges/bmstu.png';
export const MPFI_IMG  = process.env.PUBLIC_URL + '/img/badges/mpfi.png';
export const RBPO_IMG  = process.env.PUBLIC_URL + '/img/badges/rbpo.png';

export const TITLE_TEXT    = 'geminishkv';
export const SUBTITLE_TEXT = 'AppSec & DevSecOps';
export const TAGLINE_TEXT  = 'Sic Parvis Magna. Auxilio Divino';

export const STATS = [
  { value: 8,  suffix: '+', label: 'Лет в ИБ'        },
  { value: 6,  suffix: '',  label: 'Компании'         },
  { value: 23, suffix: '+', label: 'Сертификатов'     },
  { value: 5,  suffix: '+', label: 'Open-Source'      },
  { value: 13, suffix: '+', label: 'Благодарностей'   },
];

export const EXPERIENCE = [
  {
    company: 'LANIT',
    role:    'AppSec Team Lead',
    url:     'https://lanit.ru',
    logo:    process.env.PUBLIC_URL + '/img/companies/lanit.png',
    period:  'Дек 2024 — н.в.',
    current: true,
  },
  {
    company:    'Росбанк / ТБанк',
    role:       'Заместитель начальника отдела ИБ по рискам',
    logoColor:  true,
    logos: [
      { src: process.env.PUBLIC_URL + '/img/companies/rosbank.svg', alt: 'Росбанк', url: 'https://www.rosbank.ru' },
      { src: process.env.PUBLIC_URL + '/img/companies/tbank.png',   alt: 'ТБанк',   url: 'https://www.tbank.ru'  },
    ],
    period:  'Июн 2022 — Дек 2024',
    current: false,
  },
  {
    company:  'EMCD Tech',
    role:     'Директор по информационной безопасности',
    url:      'https://emcd.io',
    logo:     process.env.PUBLIC_URL + '/img/companies/emcd.jpg',
    logoInvert: true,
    period:    'Янв 2022 — Июл 2022',
    current:   false,
  },
  {
    company:   'SUNLIGHT',
    role:      'Зам. директора по информационной безопасности',
    url:       'https://sunlight.net',
    logo:      process.env.PUBLIC_URL + '/img/companies/sunlight.jpg',
    logoColor: true,
    period:    'Дек 2020 — Авг 2021',
    current:   false,
  },
  {
    company: 'Poly Play Inc',
    role:    'Senior IS Specialist (Lead)',
    url:     '#',
    logo:    process.env.PUBLIC_URL + '/img/companies/polyplay.svg',
    period:  'Янв 2020 — Дек 2020',
    current: false,
  },
  {
    company: 'Weter IT',
    role:    'Senior IS Specialist',
    url:     '#',
    logo:    process.env.PUBLIC_URL + '/img/companies/weter.png',
    period:    'Апр 2019 — Янв 2020',
    current:   false,
  },
];

export const DOMAINS = [
  'Application Security', 'DevSecOps', 'Threat Modeling',
  'Vulnerability Management', 'Supply Chain Security', 'Architecture Security Review',
  'API Security', 'Mobile AppSec', 'Payment Systems Security', 'GRC', 'Secure SDLC', 'DevOps',
];

export const PROJECTS = [
  {
    name: 'oss_toolchainmap',
    desc: 'Карта инструментов AppSec — помогает выбрать оптимальное решение под любую ситуацию: нет бюджета, нет ресурсов для интеграции, нет команды.',
    lang: 'Python',
    langColor: '#3572A5',
    stars: 5,
    forks: 4,
    url: 'https://github.com/geminishkv/oss_toolchainmap',
  },
  {
    name: 'course_labs',
    desc: 'Лабораторные работы по курсам AppSec, Risk Analysis, Security Champion: Toolchain, Orchestration, CI/CD, UML и другие.',
    lang: 'Python',
    langColor: '#3572A5',
    stars: 17,
    forks: 20,
    url: 'https://github.com/geminishkv/course_labs',
  },
  {
    name: 'sbom_genformatter',
    desc: 'CLI-инструмент для генерации и форматирования SBOM (CycloneDX / SPDX) с интеграцией в CI/CD-пайплайны.',
    lang: 'Python',
    langColor: '#3572A5',
    stars: 4,
    forks: 0,
    url: 'https://github.com/geminishkv/sbom_genformatter',
  },
  {
    name: 'semgrep_java_custom_ruleset',
    desc: 'Кастомные правила Semgrep для Java на базе OWASP TOP 10, обёрнутые в Makefile для автономного запуска.',
    lang: 'Shell',
    langColor: '#89e051',
    stars: 1,
    forks: 0,
    url: 'https://github.com/geminishkv/semgrep_java_custom_ruleset',
  },
  {
    name: 'geoip-tool',
    desc: 'Мини-утилита GeoIP-lookup из терминала и плагин для Burp Suite. Работает через curl + jq без ключей API.',
    lang: 'Shell',
    langColor: '#89e051',
    stars: 4,
    forks: 1,
    url: 'https://github.com/geminishkv/geoip-tool',
  },
];

export const CERTS = [
  { area: 'Otus',                        title: 'Внедрение и работа в DevSecOps' },
  { area: 'CyberED',                     title: 'Безопасность веб-приложений и обнаружение угроз на основе OWASP TOP 10' },
  { area: 'Kaspersky Academy',            title: 'Корпоративная информационная безопасность' },
  { area: 'Informzashita',               title: 'Безопасность веб-приложений' },
  { area: 'УЦ «Специалист», МГТУ',       title: 'Безопасность систем, сервисов и сетей в DevOps' },
  { area: 'УЦ «Специалист», МГТУ',       title: 'DevOps Professional' },
  { area: 'УЦ «Специалист», МГТУ',       title: 'DevOps-инженер' },
  { area: 'УЦ «Специалист», МГТУ',       title: 'Team Lead в разработке ПО' },
  { area: 'УЦ «Специалист», МГТУ',       title: 'DASA DevOps Product Owner' },
  { area: 'УЦ «Специалист», МГТУ',       title: 'DASA DevOps Practitioner' },
  { area: 'УЦ «Специалист», МГТУ',       title: 'Agile — Scrum Management' },
  { area: 'УЦ «Специалист», МГТУ',       title: 'Scrum Master' },
  { area: 'УЦ «Специалист», МГТУ',       title: 'Zabbix: мониторинг ИТ-инфраструктуры предприятия' },
  { area: 'УЦ «Специалист», МГТУ',       title: 'Построение отказоустойчивых кластерных решений' },
  { area: 'УЦ «Специалист», МГТУ',       title: 'Microsoft Azure: введение' },
  { area: 'УЦ «Специалист», МГТУ',       title: 'Администрирование сервисов и сетей' },
];
