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
<img src="https://img.shields.io/github/last-commit/geminishkv/gpages_intro" alt="last commit">
<img src="https://img.shields.io/github/commit-activity/m/geminishkv/gpages_intro" alt="commit activity">
<img src="https://img.shields.io/github/issues-pr/geminishkv/gpages_intro" alt="pull requests">
<img src="https://img.shields.io/github/contributors/geminishkv/gpages_intro" alt="contributors">
</div>

***

<br>Салют 👋,</br>

Персональный портфолио-лендинг **Ильи Шмакова** — AppSec & DevSecOps инженера.
Сайт доступен по адресу: **[geminishkv.tech](https://geminishkv.tech)**

<div align="center"><h3>Sic Parvis Magna. Auxilio Divino</h3></div>

***

### Стек технологий

| Слой | Технология |
|------|-----------|
| UI-фреймворк | React 18 (CRA) |
| Анимации | anime.js 3.2.2 |
| Стили | CSS (custom properties, keyframes, clip-path) |
| Деплой | gh-pages 6.3.0 → GitHub Pages |
| Домен | geminishkv.tech (reg.ru + GitHub Pages custom domain) |
| SEO | JSON-LD Person schema, Open Graph, sitemap.xml, robots.txt |

***

### Функциональность

- **SplashScreen** — экран загрузки с глитч-анимацией на весь браузер (clip-path + RGB-каналы + scanlines)
- **Mac mockup** — покадровая анимация сборки ретро-Mac через anime.js timeline, прогресс-бар "Initializing"
- **Typewriter** — пошаговый набор заголовка по символам
- **Badges marquee** — бесконечный скролл логотипов слева направо
- **About modal** — полноэкранный попап с резюме, навыками, инструментами и достижениями
- **Burger menu** — адаптивное меню (bars-staggered) для мобильных устройств, portal-рендеринг
- **Responsive** — адаптив под мобильные (≤768px) и планшеты (≤900px)

***

### Структура репозитория

```
gpages_intro/
├── public/
│   ├── img/
│   │   ├── splash/
│   │   │   └── pretitle.png          # Заставка сплеш-экрана
│   │   ├── hero/
│   │   │   ├── logo2.png             # Логотип / favicon
│   │   │   ├── mac_ns.png            # Корпус ретро-Mac
│   │   │   ├── window3.png           # Скриншот в экране Mac
│   │   │   └── uwu.png               # Финальное изображение после загрузки
│   │   └── badges/
│   │       ├── lider.png
│   │       ├── lanit.png
│   │       ├── bmstu.png
│   │       ├── mpfi.png
│   │       └── rbpo.png
│   ├── CNAME                         # Кастомный домен GitHub Pages
│   ├── favicon.ico
│   ├── index.html                    # SEO: JSON-LD, OG, Twitter Card
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── SplashScreen.js           # Глитч-анимация перехода
│   │   ├── MainPage.js               # Корневой layout
│   │   ├── Nav.js                    # Навбар + burger menu (portal)
│   │   ├── Hero.js                   # Главный блок: текст + Mac + badges
│   │   ├── Footer.js
│   │   └── AboutModal.js             # Попап с резюме
│   ├── hooks/
│   │   └── useMainAnimation.js       # Вся логика anime.js (timeline)
│   ├── constants/
│   │   └── index.js                  # Пути к изображениям, текстовые константы
│   └── styles/
│       ├── App.css
│       ├── SplashScreen.css          # Глитч: clip-path, RGB-layers, scanlines
│       ├── MainPage.css
│       ├── Nav.css                   # Burger bars-staggered, mobile overlay
│       ├── Hero.css                  # Badges marquee, socials grid
│       ├── Mac.css                   # Mac mockup, progress bar
│       ├── Footer.css
│       └── AboutModal.css
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
git clone https://github.com/geminishkv/gpages_intro.git
cd gpages_intro
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

> После деплоя сайт доступен по адресу [geminishkv.tech](https://geminishkv.tech)
> Файл `public/CNAME` обеспечивает сохранение кастомного домена после каждого деплоя.

***

### SEO и индексация

Сайт настроен для индексации в Google и Яндекс:

- `index.html` — JSON-LD Person schema, Open Graph, Twitter Card, canonical URL
- `public/robots.txt` — разрешения для Googlebot и Yandex
- `public/sitemap.xml` — карта сайта с hreflang

***

Copyright (c) 2026 Elijah S Shmakov
