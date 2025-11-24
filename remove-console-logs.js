const fs = require('fs');
const path = require('path');

function removeConsoleLogs(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      removeConsoleLogs(filePath);
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Remove console.log, console.debug, console.info (keep console.error and console.warn)
      content = content.replace(/^\s*console\.(log|debug|info)\([^)]*\);?\s*$/gm, '');
      
      // Remove empty lines that were left after removal
      content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Cleaned: ${filePath}`);
      }
    }
  });
}

const srcDir = path.join(__dirname, 'src');
console.log('Removing console.log/debug/info from:', srcDir);
removeConsoleLogs(srcDir);
console.log('✅ Done!');
