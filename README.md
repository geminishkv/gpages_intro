<div align="center">
<a href="https://geminishkv.tech">
<img src="https://socialify.git.ci/geminishkv/gpages_intro/image?description=1&language=1&name=1&owner=1&theme=Dark" alt="gpages_intro" width="640" />
</a>
</div>

<div align="center">

![Repo Size](https://img.shields.io/github/repo-size/geminishkv/gpages_intro)![License](https://img.shields.io/github/license/geminishkv/gpages_intro)![CI](https://img.shields.io/github/actions/workflow/status/geminishkv/gpages_intro/ci.yml?branch=gpages)![Status](https://img.shields.io/badge/status-active-success)![Contributors](https://img.shields.io/github/contributors/geminishkv/gpages_intro)![Open pull requests](https://img.shields.io/github/issues-pr/geminishkv/gpages_intro)![Commit Activity](https://img.shields.io/github/commit-activity/m/geminishkv/gpages_intro)![Last commit](https://img.shields.io/github/last-commit/geminishkv/gpages_intro/gpages)

</div>

Персональный портфолио-лендинг на React 18 с anime.js анимациями, двуязычным блогом (RU/EN) и автоматическим обновлением контента через GitHub Actions.

**Что делает:**

* **SplashScreen** — глитч-анимация (clip-path + RGB-каналы + scanlines)
* **Mac mockup** — CSS keyframes сборка ретро-Mac с прогресс-баром
* **Typewriter** — DOS-стиль набор заголовка по символам
* **Blog** — 14 постов из Telegram с переводом RU→EN, статические SEO-страницы
* **Gaming** — PSN/Xbox статистика: уровень, трофеи, platinum wall (90+)
* **SEO** — JSON-LD, OG, sitemap, RSS (RU+EN), llms.txt, hreflang

Сайт: **[geminishkv.tech](https://geminishkv.tech)**

<div align="center"><h3>Sic Parvis Magna</h3></div>

***

### Стек технологий

| Слой | Технология |
|------|-----------|
| UI-фреймворк | React 18 (CRA) |
| Анимации | anime.js 3.2.2 + IntersectionObserver |
| Стили | CSS (design tokens, custom properties, clamp, keyframes, clip-path) |
| i18n | LangContext (RU/EN) — localStorage, без сторонних библиотек |
| Деплой | `scripts/deploy.js` (git) → GitHub Pages, ветка `gh-pages` |
| Домен | geminishkv.tech (reg.ru + GitHub Pages custom domain) |
| SEO | JSON-LD, OG, Twitter Card, hreflang, sitemap.xml, RSS, llms.txt |
| CI/CD | GitHub Actions — единый `ci.yml`: lint + build на push, weekly update + deploy по cron |

***

### Функциональность

* **SplashScreen** — экран загрузки с глитч-анимацией (clip-path + RGB-каналы + scanlines)
* **Mac mockup** — анимация сборки ретро-Mac через CSS keyframes + `.mac--play` триггер
* **Typewriter** — пошаговый набор заголовка по символам (DOS-стиль)
* **Badges marquee** — бесконечный скролл логотипов достижений
* **NoticeBar** — анонс-баннер с авто-показом, dismissable на сессию
* **Stats** — 5 ключевых метрик с анимацией count-up через IntersectionObserver
* **Projects** — карточки GitHub-репозиториев (stars, forks, язык)
* **Blog** — превью 14 постов из Telegram `shmakovis_appsec`; перевод RU→EN; статические SEO-страницы `/blog/{id}/` (RU) и `/blog/en/{id}/` (EN)
* **Videos** — YouTube-карточки: подкаст по безопасной разработке, интервью BISA
* **Experience** — 6 мест работы в виде карточек с логотипами
* **Tools** — Tech Stack по категориям, Domains, Certifications (23+ сертификата)
* **Gaming** — PSN и Xbox статистика: уровень, трофеи, platinum wall (90+), game history
* **About modal** — попап с резюме, навыками, инструментами и достижениями
* **Nav** — якорные ссылки, бургер-меню с portal-рендерингом, glass-эффект при скролле
* **Responsive** — адаптив (≤576px, ≤900px, десктоп); `scroll-behavior: smooth`
* **prefers-reduced-motion** — все анимации отключаются по системной настройке

***

### CI/CD

| Workflow | Триггер | Секреты | Действие |
|----------|---------|---------|----------|
| `ci.yml` — **build** | push / PR → `gpages` | `YM_ID` | `npm ci` → `eslint` → `npm run build` |
| `ci.yml` — **update-and-deploy** | cron Пн 07:00 UTC / manual | `STRATEGE_COOKIE`, `YM_ID` | TG + Instagram + gaming + stats → sitemap + RSS → коммит → build → blog pages → deploy gh-pages → ping Yandex |

Ручной запуск: `workflow_dispatch` с опцией `skip_data` для деплоя без обновления данных.

***

### SEO и индексация

| Компонент | Описание |
|-----------|---------|
| `index.html` | JSON-LD Person / ProfilePage / WebSite / BreadcrumbList, OG, Twitter Card, geo, Яндекс.Вебмастер, canonical, hreflang RU/EN, LCP preload |
| `sitemap.xml` | RU + EN страницы блога с `xhtml:link` hreflang; `lastmod` обновляется при CI |
| `rss.xml` / `rss-en.xml` | RSS 2.0 фиды блога (RU и EN); atom:link, enclosure |
| `llms.txt` | Описание для AI-краулеров (ChatGPT, Perplexity, Gemini, Copilot) |
| `robots.txt` | Yandex Clean-param, блокировка scrapers (SemrushBot, AhrefsBot, MJ12bot) |
| `generate-blog-pages.js` | Статические HTML с JSON-LD BlogPosting, OG/Twitter Card, hreflang RU↔EN |

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
node scripts/update-tg-posts.js    # Telegram посты + перевод EN
node scripts/update-instagram.js   # Instagram посты
node scripts/update-gaming.js      # PSN/Xbox статистика
node scripts/update-stats.js       # GitHub stars/forks
node scripts/generate-sitemap.js   # sitemap.xml
node scripts/generate-rss.js       # rss.xml (RU) + rss-en.xml (EN)
```

***

### Деплой на GitHub Pages

```bash
npm run predeploy && npm run deploy
```

***

### Структура

```
gpages/
├── public/
│   ├── img/
│   │   ├── badges/           # Логотипы достижений (marquee)
│   │   ├── blog/             # Обложки постов Telegram (кеш CI)
│   │   ├── companies/        # Логотипы работодателей
│   │   ├── gaming/
│   │   │   ├── psn/          # Обложки платиновых трофеев PSN
│   │   │   └── xbox/         # Обложки игр Xbox
│   │   ├── hero/             # Mac mockup, логотип, аватар
│   │   ├── instagram/        # Кеш обложек Instagram (CI)
│   │   ├── logotype/         # Логотип для README
│   │   ├── splash/           # Заставка сплеш-экрана
│   │   └── yt_preroll/       # Превью YouTube-видео
│   ├── CNAME                 # Кастомный домен GitHub Pages
│   ├── 404.html              # SPA fallback
│   ├── favicon.ico           # Многоразмерный ICO
│   ├── index.html            # SEO-шаблон (JSON-LD, OG, meta)
│   ├── llms.txt              # AI-краулеры
│   ├── robots.txt            # Yandex Clean-param, блок scrapers
│   ├── rss.xml / rss-en.xml  # RSS-фиды блога
│   ├── sitemap.xml           # RU + EN с xhtml:link hreflang
│   └── yandex_*.html         # Яндекс.Вебмастер
├── src/
│   ├── components/
│   │   ├── SplashScreen.js   # Глитч-анимация
│   │   ├── MainPage.js       # Корневой layout
│   │   ├── Nav.js            # Навбар + burger (portal)
│   │   ├── NoticeBar.js      # Анонс-баннер
│   │   ├── Hero.js           # Mac + badges + typewriter
│   │   ├── Stats.js          # Count-up метрики
│   │   ├── Projects.js       # GitHub cards
│   │   ├── Blog.js           # Telegram + модалка
│   │   ├── Videos.js         # YouTube cards
│   │   ├── Experience.js     # Карточки опыта
│   │   ├── Tools.js          # Tech Stack / Certs
│   │   ├── Gaming.js         # PSN + Xbox + platinum wall
│   │   ├── BrandColumn.js    # Бренд-колонка
│   │   ├── Footer.js
│   │   ├── SicParvisMagnaPill.js
│   │   └── AboutModal.js     # Попап резюме
│   ├── context/
│   │   └── LangContext.js    # RU/EN (localStorage)
│   ├── hooks/
│   │   └── useMainAnimation.js
│   ├── i18n/
│   │   └── translations.js
│   ├── constants/
│   │   └── index.js          # Данные: опыт, проекты, статистика
│   ├── data/
│   │   ├── tg-posts.json     # Telegram (CI)
│   │   ├── instagram.json    # Instagram (CI)
│   │   └── gaming.json       # PSN/Xbox (CI)
│   └── styles/
│       ├── App.css           # Design tokens (:root), глобальные стили
│       ├── CardBase.css      # Общий фундамент карточек
│       ├── SplashScreen.css  # Глитч: clip-path, RGB, scanlines
│       ├── MainPage.css
│       ├── Nav.css           # Burger, overlay, glass effect
│       ├── NoticeBar.css
│       ├── Hero.css          # Badges marquee, social buttons
│       ├── Mac.css           # Mac mockup, progress bar
│       ├── BrandColumn.css
│       ├── SicParvisMagnaPill.css
│       ├── Stats.css
│       ├── Projects.css
│       ├── Blog.css          # Карточки, модалка, CTA
│       ├── Videos.css
│       ├── Experience.css
│       ├── Tools.css         # Tech Stack, Domains, Certs
│       ├── Gaming.css        # Platform cards, platinum wall
│       ├── AboutModal.css
│       └── Footer.css
├── scripts/
│   ├── update-tg-posts.js    # Telegram → tg-posts.json + перевод EN
│   ├── update-instagram.js   # Instagram → instagram.json
│   ├── update-gaming.js      # Stratege.ru + Xbox → gaming.json
│   ├── update-stats.js       # GitHub API → constants/index.js
│   ├── generate-sitemap.js   # sitemap.xml (RU + EN + hreflang)
│   ├── generate-rss.js       # rss.xml (RU) + rss-en.xml (EN)
│   ├── generate-blog-pages.js # Статические SEO-страницы блога
│   └── deploy.js             # Деплой в gh-pages
├── .github/workflows/
│   └── ci.yml                # Lint + Build (push) · Weekly Update + Deploy (cron)
├── package.json
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE.md
├── NOTICE.md
├── SECURITY.md
└── README.md
```

***

Copyright (c) 2026 Elijah S Shmakov

![logo](public/img/logotype/logotypemd.jpg)
