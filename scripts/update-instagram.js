#!/usr/bin/env node
'use strict';

/**
 * Fetches last 8 Instagram posts for geminishkv via boostfluence.com free API.
 * No auth / no secrets required — public profile scraper.
 * Outputs: src/data/instagram.json + thumbnails to public/img/instagram/
 */

const https = require('https');
const zlib  = require('zlib');
const fs    = require('fs');
const path  = require('path');

const USERNAME    = 'geminishkv';
const POSTS_FETCH = 10;  // fetch extra to allow skipping
const POSTS_COUNT =  8;  // final count to keep (skip positions 0 and 7)
const OUTPUT      = path.join(__dirname, '../src/data/instagram.json');
const IMG_DIR     = path.join(__dirname, '../public/img/instagram');

const PROFILE_URL = 'https://www.instagram.com/geminishkv';
const API_URL     = 'https://api.boostfluence.com/api/instagram-viewer-v2-2';
const ORIGIN      = 'https://www.boostfluence.com';
const REFERER     = 'https://www.boostfluence.com/free-tools/instagram-profile-viewer';
const UA          = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function post(urlStr, body, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const parsed  = new URL(urlStr);
    const payload = JSON.stringify(body);
    const req = https.request(
      {
        hostname: parsed.hostname,
        path:     parsed.pathname + parsed.search,
        method:   'POST',
        headers: {
          'Content-Type':    'application/json',
          'Content-Length':  Buffer.byteLength(payload),
          'User-Agent':      UA,
          'Accept':          '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Origin':          ORIGIN,
          'Referer':         REFERER,
          ...extraHeaders,
        },
      },
      (res) => {
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
      },
    );
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('timeout')); });
    req.write(payload);
    req.end();
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve) => {
    const parsed = new URL(url);
    const req = https.request(
      {
        hostname: parsed.hostname,
        path:     parsed.pathname + parsed.search,
        method:   'GET',
        headers:  { 'User-Agent': UA, 'Referer': ORIGIN },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          downloadImage(res.headers.location, dest).then(resolve);
          return;
        }
        if (res.statusCode !== 200) { resolve(false); return; }
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          try { fs.writeFileSync(dest, Buffer.concat(chunks)); resolve(true); }
          catch { resolve(false); }
        });
      },
    );
    req.on('error', () => resolve(false));
    req.setTimeout(20000, () => { req.destroy(); resolve(false); });
    req.end();
  });
}

function cleanupOrphanImages(dir, validIds) {
  if (!fs.existsSync(dir)) return;
  let removed = 0;
  for (const file of fs.readdirSync(dir)) {
    if (file.startsWith('.')) continue;
    const base = path.parse(file).name;
    if (!validIds.has(base)) {
      fs.unlinkSync(path.join(dir, file));
      removed++;
    }
  }
  if (removed > 0) console.log(`  🗑 Removed ${removed} orphan image(s)`);
}

async function fetchPosts() {
  // Step 1: get compute challenge (returns HTTP 403)
  const r1 = await post(API_URL, { username: USERNAME });
  let parsed;
  try { parsed = JSON.parse(r1.body); } catch { parsed = {}; }

  if (parsed?.error === 'COMPUTE_REQUIRED') {
    const { timestamp, expectedCompute } = parsed.challenge;
    console.log(`  Challenge: compute=${expectedCompute}`);

    // Step 2: repeat with compute headers (returns HTTP 200 with posts)
    const r2 = await post(API_URL, { username: USERNAME, count: POSTS_FETCH }, {
      'X-Compute':   String(expectedCompute),
      'X-Timestamp': String(timestamp),
    });

    if (r2.status !== 200) {
      throw new Error(`API error after challenge: HTTP ${r2.status} — ${r2.body.slice(0, 200)}`);
    }

    return JSON.parse(r2.body);
  }

  if (r1.status !== 200) {
    throw new Error(`Unexpected HTTP ${r1.status}: ${r1.body.slice(0, 200)}`);
  }

  return parsed;
}

async function main() {
  console.log(`Fetching Instagram posts for @${USERNAME} via boostfluence…`);

  let data;
  try {
    data = await fetchPosts();
  } catch (e) {
    console.error(`✗ ${e.message}`);
    process.exit(1);
  }

  // Fetch 10, skip positions 0 and 7 (originally 1st and 8th), take next 8
  const all = data.posts ?? [];
  const raw = [...all.slice(1, 7), ...all.slice(8, 10)].slice(0, POSTS_COUNT);
  if (raw.length === 0) {
    console.warn('⚠ No posts returned — keeping existing data.');
    process.exit(0);
  }

  fs.mkdirSync(IMG_DIR, { recursive: true });

  // Collect old image IDs to clean up later
  const oldIds = new Set();
  if (fs.existsSync(OUTPUT)) {
    try {
      const old = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
      for (const p of (old.posts ?? [])) oldIds.add(p.id);
    } catch { /* ignore */ }
  }

  const posts = [];
  for (let i = 0; i < raw.length; i++) {
    const p      = raw[i];
    const ts     = p.taken_at_date ? new Date(p.taken_at_date).getTime() : Date.now() - i;
    const id     = String(ts);
    const imgUrl = p.mediaUrls?.[0]?.url ?? null;
    const dest   = path.join(IMG_DIR, `${id}.jpg`);

    let localPath = null;
    if (fs.existsSync(dest) && fs.statSync(dest).size > 500) {
      localPath = `/img/instagram/${id}.jpg`;
      console.log(`  ✓ ${id} (cached)`);
    } else if (imgUrl) {
      const ok = await downloadImage(imgUrl, dest);
      if (ok) {
        localPath = `/img/instagram/${id}.jpg`;
        console.log(`  ✓ ${id}.jpg`);
      } else {
        console.warn(`  ✗ ${id} — download failed`);
      }
    }

    posts.push({
      id,
      url:       PROFILE_URL,
      image:     localPath,
      caption:   (p.caption ?? '').slice(0, 120).replace(/\n/g, ' ').trim(),
      timestamp: ts,
    });
  }

  // Remove ALL images not in the new set (old + orphan)
  const newIds = new Set(posts.map(p => p.id));
  cleanupOrphanImages(IMG_DIR, newIds);

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify({ posts }, null, 2) + '\n', 'utf8');
  console.log(`✓ ${posts.length} posts saved → ${OUTPUT}`);
}

main().catch(e => { console.error(e); process.exit(1); });
