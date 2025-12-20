# Deployment Guide

## 🚀 Deploying to GitHub Pages

This portfolio is configured to deploy automatically to GitHub Pages using the `gh-pages` package.

### Prerequisites

- Node.js and npm installed
- Git repository connected to GitHub
- GitHub Pages enabled in repository settings

### Deployment Steps

1. **Build and Deploy:**
   ```bash
   npm run deploy
   ```

   This command will:
   - Build the production version (`npm run build`)
   - Deploy the `dist` folder to the `gh-pages` branch
   - Push to GitHub automatically

2. **Verify Deployment:**
   - Visit your GitHub Pages URL: `https://yash5755.github.io`
   - Check that all images, styles, and functionality work correctly

### Development Workflow

1. **Run Development Server:**
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:5173` (or next available port)
   - Hot reload enabled for instant updates

2. **Build for Production:**
   ```bash
   npm run build
   ```
   - Creates optimized production build in `dist/` folder
   - **Note:** The `dist/` folder is gitignored and should never be committed

3. **Preview Production Build:**
   ```bash
   npm run preview
   ```
   - Preview the production build locally before deploying

## ⚠️ Important: What NOT to Commit

The following files/folders should **NEVER** be committed to git:

- ❌ `dist/` - Production build output
- ❌ `assets/` - Build artifacts (if in root directory)
- ❌ `.cache/` - Vite cache files
- ❌ Modified `index.html` with build references

### Why?

When Vite builds your project, it:
1. Generates hashed asset files (e.g., `index-D6BNnqJ_.js`)
2. Injects script tags into `dist/index.html`
3. The **source** `index.html` should remain clean

**The source `index.html` should only contain:**
```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

## 🛡️ Safety Features

### Pre-commit Hook

A pre-commit hook automatically validates that `index.html` doesn't contain build artifact references before allowing commits.

If you see this error:
```
❌ ERROR: index.html contains build artifact references!
```

**Fix it by running:**
```bash
git restore index.html
```

### .gitignore Protection

The `.gitignore` file is configured to prevent accidentally committing:
- Build output (`dist/`, `assets/`)
- Cache files (`.cache/`)
- Dependencies (`node_modules/`)

## 🔧 Troubleshooting

### Issue: "Failed to load url /assets/index-*.js"

**Cause:** The source `index.html` has build artifact references.

**Solution:**
```bash
git restore index.html
npm run dev
```

### Issue: GitHub Pages shows 404

**Possible causes:**
1. GitHub Pages not enabled in repository settings
2. Wrong branch selected (should be `gh-pages`)
3. Build failed during deployment

**Solution:**
- Check GitHub repository Settings → Pages
- Ensure source is set to `gh-pages` branch
- Re-run `npm run deploy`

### Issue: Images not loading on deployed site

**Cause:** Incorrect base path in `vite.config.js`

**Solution:** Verify `vite.config.js` has:
```javascript
export default defineConfig({
  base: '/',
  // ... other config
})
```

## 📝 Deployment Checklist

Before deploying:
- [ ] Test locally with `npm run dev`
- [ ] Verify all images load correctly
- [ ] Check console for errors
- [ ] Test responsive design on different screen sizes
- [ ] Run `npm run build` to ensure build succeeds
- [ ] Preview build with `npm run preview`
- [ ] Deploy with `npm run deploy`
- [ ] Verify deployed site at GitHub Pages URL
- [ ] Check that source `index.html` remains clean

## 🎯 Best Practices

1. **Always test locally first** before deploying
2. **Never manually edit** the `dist/` folder
3. **Keep source files clean** - no build artifacts
4. **Use the npm scripts** - don't manually run build commands
5. **Commit frequently** with meaningful messages
6. **Let the pre-commit hook protect you** - don't bypass it

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [gh-pages Package](https://www.npmjs.com/package/gh-pages)
