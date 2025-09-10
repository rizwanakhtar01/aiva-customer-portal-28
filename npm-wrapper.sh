#!/bin/bash

# NPM wrapper to handle Replit-specific requirements
# This script intercepts npm run dev and redirects it to use port 5000

if [ "$1" = "run" ] && [ "$2" = "dev" ]; then
    echo "🔧 Replit: Starting development server on port 5000..."
    exec npx vite --port 5000 --host 0.0.0.0
else
    # For all other npm commands, use the original npm
    exec /usr/bin/env npm "$@"
fi