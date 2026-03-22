#!/usr/bin/env node
'use strict';

/**
 * Fetches gaming stats:
 *  - PSN: stratege.ru AJAX (games list + cover images) + TrueTrophies (profile stats)
 *  - Xbox: xboxgamertag.com (game list + cover images)
 * Outputs: src/data/gaming.json
 *
 * Requires STRATEGE_COOKIE env var (vBulletin session from logged-in browser)
 * for PSN game covers. Stats fallback to TrueTrophies (curl + Cloudflare bypass).
 */

const { execFileSync } = require('child_process');
const https = require('https');
const http  = require('http');
const zlib  = require('zlib');
const fs    = require('fs');
const path  = require('path');
const os    = require('os');

const XBOX_ID         = 'geminishkv';
const STRATEGE_USER   = 'gshkv';
const STRATEGE_UID    = '77589';
const TT_ID           = 'geminishkv';
const PSN_ID          = 'geminishkv';
const OUTPUT          = path.join(__dirname, '../src/data/gaming.json');
const IMG_DIR         = path.join(__dirname, '../public/img/gaming/psn');
const IMG_DIR_XBOX    = path.join(__dirname, '../public/img/gaming/xbox');
const STRATEGE_COOKIE = process.env.STRATEGE_COOKIE || '';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// ── curl-based fetcher ─────────────────────────────────────────────

function curlFetch(url, { referer = '', cookie = '', post = '', jar = null } = {}) {
  const jarPath = jar || path.join(os.tmpdir(), `gaming_jar_${Date.now()}.txt`);
  const args = [
    '-s', '--compressed', '--max-time', '30', '--location',
    '-c', jarPath, '-b', jarPath,
    '-A', UA,
    '-H', 'Accept: text/html,application/xhtml+xml,*/*;q=0.9',
    '-H', 'Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    '-w', '\n__HTTPSTATUS__%{http_code}',
  ];
  if (referer) args.push('-H', `Referer: ${referer}`);
  if (cookie)  args.push('-H', `Cookie: ${cookie}`);
  if (post) {
    args.push('-X', 'POST');
    args.push('-H', 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8');
    args.push('-H', 'X-Requested-With: XMLHttpRequest');
    args.push('--data-raw', post);
  }
  args.push(url);

  try {
    const raw = execFileSync('curl', args, {
      encoding:  'utf8',
      maxBuffer: 12 * 1024 * 1024,
      timeout:   35000,
    });
    const sep    = raw.lastIndexOf('\n__HTTPSTATUS__');
    const status = sep >= 0 ? parseInt(raw.slice(sep + 15)) : 200;
    const body   = sep >= 0 ? raw.slice(0, sep) : raw;
    return { status, body, jarPath };
  } catch {
    return { status: 0, body: '', jarPath };
  }
}

// ── Node.js https fetcher ──────────────────────────────────────────

function nodeFetch(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const lib = parsed.protocol === 'https:' ? https : http;
    const req = lib.request(
      {
        hostname: parsed.hostname,
        path:     parsed.pathname + parsed.search,
        method:   'GET',
        headers: {
          'User-Agent':      UA,
          'Accept':          'text/html,application/xhtml+xml,*/*;q=0.9',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
        },
      },
      res => {
        const loc = res.headers['location'];
        if (res.statusCode >= 300 && res.statusCode < 400 && loc) {
          res.resume();
          const next = loc.startsWith('http') ? loc : `https://${parsed.hostname}${loc}`;
          return nodeFetch(next).then(resolve).catch(reject);
        }
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          const buf = Buffer.concat(chunks);
          const enc = res.headers['content-encoding'] || '';
          try {
            const text = enc === 'gzip'    ? zlib.gunzipSync(buf).toString('utf8')
                       : enc === 'deflate' ? zlib.inflateSync(buf).toString('utf8')
                       : enc === 'br'      ? zlib.brotliDecompressSync(buf).toString('utf8')
                       : buf.toString('utf8');
            resolve({ status: res.statusCode, body: text });
          } catch {
            resolve({ status: res.statusCode, body: buf.toString('utf8') });
          }
        });
      }
    );
    req.on('error', reject);
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('timeout')); });
    req.end();
  });
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&quot;/g,'"').replace(/&#39;/g,"'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
}

// ── TrueTrophies parsers ───────────────────────────────────────────

function parseTTProfile(html) {
  const r = { level: 0, levelPercent: 0, platinum: 0, gold: 0, silver: 0, bronze: 0, total: 0 };
  const lm = html.match(/PSN Level:\s*(\d+)/);
  if (lm) r.level = parseInt(lm[1], 10);
  for (const [key, name] of [['platinum','platinum'],['gold','gold'],['silver','silver'],['bronze','bronze']]) {
    const m = html.match(new RegExp(`title="(\\d[\\d,]*) ${name} trophies unlocked"`, 'i'));
    if (m) r[key] = parseInt(m[1].replace(/,/g,''), 10);
  }
  r.total = r.platinum + r.gold + r.silver + r.bronze;
  return r;
}

// ── Stratege.ru PSN platinum wall parser ──────────────────────────
//
// Response HTML structure (inside div.pupfpc_platinum_card):
//   <span><a href="/ps5/games/.../trophies/...">
//     <img src="https://static.stratege.ru/trophies/NPWR.../TROP000_w50h50.PNG"
//          alt="Game Title - получен: дата" class="pupfpc_up" />
//   </a></span>
//
// We download w100h100 versions locally (w50h50 and larger sizes ≥150 are placeholders).

function parseStrategeGames(html) {
  const games = [];

  // Find the platinum wall section
  const sectionStart = html.indexOf('pupfid_platinum_card');
  if (sectionStart === -1) return games;
  const sectionEnd = html.indexOf('id="pupfmgid_', sectionStart) || sectionStart + 200000;
  const section = html.slice(sectionStart, sectionEnd);

  // Match each platinum trophy image
  const re = /<img[^>]+src="(https:\/\/static\.stratege\.ru\/trophies\/(NPWR[^\/]+)\/TROP000[^"]*\.PNG)"[^>]+alt="([^"]+)"/gi;
  let m;
  while ((m = re.exec(section)) !== null) {
    const srcUrl  = m[1].replace(/TROP000[^.]*\.PNG/i, 'TROP000_w100h100.PNG');
    const npwrId  = m[2];  // e.g. NPWR38489_00
    const title   = decodeEntities(m[3].replace(/\s*-\s*получен:.*$/i, '').trim());
    if (title && !games.find(g => g.npwrId === npwrId)) {
      games.push({ title, npwrId, srcUrl });
    }
  }

  return games;
}

// ── Download PSN trophy images locally ────────────────────────────

function downloadPsnImages(games, cookie) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  let downloaded = 0, skipped = 0;

  for (const game of games) {
    const localFile = path.join(IMG_DIR, `${game.npwrId}.png`);
    if (fs.existsSync(localFile)) { skipped++; continue; }

    const args = [
      '-s', '--max-time', '15',
      '-H', `Cookie: ${cookie}`,
      '-H', 'Referer: https://stratege.ru/',
      '-o', localFile,
      game.srcUrl,
    ];
    try {
      execFileSync('curl', args, { timeout: 20000 });
      // Verify it's not a placeholder (placeholder is ~36KB, real icons are <20KB)
      const size = fs.statSync(localFile).size;
      if (size > 20000) {
        fs.unlinkSync(localFile);  // discard placeholder
      } else {
        downloaded++;
      }
    } catch {
      try { fs.unlinkSync(localFile); } catch { /* ignore */ }
    }
  }

  console.log(`  ✓ Downloaded ${downloaded} new images, ${skipped} already cached`);
}

// ── Map games to local image paths ────────────────────────────────

function mapToLocalPaths(games) {
  return games.map(({ title, npwrId }) => {
    const localFile = path.join(IMG_DIR, `${npwrId}.png`);
    const image = fs.existsSync(localFile) ? `/img/gaming/psn/${npwrId}.png` : null;
    return { title, image };  // include all — component handles null-image fallback
  });
}

// ── Stratege.ru profile stats parser ──────────────────────────────

function parseStrategeStats(html) {
  const r = { level: 0, levelPercent: 0, platinum: 0, gold: 0, silver: 0, bronze: 0, total: 0 };

  // Level: look for level number in various formats
  const lm = html.match(/(?:уровень|level)[^0-9]*(\d+)/i)
          || html.match(/<span[^>]*class="[^"]*level[^"]*"[^>]*>(\d+)/i)
          || html.match(/★\s*(\d+)/);
  if (lm) r.level = parseInt(lm[1], 10);

  // Trophy counts
  const platM = html.match(/class="[^"]*platinum[^"]*"[^>]*>\s*(\d[\d\s]*)/i)
             || html.match(/platinum[^0-9]*?(\d+)/i);
  if (platM) r.platinum = parseInt(platM[1].replace(/\s/g,''), 10);

  const goldM = html.match(/class="[^"]*gold[^"]*"[^>]*>\s*(\d[\d\s]*)/i)
             || html.match(/gold[^0-9]*?(\d+)/i);
  if (goldM) r.gold = parseInt(goldM[1].replace(/\s/g,''), 10);

  const silvM = html.match(/class="[^"]*silver[^"]*"[^>]*>\s*(\d[\d\s]*)/i);
  if (silvM) r.silver = parseInt(silvM[1].replace(/\s/g,''), 10);

  const bronM = html.match(/class="[^"]*bronze[^"]*"[^>]*>\s*(\d[\d\s]*)/i);
  if (bronM) r.bronze = parseInt(bronM[1].replace(/\s/g,''), 10);

  r.total = r.platinum + r.gold + r.silver + r.bronze;
  return r;
}

// ── Download Xbox game covers locally ─────────────────────────────

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

function downloadXboxImages(games) {
  fs.mkdirSync(IMG_DIR_XBOX, { recursive: true });
  let downloaded = 0, skipped = 0;
  for (const game of games) {
    if (!game.image) continue;
    const slug      = slugify(game.title);
    const localFile = path.join(IMG_DIR_XBOX, `${slug}.jpg`);
    if (fs.existsSync(localFile)) {
      game.localImage = `/img/gaming/xbox/${slug}.jpg`;
      skipped++;
      continue;
    }
    try {
      execFileSync('curl', ['-s', '--max-time', '15', '-L', '-o', localFile, game.image], { timeout: 20000 });
      const size = fs.statSync(localFile).size;
      if (size > 500) {
        game.localImage = `/img/gaming/xbox/${slug}.jpg`;
        downloaded++;
      } else {
        fs.unlinkSync(localFile);
      }
    } catch {
      try { fs.unlinkSync(localFile); } catch { /* ignore */ }
    }
  }
  console.log(`  ✓ Downloaded ${downloaded} new Xbox covers, ${skipped} already cached`);
}

// ── Xbox parsers ───────────────────────────────────────────────────

function parseXboxStats(html) {
  const gsM = html.match(/Gamerscore[\s\S]{0,80}?([\d,]+)/i);
  const gamerscore = gsM ? parseInt(gsM[1].replace(/,/g,''), 10) : 0;
  const glM = html.match(/Games Played[\s\S]{0,80}?(\d+)/i);
  const games = glM ? parseInt(glM[1], 10) : 0;
  return { gamerscore, games };
}

function parseXboxGames(html) {
  const games = [];
  const parts = html.split('<div class="game-card">');
  for (let i = 1; i < parts.length; i++) {
    const p = parts[i];
    const imgM = p.match(/background-image:\s*url\(['"]?\/\/images\.weserv\.nl\/\?url=([^&'"]+)/i);
    let image = '';
    if (imgM) {
      const raw = decodeURIComponent(imgM[1]);
      image = raw.startsWith('http') ? raw : 'https:' + raw;
    }
    const titleM = p.match(/<h3>([\s\S]*?)<\/h3>/);
    if (!titleM) continue;
    const title = decodeEntities(titleM[1].trim());
    const gsM = p.match(/Gamerscore[\s\S]{0,200}?font-weight-bold">\s*([\d,]+)\s*\/\s*([\d,]+)/i);
    const gameScore = gsM ? parseInt(gsM[1].replace(/,/g,''), 10) : 0;
    const maxScore  = gsM ? parseInt(gsM[2].replace(/,/g,''), 10) : 0;
    const pctM = p.match(/aria-valuenow="([^"]+)"/);
    const pct  = pctM ? parseFloat(pctM[1]) : 0;
    if (title) games.push({ title, image, gameScore, maxScore, pct });
  }
  return games;
}

// ── Main ──────────────────────────────────────────────────────────

async function main() {
  let existing = { psn: {}, xbox: {}, platinums: [], xboxGames: [] };
  try { existing = JSON.parse(fs.readFileSync(OUTPUT, 'utf8')); } catch { /* use defaults */ }

  const psn     = { id: PSN_ID,  ...existing.psn  };
  const xbox    = { id: XBOX_ID, ...existing.xbox };
  let platinums = existing.platinums ?? [];
  let xboxGames = existing.xboxGames ?? [];

  const profilePageUrl = `https://stratege.ru/playstation/users/${STRATEGE_USER}/games`;
  const ajaxUrl        = 'https://stratege.ru/ajax_loader/users_profile_fw';
  const ajaxParams     = `ajax_mode=profile_all_loader&action=all_page&firmware=1&uid=${STRATEGE_UID}&sort=0&type=current&compare=&page=0`;

  /* ── 1. PSN: stratege.ru AJAX (requires STRATEGE_COOKIE) ── */
  if (STRATEGE_COOKIE) {
    console.log('Fetching PSN data from stratege.ru…');

    // Step 1: load the profile page to acquire Drupal session cookie
    const { jarPath } = curlFetch(profilePageUrl, { cookie: STRATEGE_COOKIE });

    // Step 2: POST AJAX request with both user cookie and jar session
    const { status: sA, body: bA } = curlFetch(ajaxUrl, {
      referer: profilePageUrl,
      cookie:  STRATEGE_COOKIE,
      post:    ajaxParams,
      jar:     jarPath,
    });

    console.log(`  HTTP ${sA}, body length ${bA.length}`);

    if (sA === 200 && bA.length > 500 && !bA.includes('Ошибка построения') && !bA.includes('__CF$cv$params')) {
      // Debug dump
      const dumpPath = path.join(os.tmpdir(), 'stratege_response.html');
      fs.writeFileSync(dumpPath, bA, 'utf8');
      console.log(`  Debug: response saved to ${dumpPath}`);

      const parsed = parseStrategeGames(bA);
      if (parsed.length > 0) {
        console.log(`  ✓ ${parsed.length} PSN games parsed — downloading images…`);
        downloadPsnImages(parsed, STRATEGE_COOKIE);
        platinums = mapToLocalPaths(parsed);
        console.log(`  ✓ ${platinums.length} games with local images`);
      } else {
        console.log('  ⚠ Games parsed: 0 — check response structure');
        console.log('  Response preview:', bA.slice(0, 800).replace(/\n/g, ' '));
      }

      // Parse stats if present in response
      const stats = parseStrategeStats(bA);
      if (stats.platinum > 0 || stats.total > 0) {
        Object.assign(psn, stats);
        console.log(`  ✓ Stats: L${psn.level} 🏆${psn.platinum} 🥇${psn.gold} 🥈${psn.silver} 🥉${psn.bronze}`);
      }

      try { fs.unlinkSync(jarPath); } catch { /* ignore */ }
    } else {
      console.log(`  ⚠ AJAX failed (${sA}) — keeping existing`);
      if (bA.length < 1000) console.log('  Response:', bA.slice(0, 300));
    }
  } else {
    console.log('STRATEGE_COOKIE not set — skipping PSN games from stratege.ru');
  }

  /* ── 2. PSN stats fallback: TrueTrophies (curl, Cloudflare bypass) ── */
  if (!psn.platinum || psn.platinum === 0) {
    console.log('Fetching PSN stats from TrueTrophies (fallback)…');
    const ttJar = path.join(os.tmpdir(), `tt_jar_${Date.now()}.txt`);
    const profileUrl = `https://www.truetrophies.com/gamer/${TT_ID}`;
    const { status: s1, body: b1 } = curlFetch(profileUrl, { jar: ttJar });
    if (s1 === 200 && b1.length > 1000 && !b1.includes('__CF$cv$params')) {
      const p = parseTTProfile(b1);
      if (p.platinum > 0 || p.total > 0) {
        Object.assign(psn, p);
        console.log(`  ✓ L${psn.level} · 🏆${psn.platinum} 🥇${psn.gold} 🥈${psn.silver} 🥉${psn.bronze} = ${psn.total}`);
      } else {
        console.log('  ⚠ No trophy data parsed');
      }
    } else {
      console.log(`  ⚠ HTTP ${s1} or CF challenge`);
    }
    try { fs.unlinkSync(ttJar); } catch { /* ignore */ }
  }

  /* ── 3. Xbox: xboxgamertag.com ── */
  console.log(`Fetching Xbox data for ${XBOX_ID}…`);
  try {
    const { status: s3, body: b3 } = await nodeFetch(`https://xboxgamertag.com/search/${XBOX_ID}`);
    if (s3 === 200 && b3.length > 1000) {
      const stats = parseXboxStats(b3);
      if (stats.gamerscore > 0 || stats.games > 0) {
        xbox.gamerscore = stats.gamerscore;
        xbox.games      = stats.games;
        console.log(`  ✓ Gamerscore: ${xbox.gamerscore.toLocaleString()}, Games: ${xbox.games}`);
      }
      const games = parseXboxGames(b3);
      if (games.length > 0) {
        downloadXboxImages(games);
        xboxGames = games.map(({ title, localImage, gameScore, maxScore, pct }) => ({
          title, image: localImage || null, gameScore, maxScore, pct,
        }));
        console.log(`  ✓ ${games.length} Xbox games found, ${xboxGames.filter(g => g.image).length} with covers`);
      } else {
        console.log('  ⚠ No Xbox games parsed');
      }
    } else {
      console.log(`  ⚠ HTTP ${s3} — keeping existing`);
    }
  } catch (e) { console.log(`  ✗ ${e.message} — keeping existing`); }

  const output = { psn, xbox, platinums, xboxGames };
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`\n✓ gaming.json: PSN L${psn.level} 🏆${psn.platinum} (${platinums.length} games), Xbox ${(xbox.gamerscore||0).toLocaleString()}G (${xboxGames.length} games)`);
}

main().catch(e => { console.error(e); process.exit(1); });
