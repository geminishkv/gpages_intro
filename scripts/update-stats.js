#!/usr/bin/env node
'use strict';

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const OWNER = 'geminishkv';
const REPOS = [
  'oss_toolchainmap',
  'course_labs',
  'sbom_genform',
  'semgrep_java_custom_ruleset',
  'geoip-tool',
];

function fetchRepo(name) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path:     `/repos/${OWNER}/${name}`,
      method:   'GET',
      headers: {
        'User-Agent': 'gpages-stats-updater',
        'Accept':     'application/vnd.github.v3+json',
        ...(process.env.GH_TOKEN
          ? { Authorization: `Bearer ${process.env.GH_TOKEN}` }
          : {}),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        try   { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const constantsPath = path.join(__dirname, '../src/constants/index.js');
  let content = fs.readFileSync(constantsPath, 'utf8');
  let changed = false;

  for (const name of REPOS) {
    let data;
    try {
      data = await fetchRepo(name);
    } catch (e) {
      console.error(`  ✗ ${name}: ${e.message}`);
      continue;
    }

    if (data.message) {
      console.error(`  ✗ ${name}: GitHub API — ${data.message}`);
      continue;
    }

    const stars = data.stargazers_count ?? 0;
    const forks = data.forks_count      ?? 0;

    // Replace stars and forks within this repo's block.
    // Pattern: after "name: 'reponame'" find "stars: N" and "forks: N"
    const escapedName = name.replace(/[-]/g, '\\-');

    const starsRe = new RegExp(
      `(name:\\s*'${escapedName}'[\\s\\S]*?stars:\\s*)\\d+`,
    );
    const forksRe = new RegExp(
      `(name:\\s*'${escapedName}'[\\s\\S]*?forks:\\s*)\\d+`,
    );

    const newContent = content
      .replace(starsRe, `$1${stars}`)
      .replace(forksRe, `$1${forks}`);

    if (newContent !== content) changed = true;
    content = newContent;

    console.log(`  ✓ ${name}: ★${stars}  ⑂${forks}`);
  }

  if (changed) {
    fs.writeFileSync(constantsPath, content, 'utf8');
    console.log('\nConstants updated.');
  } else {
    console.log('\nNo changes.');
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
