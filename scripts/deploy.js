#!/usr/bin/env node
'use strict';

/**
 * Custom gh-pages deploy — replaces the gh-pages npm package which
 * is incompatible with Node.js v25 (universalify/fs-extra crash).
 *
 * Initializes a clean git repo in build/, commits all files,
 * force-pushes to the gh-pages branch of the upstream remote.
 */

const { execSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

const root     = path.join(__dirname, '..');
const buildDir = path.join(root, 'build');

function run(cmd, cwd) {
  execSync(cmd, { stdio: 'inherit', cwd: cwd || buildDir });
}

function capture(cmd, cwd) {
  return execSync(cmd, { cwd: cwd || root, encoding: 'utf8' }).trim();
}

if (!fs.existsSync(buildDir)) {
  console.error('ERROR: build/ directory not found. Run npm run build first.');
  process.exit(1);
}

// Resolve remote URL from the main repo
const remote = capture('git remote get-url origin');
console.log(`[deploy] remote: ${remote}`);

// Clean up any leftover git state from previous runs
const dotGit = path.join(buildDir, '.git');
if (fs.existsSync(dotGit)) {
  fs.rmSync(dotGit, { recursive: true, force: true });
}

// Init temporary repo, commit everything, force-push to gh-pages
run('git init -b gh-pages');
run('git add -A');
run(
  'git -c user.name="github-actions[bot]" ' +
  '-c user.email="github-actions[bot]@users.noreply.github.com" ' +
  'commit -m "deploy"'
);
run(`git remote add origin ${remote}`);
run('git push --force origin gh-pages');

// Clean up
fs.rmSync(dotGit, { recursive: true, force: true });

console.log('\n[deploy] ✓ pushed to gh-pages');
