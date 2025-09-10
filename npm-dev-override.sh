#!/bin/bash

# Override script for npm run dev to use Replit-compatible settings
echo "🔧 Replit: Running Vite development server on port 5000..."

# Start Vite with the correct port and host
exec npx vite --port 5000 --host 0.0.0.0 "$@"