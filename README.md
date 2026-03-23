<div align="center">
<h1><a id="intro"> geminishkv.tech <sup></sup></a><br></h1>
<a href="https://reactjs.org"><img src="https://img.shields.io/static/v1?logo=react&logoColor=fff&label=&message=React+18&color=36393f&style=flat" alt="React"></a>
<a href="https://animejs.com"><img src="https://img.shields.io/static/v1?logo=javascript&logoColor=fff&label=&message=anime.js&color=36393f&style=flat" alt="anime.js"></a>
<a href="https://pages.github.com"><img src="https://img.shields.io/static/v1?logo=github&logoColor=fff&label=&message=GitHub+Pages&color=36393f&style=flat" alt="GitHub Pages"></a>
<a href="https://geminishkv.tech"><img src="https://img.shields.io/static/v1?logo=googlechrome&logoColor=fff&label=&message=geminishkv.tech&color=cc2200&style=flat" alt="Live"></a>
<img src="https://img.shields.io/badge/Contributor-Шмаков_И._С.-8b9aff" alt="Contributor Badge">
</div>

<div align="center">
<img src="https://img.shields.io/github/repo-size/geminishkv/gpages_intro" alt="repo size">
<img src="https://img.shields.io/github/last-commit/geminishkv/gpages_intro/gpages" alt="last commit">
<img src="https://img.shields.io/github/commit-activity/m/geminishkv/gpages_intro/gpages" alt="commit activity">
<img src="https://img.shields.io/github/issues-pr/geminishkv/gpages_intro" alt="pull requests">
<img src="https://img.shields.io/github/contributors/geminishkv/gpages_intro" alt="contributors">
</div>

***

<br>Салют 👋,</br>

Персональный портфолио-лендинг.
Сайт доступен по адресу: **[geminishkv.tech](https://geminishkv.tech)**

<div align="center"><h3>Sic Parvis Magna. Auxilio Divino</h3></div>

***

### Стек технологий

| Слой | Технология |
|------|-----------|
| UI-фреймворк | React 18 (CRA) |
| Анимации | anime.js 3.2.2 + IntersectionObserver |
| Стили | CSS (custom properties, clamp, keyframes, clip-path) |
| Деплой | scripts/deploy.js (git) → GitHub Pages, ветка `gh-pages` |
| Домен | geminishkv.tech (reg.ru + GitHub Pages custom domain) |
| SEO | JSON-LD Person schema, Open Graph, Twitter Card, sitemap.xml, robots.txt |
| CI/CD | GitHub Actions — блог (ежедн. 06:00 UTC), gaming (пн 07:00 UTC), stats (пн 01:00 UTC) |

***

### Функциональность

- **SplashScreen** — экран загрузки с глитч-анимацией (clip-path + RGB-каналы + scanlines)
- **Mac mockup** — покадровая анимация сборки ретро-Mac через anime.js timeline, прогресс-бар "Initializing"
- **Typewriter** — пошаговый набор заголовка по символам (DOS-стиль)
- **Badges marquee** — бесконечный скролл логотипов достижений
- **Stats** — 5 ключевых метрик с анимацией count-up через IntersectionObserver
- **Open-Source Projects** — карточки GitHub-репозиториев (stars, forks, язык)
- **Blog** — превью постов из Telegram-канала `shmakovis_appsec` (cover, теги, просмотры, модалка); изображения кешируются локально
- **Experience** — 6 мест работы в виде карточек с логотипами компаний
- **Tools** — Tech Stack по категориям, Domains, Certifications (16 сертификатов)
- **Gaming** — PSN и Xbox статистика: уровень, трофеи, platinum wall (90 платин), game history; обновляется через CI
- **About modal** — полноэкранный попап с резюме, навыками, инструментами и достижениями
- **Nav** — якорные ссылки (Blog, Experience, Tools), бургер-меню с portal-рендерингом
- **Responsive** — адаптив под мобильные (≤576px), планшеты (≤900px) и десктоп
- **prefers-reduced-motion** — все анимации отключаются по системной настройке

***

### Структура репозитория

```
gpages/
├── public/
│   ├── img/
│   │   ├── badges/           # Логотипы достижений (marquee)
│   │   ├── blog/             # Обложки постов Telegram (кеш, обновляется CI)
│   │   ├── companies/        # Логотипы работодателей
│   │   ├── gaming/
│   │   │   ├── psn/          # Обложки платиновых трофеев PSN (npwrId.png)
│   │   │   └── xbox/         # Обложки игр Xbox (slug.jpg)
│   │   ├── hero/             # Mac mockup, логотип, аватар
│   │   └── splash/           # Заставка сплеш-экрана
│   ├── CNAME                 # Кастомный домен GitHub Pages
│   ├── favicon.ico
│   ├── index.html            # SEO: JSON-LD, OG, Twitter Card
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── SplashScreen.js   # Глитч-анимация перехода
│   │   ├── MainPage.js       # Корневой layout
│   │   ├── Nav.js            # Навбар + burger menu (portal)
│   │   ├── Hero.js           # Главный блок: Mac + badges + typewriter
│   │   ├── Stats.js          # 5 метрик с count-up анимацией
│   │   ├── Projects.js       # Open-Source карточки GitHub
│   │   ├── Blog.js           # Превью постов Telegram + модалка
│   │   ├── Experience.js     # Карточки опыта работы
│   │   ├── Tools.js          # Tech Stack / Domains / Certifications
│   │   ├── Gaming.js         # PSN + Xbox статистика, platinum wall, game history
│   │   ├── Footer.js
│   │   └── AboutModal.js     # Попап с резюме
│   ├── hooks/
│   │   └── useMainAnimation.js  # Вся логика anime.js + IntersectionObserver
│   ├── constants/
│   │   └── index.js          # Данные: опыт, проекты, статистика, сертификаты
│   ├── data/
│   │   ├── tg-posts.json     # Посты Telegram (обновляется CI ежедневно)
│   │   └── gaming.json       # PSN/Xbox статистика (обновляется CI еженедельно)
│   └── styles/
│       ├── App.css
│       ├── SplashScreen.css  # Глитч: clip-path, RGB-layers, scanlines
│       ├── MainPage.css
│       ├── Nav.css           # Burger bars-staggered, mobile overlay
│       ├── Hero.css          # Badges marquee, socials grid
│       ├── Mac.css           # Mac mockup, progress bar
│       ├── Stats.css
│       ├── Projects.css
│       ├── Blog.css          # Карточки, модалка, CTA-блок
│       ├── Experience.css    # Карточки работодателей
│       ├── Tools.css         # Tech Stack, Domains, Certifications
│       ├── Gaming.css        # Platform cards, platinum wall, game history grid
│       └── Footer.css
├── scripts/
│   ├── update-tg-posts.js    # Парсинг Telegram HTML → tg-posts.json + кеш изображений
│   ├── update-gaming.js      # Stratege.ru + Xbox API → gaming.json + кеш обложек
│   ├── update-stats.js       # GitHub API → stars/forks в constants/index.js
│   ├── generate-sitemap.js   # Генерация public/sitemap.xml с текущей датой
│   └── deploy.js             # Кастомный деплой в gh-pages (замена gh-pages пакета)
├── .github/workflows/
│   ├── update-blog.yml       # Cron: ежедн. 06:00 UTC — TG-посты + деплой
│   ├── update-interests.yml  # Cron: пн 07:00 UTC — gaming stats + деплой
│   └── update-stats.yml      # Cron: пн 01:00 UTC — GitHub stats + деплой
├── package.json
├── package-lock.json
├── CNAME
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE.md
├── NOTICE.md
├── SECURITY.md
└── README.md
```

***

### Локальный запуск

```bash
git clone -b gpages https://github.com/geminishkv/gpages_intro.git
cd gpages
npm install
npm start        # http://localhost:3000
```

***

### Деплой на GitHub Pages

```bash
# Сборка и публикация в ветку gh-pages
npm run deploy

# Полный цикл: зафиксировать изменения + задеплоить
git add .
git commit -m "your message"
git push origin gpages
npm run deploy
```

> **Важно:** перед деплоем удалить директорию `build/` если она содержит `.git` (артефакт предыдущего деплоя через `gh-pages`). Node.js 18 LTS обязателен — `react-scripts` 5 несовместим с Node 25+.

***

### CI/CD

| Workflow | Расписание | Секреты | Действие |
|----------|-----------|---------|---------|
| `update-blog.yml` | Ежедн. 06:00 UTC | — | Парсинг TG-канала → `tg-posts.json` + кеш `public/img/blog/` → деплой |
| `update-interests.yml` | Пн 07:00 UTC | `STRATEGE_COOKIE` | Stratege.ru + Xbox → `gaming.json` + кеш обложек → деплой |
| `update-stats.yml` | Пн 01:00 UTC | — | GitHub API → stars/forks → деплой |

Все workflow запускаются вручную через `workflow_dispatch`.

***

### SEO и индексация

- `index.html` — JSON-LD Person schema, Open Graph, Twitter Card, canonical URL
- `public/robots.txt` — разрешения для Googlebot и Yandex
- `public/sitemap.xml` — карта сайта с hreflang

***

Copyright (c) 2026 Elijah S Shmakov

![logo](public/img/logotype/logotypemd.jpg)