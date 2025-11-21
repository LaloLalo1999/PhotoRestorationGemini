#!/bin/bash

# Photo Restoration Gemini - Setup Script
# This script helps you set up the development environment

set -e

echo "🚀 Photo Restoration Gemini - Setup Script"
echo "============================================"
echo ""

# Check Node.js version
echo "📋 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18.0.0 or higher is required"
    echo "   Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Check if .env.local exists
ENV_FILE="apps/web/.env.local"
if [ ! -f "$ENV_FILE" ]; then
    echo "⚙️  Setting up environment variables..."
    cp apps/web/.env.example "$ENV_FILE"
    echo "✅ Created $ENV_FILE from template"
    echo ""
    echo "⚠️  IMPORTANT: Please update $ENV_FILE with your actual keys:"
    echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
    echo "   - CLERK_SECRET_KEY"
    echo "   - GEMINI_API_KEY"
    echo ""
else
    echo "✅ Environment file already exists: $ENV_FILE"
    echo ""
fi

# Build the project
echo "🔨 Building the project..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi
echo ""

# Run linter
echo "🧹 Running linter..."
npm run lint
if [ $? -eq 0 ]; then
    echo "✅ Linting passed"
else
    echo "⚠️  Linting completed with warnings"
fi
echo ""

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update $ENV_FILE with your API keys"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "For more information, see README.md"
