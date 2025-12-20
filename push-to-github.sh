#!/bin/bash

# Navigate to project directory
cd /Users/pratikj.mahajan/Desktop/My-porfolio-final-try/my-portfolio

# Clean any existing git repository
echo "🧹 Cleaning existing git repository..."
rm -rf .git

# Initialize fresh git repository
echo "🎬 Initializing new git repository..."
git init
git branch -m main

# Configure git user
echo "👤 Configuring git user..."
git config user.name "yash5755"
git config user.email "yashachar246@gmail.com"

# Add all files
echo "📦 Adding all files..."
git add -A

# Show status
echo "📊 Git status:"
git status --short | head -20

# Commit
echo "💾 Creating commit..."
git commit -m "Initial commit: Portfolio website with React and Vite"

# Add remote
echo "🔗 Adding GitHub remote..."
git remote add origin https://github.com/yash5755/pratik-j-mahajan.github.io.git

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Check your GitHub repository."
