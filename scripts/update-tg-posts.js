#!/usr/bin/env node
'use strict';

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const CHANNEL     = 'shmakovis_appsec';
const POSTS_COUNT = 4;
const OUTPUT      = path.join(__dirname, '../src/data/tg-posts.json');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(
      {
        hostname: parsed.hostname,
        path:     parsed.pathname + parsed.search,
        method:   'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; gpages-blog-updater/1.0)',
          Accept:       'text/html,application/xhtml+xml',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchPage(res.headers.location).then(resolve).catch(reject);
          return;
        }
        let data = '';
        res.on('data', c => { data += c; });
        res.on('end', () => resolve(data));
      },
    );
    req.on('error', reject);
    req.end();
  });
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g,  '&')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripTags(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '');
}

function parseHashtags(html) {
  const tags = [];
  const re   = /href="[^"]*%23([^"&]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    try { tags.push(decodeURIComponent(m[1]).toLowerCase()); } catch { /* skip */ }
  }
  return [...new Set(tags)];
}

function parseSubscribers(html) {
  const m = html.match(/counter_value">([\d\s]+)<\/span>\s*<span[^>]*>subscribers/);
  return m ? parseInt(m[1].replace(/\s/g, ''), 10) : 0;
}

function parsePosts(html) {
  const posts    = [];
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
    const views = viewsMatch
      ? parseInt(viewsMatch[1].replace(/[\u00a0\s]/g, ''), 10) || 0
      : 0;

    const textMatch = seg.match(
      /class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/,
    );
    if (!textMatch) continue;

    const rawHtml = textMatch[1];
    const tags    = parseHashtags(rawHtml);
    const rawText = stripTags(rawHtml);
    const text    = decodeEntities(rawText).replace(/\n{3,}/g, '\n\n').trim();
    if (!text) continue;

    const imgMatch = seg.match(
      /photo_wrap[^>]+style="[^"]*background-image:url\('([^']+)'\)/,
    );

    const post = {
      id:   postNum,
      text: text.slice(0, 1200),
      date,
      url:  `https://t.me/${CHANNEL}/${postNum}`,
      views,
      tags,
    };
    if (imgMatch) post.image = imgMatch[1];

    posts.push(post);
  }

  return posts.slice(-POSTS_COUNT).reverse();
}

async function main() {
  const url = `https://t.me/s/${CHANNEL}`;
  console.log(`Fetching ${url}…`);

  let html;
  try {
    html = await fetchPage(url);
  } catch (e) {
    console.error(`✗ Fetch failed: ${e.message}`);
    process.exit(1);
  }

  const posts       = parsePosts(html);
  const subscribers = parseSubscribers(html);

  if (posts.length === 0) {
    console.error('✗ No posts parsed — keeping existing file.');
    process.exit(0);
  }

  const output = { subscribers, posts };
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2) + '\n', 'utf8');

  console.log(`✓ ${subscribers} subscribers, ${posts.length} posts → ${OUTPUT}`);
  posts.forEach(p =>
    console.log(
      `  [${p.date}] #${p.id} 👁${p.views} [${p.tags.join(',')}]${p.image ? ' 🖼' : ''}: ` +
      p.text.slice(0, 60).replace(/\n/g, ' ') + '…',
    ),
  );
}

main().catch(e => { console.error(e); process.exit(1); });
