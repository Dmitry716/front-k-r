#!/usr/bin/env node
/**
 * Generate favicon files from favicon.jpg
 * Requires: npm install --save-dev sharp
 */

const fs = require('fs');
const path = require('path');

// Check if we can use sharp
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('sharp not found, installing...');
  require('child_process').execSync('npm install --save-dev sharp', { stdio: 'inherit' });
  sharp = require('sharp');
}

const publicDir = path.join(__dirname, 'public');
const faviconJpg = path.join(publicDir, 'favicon.jpg');

if (!fs.existsSync(faviconJpg)) {
  console.error('❌ favicon.jpg not found in public folder');
  process.exit(1);
}

async function generateFavicons() {
  try {
    console.log('🎨 Generating favicon files...');

    // 1. Generate favicon.png (32x32 - primary favicon)
    console.log('  📝 Creating favicon.png (32x32)...');
    await sharp(faviconJpg)
      .resize(32, 32, { fit: 'cover' })
      .png()
      .toFile(path.join(publicDir, 'favicon.png'));
    console.log('  ✅ favicon.png created');

    // 2. Generate large favicon.png (192x192 for web app)
    console.log('  📝 Creating favicon-192x192.png...');
    await sharp(faviconJpg)
      .resize(192, 192, { fit: 'cover' })
      .png()
      .toFile(path.join(publicDir, 'favicon-192x192.png'));
    console.log('  ✅ favicon-192x192.png created');

    // 3. Generate apple-touch-icon (180x180)
    console.log('  📝 Creating apple-touch-icon.png (180x180)...');
    await sharp(faviconJpg)
      .resize(180, 180, { fit: 'cover' })
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('  ✅ apple-touch-icon.png created');

    // 4. Generate favicon-32x32.png
    console.log('  📝 Creating favicon-32x32.png...');
    await sharp(faviconJpg)
      .resize(32, 32, { fit: 'cover' })
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    console.log('  ✅ favicon-32x32.png created');

    // 5. Generate favicon-16x16.png
    console.log('  📝 Creating favicon-16x16.png...');
    await sharp(faviconJpg)
      .resize(16, 16, { fit: 'cover' })
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    console.log('  ✅ favicon-16x16.png created');

    // 6. Generate webp version (192x192)
    console.log('  📝 Creating favicon.webp (192x192)...');
    await sharp(faviconJpg)
      .resize(192, 192, { fit: 'cover' })
      .webp()
      .toFile(path.join(publicDir, 'favicon-192x192.webp'));
    console.log('  ✅ favicon-192x192.webp created');

    console.log('\n✨ All favicon files generated successfully!');
  } catch (err) {
    console.error('❌ Error generating favicons:', err.message);
    process.exit(1);
  }
}

generateFavicons();
