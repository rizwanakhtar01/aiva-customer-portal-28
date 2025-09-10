#!/usr/bin/env node

// Simple script to run Vite with Replit-compatible settings
import { exec } from 'child_process';

console.log('🚀 Starting Vite development server on port 5000...');

// Set environment variables for Vite
process.env.PORT = '5000';
process.env.HOST = '0.0.0.0';

// Run vite directly with CLI overrides to ensure port 5000
const command = 'npx vite --port 5000 --host 0.0.0.0';

const child = exec(command, (error, stdout, stderr) => {
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