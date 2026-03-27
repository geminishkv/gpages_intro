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

Персональный портфолио-лендинг на React 18 с anime.js анимациями, двуязычным блогом (RU/EN) и автоматическим обновлением контента через GitHub Actions.

Сайт: **[geminishkv.tech](https://geminishkv.tech)**

<div align="center"><h3>Sic Parvis Magna. Auxilio Divino</h3></div>

***

### Стек технологий

| Слой | Технология |
|------|-----------|
| UI-фреймворк | React 18 (CRA) |
| Анимации | anime.js 3.2.2 + IntersectionObserver |
| Стили | CSS (custom properties, clamp, keyframes, clip-path) |
| i18n | LangContext (RU/EN) — localStorage, без сторонних библиотек |
| Деплой | `scripts/deploy.js` (git) → GitHub Pages, ветка `gh-pages` |
| Домен | geminishkv.tech (reg.ru + GitHub Pages custom domain) |
| SEO | JSON-LD Person/BlogPosting/ProfilePage/WebSite, OG, Twitter Card, hreflang RU/EN, sitemap.xml, robots.txt (Yandex Clean-param), статические страницы блога |
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
- **Blog** — превью 14 постов из Telegram-канала `shmakovis_appsec`; обложки кешируются локально; перевод RU→EN через Google Translate API с чанкингом и кешированием; статические SEO-страницы `/blog/{id}/` (RU) и `/blog/en/{id}/` (EN)
- **Videos** — YouTube-карточки с превью: подкаст по безопасной разработке, интервью BISA
- **Experience** — 6 мест работы в виде карточек с логотипами компаний
- **Tools** — Tech Stack по категориям, Domains, Certifications (16 сертификатов)
- **Gaming** — PSN и Xbox статистика: уровень, трофеи, platinum wall (90 платин), game history; обновляется через CI
- **About modal** — полноэкранный попап с резюме, навыками, инструментами и достижениями
- **Nav** — якорные ссылки (Blog, Experience, Tools), бургер-меню с portal-рендерингом, glass-эффект при скролле (`backdrop-filter`)
- **Responsive** — адаптив под мобильные (≤576px), планшеты (≤900px) и десктоп; `scroll-behavior: smooth` + `scroll-padding-top` для корректной работы anchor-ссылок с fixed nav
- **prefers-reduced-motion** — все анимации, включая `.social-group`, отключаются по системной настройке

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
│   │   ├── logotype/         # Логотип для README
│   │   ├── splash/           # Заставка сплеш-экрана
│   │   └── yt_preroll/       # Превью YouTube-видео
│   ├── CNAME                 # Кастомный домен GitHub Pages
│   ├── 404.html              # SPA fallback для GitHub Pages
│   ├── favicon.ico           # Многоразмерный ICO (16/32/48/64/128/256px), из logo2.png
│   ├── index.html            # SEO-шаблон: JSON-LD Person/ProfilePage/WebSite, OG, Twitter Card, geo, Yandex
│   ├── robots.txt            # Yandex Clean-param, YandexImages/Favicons, блокировка scrapers
│   ├── sitemap.xml           # RU + EN страницы блога с hreflang; auto-update при CI
│   └── yandex_*.html         # Подтверждение Яндекс.Вебмастер
├── src/
│   ├── components/
│   │   ├── SplashScreen.js   # Глитч-анимация перехода
│   │   ├── MainPage.js       # Корневой layout, iOS scroll lock во время анимации
│   │   ├── Nav.js            # Навбар + burger menu (portal) + .nav--scrolled glass effect
│   │   ├── NoticeBar.js      # Анонс-баннер (sessionStorage dismiss)
│   │   ├── Hero.js           # Главный блок: Mac + badges + typewriter
│   │   ├── Stats.js          # 5 метрик с count-up анимацией
│   │   ├── Projects.js       # Open-Source карточки GitHub
│   │   ├── Blog.js           # Превью постов Telegram + модалка; text/text_en по lang
│   │   ├── Videos.js         # YouTube-карточки (подкаст, интервью)
│   │   ├── Experience.js     # Карточки опыта работы
│   │   ├── Tools.js          # Tech Stack / Domains / Certifications
│   │   ├── Gaming.js         # PSN + Xbox статистика, platinum wall, game history
│   │   ├── Footer.js
│   │   └── AboutModal.js     # Попап с резюме
│   ├── context/
│   │   └── LangContext.js    # RU/EN переключатель (localStorage, default: ru)
│   ├── hooks/
│   │   └── useMainAnimation.js  # Вся логика anime.js + IntersectionObserver
│   ├── i18n/
│   │   └── translations.js   # Строки UI на RU и EN
│   ├── constants/
│   │   └── index.js          # Данные: опыт, проекты, статистика, сертификаты
│   ├── data/
│   │   ├── tg-posts.json     # Посты Telegram: text (RU) + text_en (EN); обновляется CI
│   │   ├── instagram.json    # Посты Instagram (обновляется CI еженедельно)
│   │   └── gaming.json       # PSN/Xbox статистика (обновляется CI еженедельно)
│   └── styles/
│       ├── App.css           # Глобальные стили; mobile: scroll-behavior smooth, scroll-padding-top
│       ├── SplashScreen.css  # Глитч: clip-path, RGB-layers, scanlines
│       ├── MainPage.css
│       ├── Nav.css           # Burger bars-staggered, mobile overlay, .nav--scrolled backdrop-filter
│       ├── NoticeBar.css
│       ├── Hero.css          # Badges marquee; .social-group opacity:0 до анимации; prefers-reduced-motion
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
│   ├── update-tg-posts.js    # Парсинг Telegram HTML → tg-posts.json; перевод RU→EN (Google Translate, paragraph chunking ≤900 chars); кеш изображений
│   ├── update-instagram.js   # Парсинг Instagram → instagram.json + кеш изображений
│   ├── update-gaming.js      # Stratege.ru + Xbox API → gaming.json + кеш обложек
│   ├── update-stats.js       # GitHub API → stars/forks в constants/index.js
│   ├── generate-sitemap.js   # public/sitemap.xml (RU + EN URLs, hreflang); обновляет dateModified в index.html
│   ├── generate-blog-pages.js # Статические SEO-страницы build/blog/{id}/ (RU) и build/blog/en/{id}/ (EN)
│   └── deploy.js             # Кастомный деплой в gh-pages (замена несовместимого gh-pages пакета)
├── .github/workflows/
│   ├── update-blog.yml       # Cron пн 07:00 UTC: TG (RU+EN перевод) + Instagram + sitemap.xml + index.html → коммит gpages → build → generate-blog-pages → деплой gh-pages
│   ├── update-interests.yml  # Cron пн 07:00 UTC: gaming stats → деплой
│   └── update-stats.yml      # Cron пн 01:00 UTC: GitHub stats → деплой
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
node scripts/update-tg-posts.js    # Telegram посты (14 шт.) + перевод EN
node scripts/update-instagram.js   # Instagram посты
node scripts/update-gaming.js      # PSN/Xbox статистика
node scripts/update-stats.js       # GitHub stars/forks
node scripts/generate-sitemap.js   # sitemap.xml + dateModified в index.html
```

***

### Деплой на GitHub Pages

```bash
# Полный цикл: sitemap → build → статические страницы блога → деплой
npm run predeploy && npm run deploy

# Или по шагам
node scripts/generate-sitemap.js     # public/sitemap.xml (RU + EN URLs)
npm run build                        # React → build/
node scripts/generate-blog-pages.js  # build/blog/{id}/ и build/blog/en/{id}/
node scripts/deploy.js               # → ветка gh-pages
```

***

### CI/CD

| Workflow | Расписание | Секреты | Действие |
|----------|-----------|---------|---------|
| `update-blog.yml` | Пн 07:00 UTC | — | TG → `tg-posts.json` (RU + EN перевод) + Instagram → `sitemap.xml` + `index.html` → коммит `gpages` → build → `generate-blog-pages.js` → деплой `gh-pages` |
| `update-interests.yml` | Пн 07:00 UTC | `STRATEGE_COOKIE` | Stratege.ru + Xbox → `gaming.json` + кеш обложек → деплой |
| `update-stats.yml` | Пн 01:00 UTC | — | GitHub API → stars/forks → деплой |

Все workflow запускаются вручную через `workflow_dispatch`.

***

### SEO и индексация

| Компонент | Описание |
|-----------|---------|
| `public/index.html` | JSON-LD Person / ProfilePage / WebSite, Open Graph, Twitter Card, `geo.*` мета-теги (RU-MOW), Яндекс.Вебмастер верификация, canonical, hreflang RU/EN |
| `public/sitemap.xml` | Главная + до 14 RU-страниц блога + до 14 EN-страниц блога; hreflang cross-linking; `lastmod` обновляется при каждом CI-запуске |
| `public/robots.txt` | `YandexBot` с `Clean-param` (UTM/tracking params); `YandexImages`/`YandexMedia` только `/img/`; `YandexFavicons` явно разрешён; `YandexMetrika`/`YandexDirect` заблокированы; SemrushBot/AhrefsBot/MJ12bot/DotBot/Baiduspider заблокированы; `Host: geminishkv.tech` |
| `public/favicon.ico` | Многоразмерный ICO (16/32/48/64/128/256px), сгенерирован ImageMagick из `logo2.png` |
| `generate-blog-pages.js` | Статические HTML с JSON-LD BlogPosting + BreadcrumbList, OG/Twitter Card, hreflang RU↔EN, `lang` attr, форматирование даты по локали |

***

Copyright (c) 2026 Elijah S Shmakov

![logo](public/img/logotype/logotypemd.jpg)
