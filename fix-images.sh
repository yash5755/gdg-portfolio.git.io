#!/bin/bash
# Script to replace all local image paths with Cloudinary URLs
# Run this when you're ready to fix all missing images

echo "Replacing local image paths with Cloudinary URLs..."

# Backup current state
git checkout -b backup-before-all-images-fix 2>/dev/null || echo "Backup branch already exists"

# Replace all image URLs in Landingpage.jsx
sed -i '' \
  -e 's|"/react\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/react_ijir1p.png"|g' \
  -e 's|"/nodejs\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/nodejs_y6ptov.png"|g' \
  -e 's|"/js\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/js_n0jchn.png"|g' \
  -e 's|"/html\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/html_n9844z.png"|g' \
  -e 's|"/css\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/css_gbkd0w.png"|g' \
  -e 's|"/sql\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/sql_cku96s.png"|g' \
  -e 's|"/figma\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/figma_zy4ykk.png"|g' \
  -e 's|"/tailwind1\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/Tailwind_b15bq7.png"|g' \
  -e 's|"/tableau\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/tableau_mhdzxn.png"|g' \
  -e 's|"/redux\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/icons8-redux-96_aomziq.png"|g' \
  -e 's|"/next\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/next_pw23l9.png"|g' \
  -e 's|"/fastapi\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/fastapi_ghpk7j.webp"|g' \
  -e 's|"/mongodb\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/mongodb_o5gxo2.png"|g' \
  -e 's|"/gemini\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/gemini_x6sreu.jpg"|g' \
  -e 's|"/linkedin\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/linkedin_b3clom.png"|g' \
  -e 's|"/instagram\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/instagram_i43uld.png"|g' \
  -e 's|"/twitter\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/twitter_o3dl7u.png"|g' \
  -e 's|"/whatsapp\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/whatsapp_yo1hkj.png"|g' \
  -e 's|"/linklogo\.gif"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525785/linklogo_uzv9tb.gif"|g' \
  -e 's|"/emaillogo\.gif"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/emaillogo_owln2j.gif"|g' \
  -e 's|"/calllogo\.gif"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/calllogo_hp4ygx.gif"|g' \
  src/components/Landingpage.jsx

# Replace in Projects.jsx
sed -i '' \
  -e 's|"/react\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/react_ijir1p.png"|g' \
  -e 's|"/nodejs\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/nodejs_y6ptov.png"|g' \
  -e 's|"/html\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/html_n9844z.png"|g' \
  -e 's|"/css\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525706/css_gbkd0w.png"|g' \
  -e 's|"/js\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/js_n0jchn.png"|g' \
  -e 's|"/sql\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/sql_cku96s.png"|g' \
  -e 's|"/figma\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525705/figma_zy4ykk.png"|g' \
  -e 's|"/tailwind1\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/Tailwind_b15bq7.png"|g' \
  -e 's|"/tableau\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/tableau_mhdzxn.png"|g' \
  -e 's|"/mongodb\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/mongodb_o5gxo2.png"|g' \
  -e 's|"/next\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/next_pw23l9.png"|g' \
  -e 's|"/gemini\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525708/gemini_x6sreu.jpg"|g' \
  -e 's|"/python\.png"|"https://res.cloudinary.com/dphe5xhwj/image/upload/v1765525707/python_kw1e8y.png"|g' \
  src/components/Projects.jsx

echo "✅ All image paths replaced!"
echo ""
echo "Next steps:"
echo "1. Check localhost to verify images load"
echo "2. If good, run: git add . && git commit -m 'Fix: Replace all local images with Cloudinary URLs'"
echo "3. Then: git push origin main"
echo "4. Finally: npm run deploy"
echo ""
echo "If anything breaks, rollback with:"
echo "git checkout backup-before-all-images-fix"
