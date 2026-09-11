#!/usr/bin/env node
'use strict';

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const CHANNEL     = 'appsecta';
const OUTPUT      = path.join(__dirname, '../src/data/tg-posts.json');
const IMG_DIR     = path.join(__dirname, '../public/img/blog');

/* ── fetch helpers ── */

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    https.get({
      hostname: parsed.hostname,
      path:     parsed.pathname + parsed.search,
      headers:  { 'User-Agent': 'Mozilla/5.0' },
    }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchPage(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString()));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ── translation ── */

function translateChunk(text) {
  return new Promise(resolve => {
    const encoded = encodeURIComponent(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=en&dt=t&q=${encoded}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const body = JSON.parse(Buffer.concat(chunks).toString());
          resolve(body[0].map(s => s[0]).join(''));
        } catch { resolve(null); }
      });
      res.on('error', () => resolve(null));
    }).on('error', () => resolve(null));
  });
}

async function translateText(text) {
  const paragraphs = text.split('\n');
  let batch = '', result = [];
  for (const line of paragraphs) {
    const next = batch ? batch + '\n' + line : line;
    if (encodeURIComponent(next).length > 900 && batch) {
      const t = await translateChunk(batch);
      if (!t) return null;
      result.push(t);
      batch = line;
      await sleep(300);
    } else {
      batch = next;
    }
  }
  if (batch) {
    const t = await translateChunk(batch);
    if (!t) return null;
    result.push(t);
  }
  return result.join('\n');
}

/* ── image download ── */

function downloadImage(url, dest) {
  return new Promise(resolve => {
    const parsed = new URL(url);
    const req = https.get({
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: { 'User-Agent': 'Mozilla/5.0' },
    }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
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
    });
    req.on('error', () => resolve(false));
    req.end();
  });
}

/* ── HTML parsing ── */

function stripTags(html) {
  return html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
}

function decodeEntities(text) {
  return text.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g,' ');
}

function parseHashtags(html) {
  const raw = [...html.matchAll(/href="[^"]*\?q=%23([^"]+)"/g)].map(m => decodeURIComponent(m[1]).toLowerCase());
  return [...new Set(raw)];
}

function parseSubscribers(html) {
  const m = html.match(/counter_value">([\d\s]+)<\/span>\s*<span[^>]*>subscribers/);
  return m ? parseInt(m[1].replace(/\s/g, ''), 10) : 0;
}

function parsePosts(html) {
  const posts = [];
  const segments = html.split('data-post="');
  for (let i = 1; i < segments.length; i++) {
    const seg = segments[i];
    const idMatch = seg.match(/^([^"]+)"/);
    if (!idMatch) continue;
    const postNum = idMatch[1].split('/')[1];
    if (!postNum || !/^\d+$/.test(postNum)) continue;

    const dateMatch = seg.match(/datetime="([^"]+)"/);
    const date = dateMatch ? dateMatch[1].slice(0, 10) : null;

    const viewsMatch = seg.match(/message_views">([\d\u00a0\s]+)/);
    const views = viewsMatch ? parseInt(viewsMatch[1].replace(/[\u00a0\s]/g, ''), 10) || 0 : 0;

    const textMatch = seg.match(/class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/);
    if (!textMatch) continue;

    const rawHtml = textMatch[1];
    const tags    = parseHashtags(rawHtml);
    const rawText = stripTags(rawHtml);
    const text    = decodeEntities(rawText).replace(/\n{3,}/g, '\n\n').trim();
    if (!text) continue;

    const imgMatch = seg.match(/photo_wrap[^>]+style="[^"]*background-image:url\('([^']+)'\)/);

    const post = { id: postNum, text, date, url: `https://t.me/${CHANNEL}/${postNum}`, views, tags };
    if (imgMatch) post.image = imgMatch[1];
    posts.push(post);
  }
  return posts;
}

function getMinId(posts) {
  let min = Infinity;
  for (const p of posts) { const n = parseInt(p.id, 10); if (n < min) min = n; }
  return min;
}

/* ── main ── */

async function main() {
  const fullScrape = process.argv.includes('--all');
  const baseUrl = `https://t.me/s/${CHANNEL}`;

  console.log(`Fetching ${baseUrl}${fullScrape ? ' (full scrape with pagination)' : ''}…`);

  let allPosts = [];
  let subscribers = 0;
  let url = baseUrl;
  let page = 1;

  while (true) {
    let html;
    try { html = await fetchPage(url); } catch (e) {
      console.error(`✗ Fetch failed: ${e.message}`);
      break;
    }

    if (page === 1) subscribers = parseSubscribers(html);
    const pagePosts = parsePosts(html);
    console.log(`  page ${page}: ${pagePosts.length} posts`);

    if (pagePosts.length === 0) break;
    allPosts.push(...pagePosts);

    if (!fullScrape) break; // only latest page for weekly updates

    const minId = getMinId(pagePosts);
    if (minId <= 1) break;

    url = `${baseUrl}?before=${minId}`;
    page++;
    await sleep(500);
  }

  // Nothing fetched: t.me/s/<channel> redirects to the plain contact page when the
  // web preview is unavailable. Keep the committed data instead of writing zeros.
  if (allPosts.length === 0) {
    console.warn(`::warning::Telegram preview for @${CHANNEL} returned no posts — keeping ${OUTPUT} untouched.`);
    process.exit(0);
  }

  // Deduplicate by id, newest first
  const byId = new Map();
  for (const p of allPosts) byId.set(p.id, p);

  // Merge with existing data (keep translations, images)
  let existingById = {};
  if (fs.existsSync(OUTPUT)) {
    try {
      const existing = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
      // The counter is missing from a redirected page; never downgrade it to 0.
      if (!subscribers && existing.subscribers) subscribers = existing.subscribers;
      for (const p of (existing.posts ?? [])) {
        existingById[p.id] = p;
        // Keep old posts that weren't in this scrape (pagination didn't reach them)
        if (!byId.has(p.id)) byId.set(p.id, p);
      }
    } catch { /* ignore */ }
  }

  // Sort newest first
  const posts = [...byId.values()].sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));
  // Post ids survive a channel rename; rebuild the links so old entries follow CHANNEL.
  for (const p of posts) p.url = `https://t.me/${CHANNEL}/${p.id}`;

  if (posts.length === 0) {
    console.error('✗ No posts — keeping existing file.');
    process.exit(0);
  }

  // Download images
  fs.mkdirSync(IMG_DIR, { recursive: true });
  for (const post of posts) {
    // Skip if already has local image
    if (post.image && post.image.startsWith('/img/')) continue;
    if (!post.image) continue;

    const ext  = post.image.match(/\.(jpe?g|png|webp)/i)?.[1] ?? 'jpg';
    const dest = path.join(IMG_DIR, `${post.id}.${ext}`);
    if (fs.existsSync(dest)) {
      post.image = `/img/blog/${post.id}.${ext}`;
      continue;
    }
    const ok = await downloadImage(post.image, dest);
    if (ok) {
      post.image = `/img/blog/${post.id}.${ext}`;
      console.log(`  ✓ image ${post.id}.${ext}`);
    } else {
      console.warn(`  ✗ image ${post.id} — keeping CDN url`);
    }
  }

  // Translate missing
  console.log('Translating posts to English…');
  for (const post of posts) {
    const cached = existingById[post.id];
    if (post.text_en) { continue; } // already translated (from merge)
    if (cached?.text_en && cached.text === post.text) {
      post.text_en = cached.text_en;
      console.log(`  ↩ cached #${post.id}`);
      continue;
    }
    await sleep(500);
    const translated = await translateText(post.text);
    if (translated) {
      post.text_en = translated;
      console.log(`  ✓ translated #${post.id}`);
    } else {
      console.warn(`  ✗ translation failed #${post.id}`);
    }
  }

  const output = { subscribers, posts };
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + '\n', 'utf8');

  console.log(`✓ ${subscribers} subscribers, ${posts.length} posts → ${OUTPUT}`);
  posts.forEach(p =>
    console.log(
      `  [${p.date}] #${p.id} 👁${p.views} [${p.tags?.join(',') || ''}]${p.image ? ' 🖼' : ''}: ` +
      p.text.slice(0, 60).replace(/\n/g, ' ') + '…',
    ),
  );
}

main().catch(e => { console.error(e); process.exit(1); });
