#!/bin/bash
set -e

echo "🧹 Cleaning old build artifacts..."

# Rename .vite instead of deleting to avoid EBUSY
if [ -d "node_modules/.vite" ]; then
    mv node_modules/.vite node_modules/.vite_backup || true
fi

# Remove dist folder
rm -rf dist

echo "📦 Installing dependencies..."
npm install

echo "🏗 Building frontend..."
npm run build

echo "🚀 Starting server..."
npm start
