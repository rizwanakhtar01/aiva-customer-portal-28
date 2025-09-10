#!/usr/bin/env node

// Replit Application Starter
// This is a standalone script that starts the Vite dev server with proper Replit configuration
// without modifying any protected files

import { spawn } from 'child_process';
import path from 'path';

console.log('🔧 Starting Vite development server for Replit...');
console.log('📋 Using Replit-compatible configuration:');
console.log('   - Port: 5000');
console.log('   - Host: 0.0.0.0 (all interfaces)'); 
console.log('   - Config: vite.replit.config.ts');
console.log('');

// Start Vite with Replit-compatible settings
const viteProcess = spawn('npx', [
  'vite', 
  '--config', 'vite.replit.config.ts'
], {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: {
    ...process.env,
    NODE_ENV: 'development'
  }
});

viteProcess.on('close', (code) => {
  console.log(`\n🔚 Vite development server exited with code: ${code}`);
  process.exit(code);
});

viteProcess.on('error', (error) => {
  console.error(`\n❌ Failed to start Vite: ${error}`);
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