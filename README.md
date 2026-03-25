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
| SEO | JSON-LD Person/BlogPosting schema, Open Graph, Twitter Card, sitemap.xml, robots.txt, статические страницы блога (`/blog/{id}/`) |
| CI/CD | GitHub Actions — блог + Instagram (пн 07:00 UTC), gaming (пн 07:00 UTC), stats (пн 01:00 UTC) |

***

### Функциональность

- **SplashScreen** — экран загрузки с глитч-анимацией (clip-path + RGB-каналы + scanlines)
- **Mac mockup** — покадровая анимация сборки ретро-Mac через anime.js timeline, прогресс-бар "Initializing"
- **Typewriter** — пошаговый набор заголовка по символам (DOS-стиль)
- **Badges marquee** — бесконечный скролл логотипов достижений
- **NoticeBar** — анонс-баннер с авто-показом (задержка 1.2с после splash), dismissable на сессию
- **Stats** — 5 ключевых метрик с анимацией count-up через IntersectionObserver
- **Open-Source Projects** — карточки GitHub-репозиториев (stars, forks, язык)
- **Blog** — превью 14 постов из Telegram-канала `shmakovis_appsec` (cover, теги, просмотры, модалка); изображения кешируются локально; статические SEO-страницы `/blog/{id}/`
- **Videos** — YouTube-карточки с превью: подкаст по безопасной разработке, интервью BISA
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
│   │   ├── instagram/        # Кеш обложек Instagram (обновляется CI)
│   │   ├── splash/           # Заставка сплеш-экрана
│   │   └── yt_preroll/       # Превью YouTube-видео
│   ├── CNAME                 # Кастомный домен GitHub Pages
│   ├── 404.html              # SPA fallback для GitHub Pages
│   ├── favicon.ico
│   ├── index.html            # SEO: JSON-LD Person, OG, Twitter Card
│   ├── robots.txt
│   ├── sitemap.xml
│   └── yandex_*.html         # Подтверждение Яндекс.Вебмастер
├── src/
│   ├── components/
│   │   ├── SplashScreen.js   # Глитч-анимация перехода
│   │   ├── MainPage.js       # Корневой layout
│   │   ├── Nav.js            # Навбар + burger menu (portal)
│   │   ├── NoticeBar.js      # Анонс-баннер (sessionStorage dismiss)
│   │   ├── Hero.js           # Главный блок: Mac + badges + typewriter
│   │   ├── Stats.js          # 5 метрик с count-up анимацией
│   │   ├── Projects.js       # Open-Source карточки GitHub
│   │   ├── Blog.js           # Превью постов Telegram + модалка
│   │   ├── Videos.js         # YouTube-карточки (подкаст, интервью)
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
│   │   ├── tg-posts.json     # Посты Telegram (обновляется CI еженедельно)
│   │   ├── instagram.json    # Посты Instagram (обновляется CI еженедельно)
│   │   └── gaming.json       # PSN/Xbox статистика (обновляется CI еженедельно)
│   └── styles/
│       ├── App.css
│       ├── SplashScreen.css  # Глитч: clip-path, RGB-layers, scanlines
│       ├── MainPage.css
│       ├── Nav.css           # Burger bars-staggered, mobile overlay
│       ├── NoticeBar.css
│       ├── Hero.css          # Badges marquee, socials grid
│       ├── Mac.css           # Mac mockup, progress bar
│       ├── Stats.css
│       ├── Projects.css
│       ├── Blog.css          # Карточки, модалка, CTA-блок
│       ├── Videos.css
│       ├── Experience.css    # Карточки работодателей
│       ├── Tools.css         # Tech Stack, Domains, Certifications
│       ├── Gaming.css        # Platform cards, platinum wall, game history grid
│       └── Footer.css
├── scripts/
│   ├── update-tg-posts.js    # Парсинг Telegram HTML → tg-posts.json + кеш изображений
│   ├── update-instagram.js   # Парсинг Instagram → instagram.json + кеш изображений
│   ├── update-gaming.js      # Stratege.ru + Xbox API → gaming.json + кеш обложек
│   ├── update-stats.js       # GitHub API → stars/forks в constants/index.js
│   ├── generate-sitemap.js   # Генерация public/sitemap.xml с текущей датой
│   ├── generate-blog-pages.js # Статические SEO-страницы build/blog/{id}/index.html
│   └── deploy.js             # Кастомный деплой в gh-pages (замена gh-pages пакета)
├── .github/workflows/
│   ├── update-blog.yml       # Cron: пн 07:00 UTC — TG-посты + Instagram + деплой
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

Обновление данных вручную:

```bash
node scripts/update-tg-posts.js    # Telegram посты (14 шт.)
node scripts/update-instagram.js   # Instagram посты
node scripts/update-gaming.js      # PSN/Xbox статистика
node scripts/update-stats.js       # GitHub stars/forks
```

***

### Деплой на GitHub Pages

```bash
# Полный цикл: sitemap → build → статические страницы блога → деплой
npm run predeploy && npm run deploy

# Или по шагам
npm run build                        # React → build/
node scripts/generate-sitemap.js     # build/sitemap.xml
node scripts/generate-blog-pages.js  # build/blog/{id}/index.html
node scripts/deploy.js               # → ветка gh-pages
```

> **Важно:** перед деплоем удалить директорию `build/` если она содержит `.git` (артефакт предыдущего деплоя через `gh-pages`). Node.js 18 LTS обязателен — `react-scripts` 5 несовместим с Node 25+.

***

### CI/CD

| Workflow | Расписание | Секреты | Действие |
|----------|-----------|---------|---------|
| `update-blog.yml` | Пн 07:00 UTC | — | Парсинг TG-канала + Instagram → JSON + кеш `public/img/` → сборка → `generate-blog-pages.js` → деплой |
| `update-interests.yml` | Пн 07:00 UTC | `STRATEGE_COOKIE` | Stratege.ru + Xbox → `gaming.json` + кеш обложек → деплой |
| `update-stats.yml` | Пн 01:00 UTC | — | GitHub API → stars/forks → деплой |

Все workflow запускаются вручную через `workflow_dispatch`.

***

### SEO и индексация

- `public/index.html` — JSON-LD Person schema, Open Graph, Twitter Card, canonical URL
- `scripts/generate-blog-pages.js` — статические страницы `/blog/{id}/` с JSON-LD BlogPosting, BreadcrumbList, OG/Twitter Card, `keywords`, `og:image:alt` и корректным `alt` на обложках
- `public/robots.txt` — разрешения для Googlebot и Yandex
- `public/sitemap.xml` — карта сайта со всеми постами блога и hreflang
- `public/yandex_*.html` — подтверждение домена в Яндекс.Вебмастер

***

Copyright (c) 2026 Elijah S Shmakov

![logo](public/img/logotype/logotypemd.jpg)
