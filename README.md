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
* **Экраны** — на десктопе главная листается по восьми экранам (колесо, клавиши, свайп, точки, `#`-ссылки), контент подгоняется под высоту; на телефонах тот же порядок одним документом
* **Blog** — 350+ постов из Telegram с переводом RU→EN: на главной последний крупно + компактный список; `/blog/` — фильтры по темам, поиск, избранный пост, «показать ещё», статические страницы для поисковиков
* **Instagram** — превью 8 последних постов и ссылка на профиль
* **SEO** — JSON-LD, OG, Twitter Card, sitemap (≈760 URL), RSS (RU+EN), llms.txt, hreflang
* **Security** — CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy
* **Privacy** — политика конфиденциальности (ФЗ-152), баннер согласия на аналитику (Метрика и Plausible грузятся только после «Принять»), уведомление об использовании материалов — раздел 10 политики

Сайт: **[geminishkv.tech](https://geminishkv.tech)**

<div align="center"><h3>Sic Parvis Magna</h3></div>

***

### Стек технологий

| Слой | Технология |
|------|-----------|
| UI-фреймворк | React 18 (CRA) |
| Анимации | anime.js 3.2.2 + IntersectionObserver + CSS keyframes |
| Стили | CSS Design System (100+ токенов, custom properties, clamp, clip-path) |
| i18n | LangContext (RU/EN) — localStorage, без сторонних библиотек |
| Деплой | `scripts/deploy.js` (git) → GitHub Pages, ветка `gh-pages` |
| Домен | geminishkv.tech (reg.ru + GitHub Pages custom domain) |
| SEO | JSON-LD, OG, Twitter Card, hreflang, sitemap.xml (≈760 URL), RSS, llms.txt |
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
* **CookieBanner** — компактная карточка согласия на аналитику (ФЗ-152) внизу справа; выбор хранится 180 дней, сменить — `/#consent`
* **Stats** — 5 ключевых метрик с анимацией count-up при входе на экран
* **Projects** — все репозитории плиткой 3×2 (stars, forks, язык), без пейджера
* **Blog** — 350+ постов из Telegram `appsecta`; на главной последний пост крупно + 5 компактных, фильтры по тегам, карточка канала с подписчиками; `/blog/` с фильтрами по темам, поиском, избранным постом и «показать ещё» (статические страницы по 15 остаются для поисковиков); статические SEO-страницы `/blog/{id}/` (RU) и `/blog/en/{id}/` (EN); переключатель RU/EN
* **Videos** — YouTube-карточки: подкаст по безопасной разработке, интервью BISA
* **Experience** — карьера как конвейер: 7 узлов с логотипами на трубе red→gold и кольцами, текущий горит; наведение или тап по узлу показывает результаты этапа под трубой; вертикальная труба на телефонах
* **Hero** — позиционирующая строка, описание списком 2×2, чёрные пилюли логотипов, команды-ссылки в терминале после интро (`ls projects`, `tail blog`, `skills`, `contact`), кнопки скачивания с реальным прогрессом загрузки, водяной логотип и сетка на фоне; полоса «Сейчас» с живыми цифрами канала
* **Tools** — домены как чипы трёх уровней (ядро / сильное / рабочее), стек из 8 панелей с чипами инструментов; справа дипломы и сертификаты по резюме (первые четыре, остальные по кнопке)
* **Section headers** — единый `SectionHead`: eyebrow `// имя`, заголовок с glitch-typewriter, подзаголовок, действие справа
* **Instagram** — 8 последних постов (обложки кешируются в `public/img/instagram/`), ссылка на профиль
* **Contacts** — экран «Давай поговорим»: Telegram и копирование email с тостом, NFC-визитка с наклоном при наведении, ссылки профиля и контента; футер на нём без дублирующих колонок
* **Nav** — i18n (RU/EN), SVG бургер с морфингом, LangSwitch toggle, прогресс-линия (по экрану на десктопе, по скроллу на телефоне), активная пилюля секции (`aria-current`)
* **Кнопки** — PackageBtn (hacker glitch, единый стиль всех ссылок под лентой логотипов), ContactBtn (pill + status dot в цветах бренда), DownloadBtn (заливка круга = реальный прогресс `fetch`, fallback по времени без CORS), SocialIcons (slide-in SVG)
* **Responsive** — экраны на ≥901px (планшет-ландшафт 901–1300px плотнее, масштаб не ниже 0,85), документ на телефонах; ультравайд ≥2000px растит контент до 1,3; заголовок hero масштабируется от колонки (`cqi`); проверено Playwright на 1024/1280/1440/1920/2560/3440 от 390 до 2946 px
* **A11y** — skip-link, красное кольцо `:focus-visible`, `<main>` landmark, тап-таргеты 44 px на телефонах, `prefers-reduced-motion`
* **prefers-reduced-motion** — все анимации отключаются по системной настройке
* **404** — дино-раннер в стиле Chrome, стилизован под бренд
* **Privacy** — `/privacy/` статическая страница (ФЗ-152, cookie, права пользователя)

***

### Design System

100+ CSS-токенов в `:root` (App.css):

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
| `ci.yml` — **build** | push / PR → `gpages` | `YM_ID` | `npm ci` → `eslint` → `npm audit` → `npm run build` |
| `ci.yml` — **update-and-deploy** | cron Пн 07:00 UTC / manual | `YM_ID`, `DATA_PUSH_SSH_KEY` | TG + Instagram + stats → sitemap + RSS → коммит → build → blog pages → deploy gh-pages → ping Yandex |

Ручной запуск: `workflow_dispatch` с опцией `skip_data`.

Шаги данных не роняют деплой: Telegram и Instagram при недоступном источнике пишут `::warning` и оставляют коммитнутые данные (источник Instagram-превью отвечает HTTP 503 «blocked» с сентября 2026, данные заморожены на последнем успешном прогоне); переводы кешируются в `tg-posts.json`, переводится только новое.

Полный скрейп всех постов: `node scripts/update-tg-posts.js --all`

Hardening: pinned action SHA, least-privilege permissions (`contents: read` по умолчанию, `write` только для deploy).

***

### SEO и индексация

| Компонент | Описание |
|-----------|---------|
| `index.html` | JSON-LD Person / ProfilePage / WebSite / BreadcrumbList, OG, Twitter Card, geo, Яндекс.Вебмастер, canonical, hreflang RU/EN, LCP preload, 120+ keywords |
| `sitemap.xml` | ≈760 URL: главная + privacy + индексные страницы блога + RU и EN страницы всех постов; hreflang cross-links |
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
npm ci
npm start                  # React dev → http://localhost:3000
npm run build && node scripts/generate-blog-pages.js
npx serve build -l 4000   # Статика + блог → http://localhost:4000
```

Обновление данных:

```bash
node scripts/update-tg-posts.js        # Последние 20 постов (incremental merge)
node scripts/update-tg-posts.js --all  # ВСЕ посты (пагинация, разовый)
node scripts/update-instagram.js       # Instagram посты (источник отвечает 503 — данные заморожены)
node scripts/update-stats.js           # GitHub stars/forks
node scripts/generate-sitemap.js       # sitemap.xml (≈760 URL)
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
│   ├── sitemap.xml           # ≈760 URL с hreflang
│   ├── rss.xml / rss-en.xml  # RSS-фиды
│   ├── llms.txt              # AI-краулеры
│   ├── robots.txt            # Yandex + scrapers block
│   └── CNAME · .nojekyll · yandex_*.html  # Домен Pages, без Jekyll, верификация Вебмастера
├── src/
│   ├── components/
│   │   ├── SplashScreen.js   # Shader canvas + pretitle SVG (30 мин reshow)
│   │   ├── MainPage.js       # Корневой layout: восемь экранов, точки и счётчик, skip-link, <main>
│   │   ├── Nav.js            # SVG бургер морфинг, LangSwitch, i18n, прогресс-линия, активная пилюля по экрану
│   │   ├── CookieBanner.js   # Согласие на аналитику (180 дней, /#consent — сменить выбор)
│   │   ├── Hero.js           # Holographic monitor + typewriter + lead 2×2 + пилюли логотипов + кнопки + команды
│   │   ├── NowStrip.js       # Полоса «Сейчас» (тексты в i18n, цифры канала из данных)
│   │   ├── SectionHead.js    # Единый заголовок секции
│   │   ├── GlitchLabel.js    # Glitch typewriter для заголовков секций
│   │   ├── BrandColumn.js    # Каскадная анимация (forwardRef)
│   │   ├── Stats.js          # Count-up (requestAnimationFrame)
│   │   ├── Projects.js       # GitHub cards
│   │   ├── Blog.js           # Featured + 5 компактных, фильтры по тегам → /blog/{id}/
│   │   ├── Videos.js         # YouTube cards
│   │   ├── Experience.js     # Конвейер карьеры + панель результатов этапа
│   │   ├── Tools.js          # Домены-чипы + стек | дипломы + сертификаты
│   │   ├── Instagram.js      # 8 последних постов Instagram
│   │   ├── Contacts.js       # Экран контактов: CTA, NFC-визитка, группы ссылок, тост
│   │   ├── Footer.js         # 4 колонки + политика, смена выбора по cookie, RSS
│   │   └── SicParvisMagnaPill.js # Пилюля Sic Parvis Magna (BrandColumn)
│   ├── context/LangContext.js
│   ├── context/ScreenContext.js # «мой экран активен» для заголовков и счётчиков
│   ├── lib/consent.js        # Хранение согласия + загрузка Plausible/Метрики
│   ├── hooks/useMainAnimation.js # Интро: консоль, печать, появление групп
│   ├── hooks/useScreens.js   # Переключатель экранов: колесо/клавиши/свайп/#ссылки, подгонка масштаба
│   ├── hooks/useDownload.js  # Реальная загрузка с прогрессом для dl-btn
│   ├── i18n/translations.js  # RU/EN + nav + sections
│   ├── constants/index.js
│   ├── data/
│   │   ├── tg-posts.json     # 350+ постов Telegram (CI incremental, переводы кешируются в text_en)
│   │   └── instagram.json    # Instagram (CI)
│   └── styles/
│       ├── App.css           # 100+ design tokens (:root), токены движения
│       ├── Screens.css       # Экраны: раскладка, точки, водяной знак, планшет и ультравайд
│       ├── Contacts.css      # Экран контактов и NFC-визитка
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
│   ├── update-instagram.js   # Instagram + cleanup orphans (при 503 — ::warning, данные не трогает)
│   ├── update-stats.js       # GitHub API
│   ├── generate-sitemap.js   # ≈760 URL + hreflang + ping Yandex
│   ├── generate-rss.js       # RSS RU + EN
│   ├── generate-blog-pages.js # /blog/ (фильтры, поиск, показать ещё) + статические страницы + post pages (RU+EN)
│   └── deploy.js             # gh-pages (Node 25 compatible)
├── .github/
│   ├── workflows/ci.yml      # Build (push) · Weekly Update + Deploy (cron)
│   ├── dependabot.yml        # Пины actions + npm minor/patch; мажоры, которые CRA 5 не берёт, игнорируются
│   └── CODEOWNERS
├── LICENSE.md · NOTICE.md · SECURITY.md · CONTRIBUTING.md · CODE_OF_CONDUCT.md
├── package.json
└── README.md
```

***

Copyright (c) 2026 Elijah S Shmakov

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/img/logotype/logo_white.svg">
  <img src="public/img/logotype/logo_black.svg" alt="geminishkv" width="120">
</picture>
