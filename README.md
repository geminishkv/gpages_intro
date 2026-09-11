<div align="center">
<a href="https://geminishkv.tech">
<img src="https://socialify.git.ci/geminishkv/gpages_intro/image?description=1&language=1&name=1&owner=1&theme=Dark" alt="gpages_intro" width="640" />
</a>
</div>

<div align="center">

![Repo Size](https://img.shields.io/github/repo-size/geminishkv/gpages_intro)![License](https://img.shields.io/github/license/geminishkv/gpages_intro)![CI](https://img.shields.io/github/actions/workflow/status/geminishkv/gpages_intro/ci.yml?branch=gpages)![Status](https://img.shields.io/badge/status-active-success)![Contributors](https://img.shields.io/github/contributors/geminishkv/gpages_intro)![Open pull requests](https://img.shields.io/github/issues-pr/geminishkv/gpages_intro)![Commit Activity](https://img.shields.io/github/commit-activity/m/geminishkv/gpages_intro)![Last commit](https://img.shields.io/github/last-commit/geminishkv/gpages_intro/gpages)

</div>

Персональный портфолио-лендинг на React 18 с anime.js анимациями, двуязычным блогом (RU/EN), design system на CSS-токенах и автоматическим обновлением контента через GitHub Actions.

**Что делает:**

* **SplashScreen** — Canvas2D shader (brand red→gold) + SVG pretitle
* **Holographic Monitor** — CSS floating monitor с glow + Python typewriter
* **Typewriter** — DOS-стиль набор заголовка с glitch-эффектом по символам
* **Blog** — 352 поста из Telegram с переводом RU→EN: последний крупно + компактный список, фильтры по тегам, пагинация на `/blog/`, статические SEO-страницы
* **Instagram** — превью 8 последних постов и ссылка на профиль
* **SEO** — JSON-LD, OG, Twitter Card, sitemap (390 URL), RSS (RU+EN), llms.txt, hreflang
* **Security** — CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy
* **Privacy** — политика конфиденциальности (ФЗ-152), баннер согласия на аналитику (Метрика и Plausible грузятся только после «Принять»), дисклеймер Meta/LinkedIn

Сайт: **[geminishkv.tech](https://geminishkv.tech)**

<div align="center"><h3>Sic Parvis Magna</h3></div>

***

### Стек технологий

| Слой | Технология |
|------|-----------|
| UI-фреймворк | React 18 (CRA) |
| Анимации | anime.js 3.2.2 + IntersectionObserver + CSS keyframes |
| Стили | CSS Design System (90+ токенов, custom properties, clamp, clip-path) |
| i18n | LangContext (RU/EN) — localStorage, без сторонних библиотек |
| Деплой | `scripts/deploy.js` (git) → GitHub Pages, ветка `gh-pages` |
| Домен | geminishkv.tech (reg.ru + GitHub Pages custom domain) |
| SEO | JSON-LD, OG, Twitter Card, hreflang, sitemap.xml (390 URL), RSS, llms.txt |
| Security | CSP meta-tag, X-Frame-Options, Referrer-Policy, Permissions-Policy |
| CI/CD | GitHub Actions — `ci.yml`: lint + audit + build на push, weekly update + deploy по cron |

***

### Функциональность

* **SplashScreen** — Canvas2D shader (бренд-цвета red→gold) + SVG pretitle, reshow раз в 30 мин
* **Holographic Monitor** — CSS floating monitor с glow-рамкой: blinker → progress bar → Python typewriter → UwU
* **Typewriter** — glitch-эффект: рандомные символы перед каждой буквой, DOS-стиль
* **BrandColumn** — каскадная анимация: materialize → diamond rotate → pulse ring → slide-up (синхронизация с Mac)
* **GlitchLabel** — заголовки секций печатаются с glitch при скролле (IntersectionObserver)
* **Badges marquee** — бесконечный скролл логотипов достижений
* **NoticeBar** — правовое уведомление + дисклеймер Meta/LinkedIn (ФЗ, решение суда), reshow раз в 15 мин
* **CookieBanner** — cookie-consent (ФЗ-152), reshow раз в 30 мин
* **Stats** — 5 ключевых метрик с анимацией count-up через requestAnimationFrame
* **Projects** — карточки GitHub-репозиториев (stars, forks, язык)
* **Blog** — 352 поста из Telegram `appsecta`; на главной последний пост крупно + 5 компактных, фильтры по тегам, карточка канала с подписчиками; `/blog/` с пагинацией по 15; статические SEO-страницы `/blog/{id}/` (RU) и `/blog/en/{id}/` (EN); переключатель RU/EN
* **Videos** — YouTube-карточки: подкаст по безопасной разработке, интервью BISA
* **Experience** — карьера как конвейер: 7 узлов с логотипами на трубе red→gold, текущий горит; вертикальная труба на планшетах и телефонах
* **Hero** — позиционирующая строка и lead под тайтлом, команды-ссылки в терминале после интро (`appsec whoami`, `ls projects`, `tail blog`, `skills`), водяной логотип и сетка на фоне; полоса «Сейчас» с живыми цифрами канала
* **Tools** — домены как чипы трёх уровней (ядро / сильное / рабочее), сертификаты, стек из 8 панелей с чипами инструментов
* **Section headers** — единый `SectionHead`: eyebrow `// имя`, заголовок с glitch-typewriter, подзаголовок, действие справа
* **Instagram** — 8 последних постов (обложки кешируются в `public/img/instagram/`), ссылка на профиль
* **About modal** — попап с резюме (ссылка на hh.ru), навыками, достижениями; focus trap
* **Nav** — i18n (RU/EN), SVG бургер с морфингом, LangSwitch toggle, glass-эффект при скролле, прогресс-линия чтения, активная пилюля секции (`aria-current`)
* **Кнопки** — PackageBtn (hacker glitch), ContentBtn (cyber border), ContactBtn (pill + status dot), DownloadBtn (progress animation), SocialIcons (slide-in SVG)
* **Responsive** — 5 breakpoints (1200/900/768/576/420px); заголовок hero масштабируется от колонки (`cqi`) и не переносится на ультравайде; проверено Playwright в Chromium/WebKit/Firefox от 390 до 2946 px
* **A11y** — skip-link, красное кольцо `:focus-visible`, `<main>` landmark, тап-таргеты 44 px на телефонах, `prefers-reduced-motion`
* **prefers-reduced-motion** — все анимации отключаются по системной настройке
* **404** — дино-раннер в стиле Chrome, стилизован под бренд
* **Privacy** — `/privacy/` статическая страница (ФЗ-152, cookie, права пользователя)

***

### Design System

90+ CSS-токенов в `:root` (App.css):

| Категория | Токенов | Примеры |
|-----------|---------|---------|
| Surfaces & Borders | 10 | `--surface-card`, `--border-default` |
| Text grays | 8 | `--text-muted`, `--text-secondary`, `--text-pale` |
| Spacing (4px grid) | 9 | `--space-1` (4px) → `--space-9` (64px) |
| Typography | 8+ | `--text-xs` → `--text-3xl`, `--leading-*`, `--font-bold` |
| Radius | 4 | `--radius-sm` (3px) → `--radius-full` (999px) |
| Z-index | 9 | `--z-sticky` (100) → `--z-notice` (9000) |
| Shadows | 5 | `--shadow-red-sm/md/lg`, `--shadow-dark-sm/md` |
| Red alpha | 12 | `--color-red-a06` → `--color-red-a60` |
| Gold alpha | 8 | `--color-gold-a06` → `--color-gold-a60` |
| Black/White alpha | 7 | `--color-black-a20` → `--color-black-a80`, `--color-white-a*` |
| Nav backgrounds | 2 | `--nav-bg`, `--nav-bg-solid` |
| Transitions | 5 | `--duration-fast` (0.15s), `--ease-spring` |

***

### Security

| Заголовок | Значение |
|-----------|---------|
| Content-Security-Policy | `default-src 'self'`; `script-src` без `'unsafe-inline'` (`INLINE_RUNTIME_CHUNK=false`), шрифты self-hosted (`font-src 'self'`), аналитика — только после согласия |
| X-Content-Type-Options | `nosniff` |
| X-Frame-Options | `DENY` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `camera=(), microphone=(), geolocation=(), payment=()` |

***

### CI/CD

| Workflow | Триггер | Секреты | Действие |
|----------|---------|---------|----------|
| `ci.yml` — **build** | push / PR → `gpages` | `YM_ID` | `npm install` → `eslint` → `npm audit` → `npm run build` |
| `ci.yml` — **update-and-deploy** | cron Пн 07:00 UTC / manual | `YM_ID`, `DATA_PUSH_SSH_KEY` | TG + Instagram + stats → sitemap + RSS → коммит → build → blog pages → deploy gh-pages → ping Yandex |

Ручной запуск: `workflow_dispatch` с опцией `skip_data`.

Полный скрейп всех постов: `node scripts/update-tg-posts.js --all`

Hardening: pinned action SHA, least-privilege permissions (`contents: read` по умолчанию, `write` только для deploy).

***

### SEO и индексация

| Компонент | Описание |
|-----------|---------|
| `index.html` | JSON-LD Person / ProfilePage / WebSite / BreadcrumbList, OG, Twitter Card, geo, Яндекс.Вебмастер, canonical, hreflang RU/EN, LCP preload, 120+ keywords |
| `sitemap.xml` | 390 URL: главная + privacy + индексные страницы блога + 182 RU + EN постов; hreflang cross-links |
| `rss.xml` / `rss-en.xml` | RSS 2.0 фиды блога (RU и EN); atom:link, enclosure |
| `llms.txt` | Описание для AI-краулеров (ChatGPT, Perplexity, Gemini, Copilot) |
| `robots.txt` | Yandex Clean-param, блокировка scrapers (SemrushBot, AhrefsBot, MJ12bot) |
| Blog pages | JSON-LD BlogPosting, OG article, Twitter Card, hreflang RU↔EN, author, published_time |
| Privacy | `/privacy/` — ФЗ-152, cookie policy, права пользователя |

***

### Локальный запуск

```bash
git clone -b gpages https://github.com/geminishkv/gpages_intro.git
cd gpages_intro
npm install
npm start                  # React dev → http://localhost:3000
npm run build && node scripts/generate-blog-pages.js
npx serve build -l 4000   # Статика + блог → http://localhost:4000
```

Обновление данных:

```bash
node scripts/update-tg-posts.js        # Последние 20 постов (incremental merge)
node scripts/update-tg-posts.js --all  # ВСЕ посты (пагинация, разовый)
node scripts/update-instagram.js       # Instagram посты
node scripts/update-stats.js           # GitHub stars/forks
node scripts/generate-sitemap.js       # sitemap.xml (390 URL)
node scripts/generate-rss.js           # rss.xml (RU) + rss-en.xml (EN)
```

***

### Деплой

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
│   │   ├── blog/             # Обложки постов Telegram
│   │   ├── companies/        # Логотипы работодателей
│   │   ├── hero/             # UwU (webp), аватар
│   │   ├── instagram/        # Кеш обложек Instagram
│   │   ├── logotype/         # SVG логотипы
│   │   ├── splash/           # Заставка сплеш-экрана
│   │   └── yt_preroll/       # Превью YouTube-видео
│   ├── fonts/                # Roboto + Unbounded (woff2, OFL) + fonts.css
│   ├── privacy/index.html    # Политика конфиденциальности (+ смена выбора по cookie)
│   ├── 404.html              # SPA fallback + дино-раннер
│   ├── index.html            # SEO: JSON-LD, OG, CSP, 72+ meta tags
│   ├── sitemap.xml           # 390 URL с hreflang
│   ├── rss.xml / rss-en.xml  # RSS-фиды
│   ├── llms.txt              # AI-краулеры
│   └── robots.txt            # Yandex + scrapers block
├── src/
│   ├── components/
│   │   ├── SplashScreen.js   # Shader canvas + pretitle SVG (30 мин reshow)
│   │   ├── MainPage.js       # Корневой layout, scroll lock, skip-link, <main>
│   │   ├── Nav.js            # SVG бургер морфинг, LangSwitch, i18n, прогресс-линия, активная пилюля
│   │   ├── NoticeBar.js      # Уведомление (45 мин reshow)
│   │   ├── CookieBanner.js   # Согласие на аналитику (180 дней, /#consent — сменить выбор)
│   │   ├── Hero.js           # Holographic monitor + typewriter + badges + кнопки + команды-ссылки
│   │   ├── NowStrip.js       # Полоса «Сейчас» (тексты в i18n, цифры канала из данных)
│   │   ├── SectionHead.js    # Единый заголовок секции
│   │   ├── GlitchLabel.js    # Glitch typewriter для заголовков секций
│   │   ├── BrandColumn.js    # Каскадная анимация (forwardRef)
│   │   ├── Stats.js          # Count-up (requestAnimationFrame)
│   │   ├── Projects.js       # GitHub cards
│   │   ├── Blog.js           # Featured + 5 компактных, фильтры по тегам → /blog/{id}/
│   │   ├── Videos.js         # YouTube cards
│   │   ├── Experience.js     # Конвейер карьеры
│   │   ├── Tools.js          # Домены-чипы + сертификаты + стек
│   │   ├── Instagram.js      # 8 последних постов Instagram
│   │   ├── Footer.js         # 4 колонки + политика, смена выбора по cookie, RSS
│   │   ├── SicParvisMagnaPill.js
│   │   └── AboutModal.js     # Resume (hh.ru) + achievements
│   ├── context/LangContext.js
│   ├── lib/consent.js        # Хранение согласия + загрузка Plausible/Метрики
│   ├── hooks/useMainAnimation.js
│   ├── i18n/translations.js  # RU/EN + nav + sections
│   ├── constants/index.js
│   ├── data/
│   │   ├── tg-posts.json     # 182 поста Telegram (CI incremental)
│   │   └── instagram.json    # Instagram (CI)
│   └── styles/
│       ├── App.css           # 90+ design tokens (:root)
│       ├── Buttons.css       # ContactBtn + ContentBtn + PackageBtn + DownloadBtn + SocialIcons
│       ├── CardBase.css      # Общий фундамент карточек
│       ├── SectionHead.css   # Заголовок секции
│       ├── NowStrip.css      # Полоса «Сейчас»
│       ├── LangSwitch.css    # Toggle RU/EN
│       ├── LogoGlow.css      # Rotating gradient ring
│       ├── GlitchLabel.css   # Typewriter cursor
│       ├── CookieBanner.css  # Карточка согласия (.ata-consent)
│       ├── Instagram.css     # Сетка Instagram
│       ├── MacCSS.css        # Holographic floating monitor
│       ├── SplashScreen.css  # Shader splash screen
│       └── [Component].css   # Nav, Hero, Mac, Blog, etc.
├── scripts/
│   ├── update-tg-posts.js    # Telegram scraper (--all для полного)
│   ├── update-instagram.js   # Instagram + cleanup orphans
│   ├── update-stats.js       # GitHub API
│   ├── generate-sitemap.js   # 390 URL + hreflang + ping Yandex
│   ├── generate-rss.js       # RSS RU + EN
│   ├── generate-blog-pages.js # Index (пагинация) + post pages (RU+EN)
│   └── deploy.js             # gh-pages (Node 25 compatible)
├── .github/workflows/
│   └── ci.yml                # Build (push) · Weekly Update + Deploy (cron)
├── package.json
└── README.md
```

***

Copyright (c) 2026 Elijah S Shmakov

![logo](public/img/logotype/logotypemd.jpg)
