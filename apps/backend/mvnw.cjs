#!/usr/bin/env node
const { spawnSync, execSync } = require('node:child_process');
const path = require('node:path');

const isWin = process.platform === 'win32';
const scriptName = isWin ? 'mvnw.cmd' : 'mvnw';
const scriptPath = path.resolve(__dirname, scriptName);
const args = process.argv.slice(2);

// Auto-detect JAVA_HOME if omitted by environment or Turborepo
if (!process.env.JAVA_HOME) {
  try {
    const lookupCmd = isWin ? 'where.exe java' : 'which java';
    const rawOut = execSync(lookupCmd, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    const firstLine = rawOut.split(/\r?\n/)[0];
    if (firstLine) {
      // First line is e.g. <JAVA_HOME>/bin/java.exe
      process.env.JAVA_HOME = path.dirname(path.dirname(firstLine));
    }
  } catch {
    // If lookup fails, let mvnw report its own environment error
  }
}

const result = spawnSync(scriptPath, args, {
  stdio: 'inherit',
  shell: isWin,
  cwd: __dirname,
  env: process.env,
});

process.exit(result.status ?? 0);
