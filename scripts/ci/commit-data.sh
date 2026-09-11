#!/usr/bin/env bash
# Коммитит обновлённые данные сайта (блог, instagram, stats, sitemap, rss)
# и пушит их в ветку gpages. Запускается из CI (job update-and-deploy) и локально.
#   DRY_RUN=1      — показать дифф, ничего не коммитить
#   DATA_BRANCH    — целевая ветка (по умолчанию gpages)
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

BRANCH="${DATA_BRANCH:-gpages}"
PATHS=(
  src/data/tg-posts.json   public/img/blog
  src/data/instagram.json  public/img/instagram
  src/constants/index.js
  public/sitemap.xml public/index.html public/rss.xml public/rss-en.xml
)

git add -A -- "${PATHS[@]}"
if git diff --cached --quiet; then
  echo "[data] nothing to commit"
  exit 0
fi
git diff --cached --stat | tail -n 20

if [ "${DRY_RUN:-0}" = "1" ]; then
  echo "[data] DRY_RUN=1: commit and push skipped"
  git reset -q
  exit 0
fi

if [ "${GITHUB_ACTIONS:-}" = "true" ]; then
  git config user.name  "github-actions[bot]"
  git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
fi
git commit -q -m "chore(data): weekly update $(date -u +%Y-%m-%d)" \
  -m "Automated refresh: blog, instagram, stats, sitemap, RSS."
git push origin "HEAD:${BRANCH}"
echo "[data] pushed to ${BRANCH}"
