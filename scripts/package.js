const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function createZip(source, out) {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', err => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
}

async function package() {
  const distDir = path.join(__dirname, '../dist');
  const packagesDir = path.join(__dirname, '../packages');

  // Create packages directory if it doesn't exist
  if (!fs.existsSync(packagesDir)) {
    fs.mkdirSync(packagesDir);
  }

  // Package Chrome extension
  console.log('Packaging Chrome extension...');
  await createZip(
    path.join(distDir, 'chrome'),
    path.join(packagesDir, 'chrome-extension.zip')
  );

  // Package Firefox extension
  console.log('Packaging Firefox extension...');
  await createZip(
    path.join(distDir, 'firefox'),
    path.join(packagesDir, 'firefox-extension.zip')
  );

  console.log('Packaging completed successfully!');
}

package().catch(console.error);