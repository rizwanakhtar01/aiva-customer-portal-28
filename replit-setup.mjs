#!/usr/bin/env node

// Replit Environment Setup Script
// This script configures the application to run properly on Replit

import fs from 'fs';
import { exec } from 'child_process';

console.log('🔧 Configuring application for Replit environment...');

// Read current package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Backup the original dev script
if (!packageJson.scripts['dev:original']) {
  packageJson.scripts['dev:original'] = packageJson.scripts.dev;
}

// Update dev script to use Replit-compatible settings
packageJson.scripts.dev = 'vite --port 5000 --host 0.0.0.0';

// Write the updated package.json
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

console.log('✅ Updated npm dev script to use port 5000 and host 0.0.0.0');
console.log('🚀 Starting development server...');

// Start the development server
const child = exec('npm run dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
  }
  console.log(stdout);
});

child.stdout.on('data', (data) => {
  console.log(data.toString());
});

child.stderr.on('data', (data) => {
  console.error(data.toString());
});

child.on('close', (code) => {
  console.log(`Development server exited with code ${code}`);
  process.exit(code);
});