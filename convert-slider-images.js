const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sliderDir = path.join(__dirname, 'public', 'sliders');
const files = fs.readdirSync(sliderDir);

async function convertImages() {
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(sliderDir, file);
      const outputPath = path.join(sliderDir, file.replace(/\.(jpg|jpeg)$/, '.webp'));
      
      console.log(`Converting ${file}...`);
      
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`✓ Created ${path.basename(outputPath)}`);
    }
  }
  console.log('\n✓ All images converted!');
}

convertImages().catch(console.error);
