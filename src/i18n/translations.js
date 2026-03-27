const PUBLIC = process.env.PUBLIC_URL;

export const translations = {
  ru: {
    locale: 'ru-RU',

    hero: {
      contentLabel: 'Контент',
      contactsLabel: 'Контакты',
    },

    about: {
      tabs: ['Профиль', 'Достижения'],
      closeLabel: 'Закрыть',
      profile: {
        location: 'Москва, Россия',
        relocation: 'Открыт к релокации и командировкам',
        rolesLabel: 'Желаемые роли',
        rolesValue: 'DevSecOps Team Lead · AppSec Team Lead · Руководитель ОИБ · CTO',
        employmentLabel: 'Занятость',
        employmentValue: 'Полная или проектная',
        formatLabel: 'Формат работы',
        formatValue: 'Гибридный или удалённый',
        languagesLabel: 'Языки',
        languagesValue: 'Русский (родной) · Английский (Intermediate)',
        summaryTitle: 'Профессиональное резюме',
        summary: [
          'Руководитель с опытом построения функции безопасности приложений с нуля в enterprise и fintech среде (банкинг, крипто)',
          'Проектирует и внедряет Secure SDLC: интеграция SAST, SCA, DAST, сканирования контейнеров и секретов в CI/CD, программы Security Champions, риск-ориентированное устранение уязвимостей',
          'Сильный бэкграунд в управлении рисками ИБ и комплаенсе (PCI DSS, КИИ, финтех-стандарты), доказанный баланс между безопасностью и скоростью выхода на рынок',
        ],
      },
      achievements: {
        title: 'Достижения',
        items: [
          { text: 'Получил благодарственное письмо от В. Селина за значительный вклад в AppSec (SAST) в рамках сертификации ФСТЭК России по ГОСТ 71207' },
          { text: 'Лидер сообщества FinDevSecOps для российского финтех-рынка' },
          { text: 'Организатор первого DevSecOps-хакатона в России — продолжение серии в 2026 году' },
          {
            text: 'Преподаватель безопасной разработки ПО и ИБ в ведущих технических вузах:',
            sub: ['МГТУ им. Н.Э. Баумана', 'Московский физико-технический институт (МФТИ)'],
          },
          { text: 'Автор статей и докладов по DevSecOps, безопасной разработке и практическому AppSec' },
        ],
      },
    },

    stats: [
      { value: 8,  suffix: '+', label: 'AppSec & DevSecOps' },
      { value: 6,  suffix: '',  label: 'Компаний' },
      { value: 23, suffix: '+', label: 'Сертификата' },
      { value: 5,  suffix: '+', label: 'Open-Source Проектов' },
      { value: 13, suffix: '+', label: 'Благодарностей' },
    ],

    experience: [
      {
        company: 'LANIT', role: 'AppSec Team Lead',
        url: 'https://lanit.ru',
        logo: PUBLIC + '/img/companies/lanit.png',
        period: 'Дек 2024 — н.в.', current: true,
      },
      {
        company: 'Росбанк / ТБанк',
        role: 'Заместитель начальника отдела ИБ по рискам',
        logoColor: true,
        logos: [
          { src: PUBLIC + '/img/companies/rosbank.svg', alt: 'Росбанк', url: 'https://www.rosbank.ru' },
          { src: PUBLIC + '/img/companies/tbank.png',   alt: 'ТБанк',   url: 'https://www.tbank.ru' },
        ],
        period: 'Июн 2022 — Дек 2024', current: false,
      },
      {
        company: 'EMCD Tech',
        role: 'Директор по информационной безопасности',
        url: 'https://emcd.io',
        logo: PUBLIC + '/img/companies/emcd.jpg',
        logoInvert: true,
        period: 'Янв 2022 — Июл 2022', current: false,
      },
      {
        company: 'SUNLIGHT',
        role: 'Зам. директора по информационной безопасности',
        url: 'https://sunlight.net',
        logo: PUBLIC + '/img/companies/sunlight.jpg',
        logoColor: true,
        period: 'Дек 2020 — Авг 2021', current: false,
      },
      {
        company: 'Poly Play Inc', role: 'Senior IS Specialist (Lead)',
        url: 'https://alfabravo.us/',
        logo: PUBLIC + '/img/companies/polyplay.svg',
        period: 'Янв 2020 — Дек 2020', current: false,
      },
      {
        company: 'Weter IT', role: 'Senior IS Specialist',
        url: 'https://weter.denistia.ru/ru/',
        logo: PUBLIC + '/img/companies/weter.png',
        period: 'Апр 2019 — Янв 2020', current: false,
      },
    ],

    projects: [
      {
        name: 'oss_toolchainmap',
        desc: 'Карта инструментов AppSec — помогает выбрать оптимальное решение под любую ситуацию: нет бюджета, нет ресурсов для интеграции, нет команды.',
        lang: 'Python', langColor: '#3572A5', stars: 5, forks: 4,
        url: 'https://github.com/geminishkv/oss_toolchainmap',
      },
      {
        name: 'course_labs',
        desc: 'Лабораторные работы по курсам AppSec, Risk Analysis, Security Champion: Toolchain, Orchestration, CI/CD, UML и другие.',
        lang: 'Python', langColor: '#3572A5', stars: 17, forks: 20,
        url: 'https://github.com/geminishkv/course_labs',
      },
      {
        name: 'sbom_genformatter',
        desc: 'CLI-инструмент для генерации и форматирования SBOM (CycloneDX / SPDX) с интеграцией в CI/CD-пайплайны.',
        lang: 'Python', langColor: '#3572A5', stars: 4, forks: 0,
        url: 'https://github.com/geminishkv/sbom_genformatter',
      },
      {
        name: 'semgrep_java_custom_ruleset',
        desc: 'Кастомные правила Semgrep для Java на базе OWASP TOP 10, обёрнутые в Makefile для автономного запуска.',
        lang: 'Shell', langColor: '#89e051', stars: 1, forks: 0,
        url: 'https://github.com/geminishkv/semgrep_java_custom_ruleset',
      },
      {
        name: 'geoip-tool',
        desc: 'Мини-утилита GeoIP-lookup из терминала и плагин для Burp Suite. Работает через curl + jq без ключей API.',
        lang: 'Shell', langColor: '#89e051', stars: 4, forks: 1,
        url: 'https://github.com/geminishkv/geoip-tool',
      },
    ],

    certs: [
      { area: 'Otus',                   title: 'Внедрение и работа в DevSecOps' },
      { area: 'CyberED',                title: 'Безопасность веб-приложений и обнаружение угроз на основе OWASP TOP 10' },
      { area: 'Kaspersky Academy',       title: 'Корпоративная информационная безопасность' },
      { area: 'Informzashita',          title: 'Безопасность веб-приложений' },
      { area: 'УЦ «Специалист», МГТУ',  title: 'Безопасность систем, сервисов и сетей в DevOps' },
      { area: 'УЦ «Специалист», МГТУ',  title: 'DevOps Professional' },
      { area: 'УЦ «Специалист», МГТУ',  title: 'DevOps-инженер' },
      { area: 'УЦ «Специалист», МГТУ',  title: 'Team Lead в разработке ПО' },
      { area: 'УЦ «Специалист», МГТУ',  title: 'DASA DevOps Product Owner' },
      { area: 'УЦ «Специалист», МГТУ',  title: 'DASA DevOps Practitioner' },
      { area: 'УЦ «Специалист», МГТУ',  title: 'Agile — Scrum Management' },
      { area: 'УЦ «Специалист», МГТУ',  title: 'Scrum Master' },
      { area: 'УЦ «Специалист», МГТУ',  title: 'Zabbix: мониторинг ИТ-инфраструктуры предприятия' },
      { area: 'УЦ «Специалист», МГТУ',  title: 'Построение отказоустойчивых кластерных решений' },
      { area: 'УЦ «Специалист», МГТУ',  title: 'Microsoft Azure: введение' },
      { area: 'УЦ «Специалист», МГТУ',  title: 'Администрирование сервисов и сетей' },
    ],

    videos: [
      {
        label: 'Podcast',
        title: 'Подкаст по безопасной разработке',
        url: 'https://www.youtube.com/watch?v=LifFzjdvGTc',
        thumb: PUBLIC + '/img/yt_preroll/LifFzjdvGTc.jpg',
      },
      {
        label: 'Interview',
        title: 'Интервью с ассоциацией BISA по безопасной разработке ПО',
        url: 'https://youtu.be/sPGhWWaWUdE',
        thumb: PUBLIC + '/img/yt_preroll/sPGhWWaWUdE.jpg',
        thumbZoom: true,
      },
    ],

    gaming: {
      igRead: 'Смотреть →',
      igPersonalProfile: 'Личный профиль',
      igGo: 'Перейти →',
      watchBtn: 'Смотреть →',
    },

    blog: {
      langNote: '',
      readBtn: 'Читать →',
      openTelegram: 'Открыть в Telegram',
      ctaSub: 'Авторский канал про AppSec и DevSecOps',
      subscribeBtn: 'Подписаться →',
      showMore: (n) => `Показать ещё ${n} ↓`,
      subscribersFmt: (n) => {
        const mod10 = n % 10;
        const mod100 = n % 100;
        if (mod100 >= 11 && mod100 <= 19) return `${n} подписчиков`;
        if (mod10 === 1) return `${n} подписчик`;
        if (mod10 >= 2 && mod10 <= 4) return `${n} подписчика`;
        return `${n} подписчиков`;
      },
    },

    notice: {
      ariaLabel: 'Уведомление',
      title: 'Уведомление',
      paragraphs: [
        'Вся информация в материалах данного профиля, а также материалов включенных (согласно применимым формулировкам действующего законодательства РФ), то есть любые текстовых, графических произведений, — рассматривается исключительно в ознакомительных целях.',
        'Любое использование представленной информации посредством данного профиля и/или любых текстовых, графических произведений, на практике без получения предварительного согласования на использование, подпадает под действие действующего законодательства РФ.',
        'Автор не несет ответственности за любой возможный вред, причиненный предоставляемыми материалами, как любыми текстовыми, графическими произведениями.',
        'Любые текстовые, графические произведения, включая ссылки носят ознакомительный характер в цели поделиться знаниями в продуктовой безопасности.',
      ],
      dismiss: 'Понятно',
    },
  },

  en: {
    locale: 'en-US',

    hero: {
      contentLabel: 'Content',
      contactsLabel: 'Contacts',
    },

    about: {
      tabs: ['Profile', 'Achievements'],
      closeLabel: 'Close',
      profile: {
        location: 'Moscow, Russia',
        relocation: 'Open to relocation and business trips',
        rolesLabel: 'Target roles',
        rolesValue: 'DevSecOps Team Lead · AppSec Team Lead · Head of IS · CTO',
        employmentLabel: 'Employment',
        employmentValue: 'Full-time or contract',
        formatLabel: 'Work format',
        formatValue: 'Hybrid or remote',
        languagesLabel: 'Languages',
        languagesValue: 'Russian (native) · English (Intermediate)',
        summaryTitle: 'Professional Summary',
        summary: [
          'Leader with experience building application security from scratch in enterprise and fintech environments (banking, crypto)',
          'Designs and implements Secure SDLC: integrating SAST, SCA, DAST, container and secret scanning into CI/CD, Security Champions programs, risk-based vulnerability remediation',
          'Strong background in IS risk management and compliance (PCI DSS, CII, fintech standards), proven balance between security and speed to market',
        ],
      },
      achievements: {
        title: 'Achievements',
        items: [
          { text: 'Received a letter of commendation from V. Selin for significant contribution to AppSec (SAST) in the FSTEC Russia certification under GOST 71207' },
          { text: 'Leader of the FinDevSecOps community for the Russian fintech market' },
          { text: 'Organizer of the first DevSecOps hackathon in Russia — series continuation in 2026' },
          {
            text: 'Lecturer on secure software development and IS at leading technical universities:',
            sub: ['Bauman Moscow State Technical University (BMSTU)', 'Moscow Institute of Physics and Technology (MIPT / PhysTech)'],
          },
          { text: 'Author of articles and talks on DevSecOps, secure development, and practical AppSec' },
        ],
      },
    },

    stats: [
      { value: 8,  suffix: '+', label: 'AppSec & DevSecOps' },
      { value: 6,  suffix: '',  label: 'Companies' },
      { value: 23, suffix: '+', label: 'Certificates' },
      { value: 5,  suffix: '+', label: 'Open-Source Projects' },
      { value: 13, suffix: '+', label: 'Acknowledgements' },
    ],

    experience: [
      {
        company: 'LANIT', role: 'AppSec Team Lead',
        url: 'https://lanit.ru',
        logo: PUBLIC + '/img/companies/lanit.png',
        period: 'Dec 2024 — present', current: true,
      },
      {
        company: 'Rosbank / TBank',
        role: 'Deputy Head of IS Risk Department',
        logoColor: true,
        logos: [
          { src: PUBLIC + '/img/companies/rosbank.svg', alt: 'Rosbank', url: 'https://www.rosbank.ru' },
          { src: PUBLIC + '/img/companies/tbank.png',   alt: 'TBank',   url: 'https://www.tbank.ru' },
        ],
        period: 'Jun 2022 — Dec 2024', current: false,
      },
      {
        company: 'EMCD Tech',
        role: 'Chief Information Security Officer',
        url: 'https://emcd.io',
        logo: PUBLIC + '/img/companies/emcd.jpg',
        logoInvert: true,
        period: 'Jan 2022 — Jul 2022', current: false,
      },
      {
        company: 'SUNLIGHT',
        role: 'Deputy Director of Information Security',
        url: 'https://sunlight.net',
        logo: PUBLIC + '/img/companies/sunlight.jpg',
        logoColor: true,
        period: 'Dec 2020 — Aug 2021', current: false,
      },
      {
        company: 'Poly Play Inc', role: 'Senior IS Specialist (Lead)',
        url: 'https://alfabravo.us/',
        logo: PUBLIC + '/img/companies/polyplay.svg',
        period: 'Jan 2020 — Dec 2020', current: false,
      },
      {
        company: 'Weter IT', role: 'Senior IS Specialist',
        url: 'https://weter.denistia.ru/ru/',
        logo: PUBLIC + '/img/companies/weter.png',
        period: 'Apr 2019 — Jan 2020', current: false,
      },
    ],

    projects: [
      {
        name: 'oss_toolchainmap',
        desc: 'AppSec tools map — helps choose the optimal solution for any situation: no budget, no integration resources, no team.',
        lang: 'Python', langColor: '#3572A5', stars: 5, forks: 4,
        url: 'https://github.com/geminishkv/oss_toolchainmap',
      },
      {
        name: 'course_labs',
        desc: 'Lab exercises for AppSec, Risk Analysis, Security Champion courses: Toolchain, Orchestration, CI/CD, UML and more.',
        lang: 'Python', langColor: '#3572A5', stars: 17, forks: 20,
        url: 'https://github.com/geminishkv/course_labs',
      },
      {
        name: 'sbom_genformatter',
        desc: 'CLI tool for generating and formatting SBOM (CycloneDX / SPDX) with CI/CD pipeline integration.',
        lang: 'Python', langColor: '#3572A5', stars: 4, forks: 0,
        url: 'https://github.com/geminishkv/sbom_genformatter',
      },
      {
        name: 'semgrep_java_custom_ruleset',
        desc: 'Custom Semgrep rules for Java based on OWASP TOP 10, wrapped in a Makefile for standalone execution.',
        lang: 'Shell', langColor: '#89e051', stars: 1, forks: 0,
        url: 'https://github.com/geminishkv/semgrep_java_custom_ruleset',
      },
      {
        name: 'geoip-tool',
        desc: 'GeoIP-lookup mini-utility from the terminal and a Burp Suite plugin. Works via curl + jq without API keys.',
        lang: 'Shell', langColor: '#89e051', stars: 4, forks: 1,
        url: 'https://github.com/geminishkv/geoip-tool',
      },
    ],

    certs: [
      { area: 'Otus',                          title: 'DevSecOps Implementation and Operations' },
      { area: 'CyberED',                        title: 'Web Application Security and Threat Detection Based on OWASP TOP 10' },
      { area: 'Kaspersky Academy',               title: 'Corporate Information Security' },
      { area: 'Informzashita',                  title: 'Web Application Security' },
      { area: 'Specialist Training Center, BMSTU', title: 'Security of Systems, Services and Networks in DevOps' },
      { area: 'Specialist Training Center, BMSTU', title: 'DevOps Professional' },
      { area: 'Specialist Training Center, BMSTU', title: 'DevOps Engineer' },
      { area: 'Specialist Training Center, BMSTU', title: 'Software Development Team Lead' },
      { area: 'Specialist Training Center, BMSTU', title: 'DASA DevOps Product Owner' },
      { area: 'Specialist Training Center, BMSTU', title: 'DASA DevOps Practitioner' },
      { area: 'Specialist Training Center, BMSTU', title: 'Agile — Scrum Management' },
      { area: 'Specialist Training Center, BMSTU', title: 'Scrum Master' },
      { area: 'Specialist Training Center, BMSTU', title: 'Zabbix: Enterprise IT Infrastructure Monitoring' },
      { area: 'Specialist Training Center, BMSTU', title: 'Building Fault-Tolerant Cluster Solutions' },
      { area: 'Specialist Training Center, BMSTU', title: 'Microsoft Azure: Introduction' },
      { area: 'Specialist Training Center, BMSTU', title: 'Services and Networks Administration' },
    ],

    videos: [
      {
        label: 'Podcast',
        title: 'Podcast on Secure Software Development',
        url: 'https://www.youtube.com/watch?v=LifFzjdvGTc',
        thumb: PUBLIC + '/img/yt_preroll/LifFzjdvGTc.jpg',
      },
      {
        label: 'Interview',
        title: 'Interview with BISA Association on Secure Software Development',
        url: 'https://youtu.be/sPGhWWaWUdE',
        thumb: PUBLIC + '/img/yt_preroll/sPGhWWaWUdE.jpg',
        thumbZoom: true,
      },
    ],

    gaming: {
      igRead: 'View →',
      igPersonalProfile: 'Personal profile',
      igGo: 'Visit →',
      watchBtn: 'Watch →',
    },

    blog: {
      langNote: '',
      readBtn: 'Read →',
      openTelegram: 'Open in Telegram',
      ctaSub: 'AppSec and DevSecOps channel',
      subscribeBtn: 'Subscribe →',
      showMore: (n) => `Show ${n} more ↓`,
      subscribersFmt: (n) => `${n} subscriber${n !== 1 ? 's' : ''}`,
    },

    notice: {
      ariaLabel: 'Notice',
      title: 'Notice',
      paragraphs: [
        'All information in the materials of this profile, as well as any included materials, including any textual or graphical works, is provided for informational purposes only.',
        'Any use of the information presented through this profile and/or any textual or graphical works without prior authorization is subject to applicable law.',
        'The author bears no responsibility for any possible harm caused by the provided materials, including any textual or graphical works.',
        'All textual and graphical works, including links, are for informational purposes only, intended to share knowledge in product security.',
      ],
      dismiss: 'Got it',
    },
  },
};
