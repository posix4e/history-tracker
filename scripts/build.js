const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure dist directory exists
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Build Chrome extension
console.log('Building Chrome extension...');
execSync('npm run build:chrome', { stdio: 'inherit' });

// Build Firefox extension
console.log('Building Firefox extension...');
execSync('npm run build:firefox', { stdio: 'inherit' });

// Copy iOS platform files
console.log('Copying iOS files...');
const iosDistDir = path.join(distDir, 'ios');
if (!fs.existsSync(iosDistDir)) {
  fs.mkdirSync(iosDistDir);
}
fs.cpSync(
  path.join(__dirname, '../platforms/ios'),
  iosDistDir,
  { recursive: true }
);

console.log('Build completed successfully!');