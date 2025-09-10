#!/usr/bin/env node

// Replit Development Server Starter
// This script starts Vite with Replit-compatible settings
console.log('🔧 Starting Vite development server for Replit...');

import { spawn } from 'child_process';

// Start Vite with the correct port and host for Replit
const viteProcess = spawn('npx', ['vite', '--port', '5000', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

viteProcess.on('close', (code) => {
  console.log(`Vite development server exited with code: ${code}`);
  process.exit(code);
});

viteProcess.on('error', (error) => {
  console.error(`Failed to start Vite: ${error}`);
  process.exit(1);
});

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development server...');
  viteProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Terminating development server...');
  viteProcess.kill('SIGTERM');
});