# History Tracker Extension

A cross-platform browser history tracking extension that stores browsing history locally. Available for:
- Chrome (Web Store)
- Firefox Android
- iOS Safari

## Features

- Track webpage visits with URLs and titles
- Local storage of browsing history
- Privacy-focused: all data stays on your device
- Clean and simple interface
- Cross-platform support

## Installation

### Chrome
1. Visit the Chrome Web Store (link to be added)
2. Click "Add to Chrome"
3. Confirm the installation

### Firefox Android
1. Open Firefox on your Android device
2. Visit the Firefox Add-ons site (link to be added)
3. Tap "Add to Firefox"

### iOS
1. Visit the App Store (link to be added)
2. Download and install the History Tracker app
3. Follow in-app instructions to enable the extension in Safari

## Development

### Prerequisites
- Node.js and npm for Chrome/Firefox extension
- Xcode for iOS development
- Git for version control

### Setup
1. Clone the repository:
```bash
git clone https://github.com/yourusername/history-tracker.git
cd history-tracker
```

2. Install dependencies:
```bash
npm install
```

### Building

#### Chrome/Firefox Extension
```bash
npm run build
```

#### iOS App
1. Open the Xcode project in `/platforms/ios`
2. Build using Xcode

### Testing
```bash
npm test
```

## Release Process

1. Update version in manifest.json and package.json
2. Create a new tag:
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```
3. GitHub Actions will automatically:
   - Build the extensions
   - Create a GitHub release
   - Package the extensions
   - Upload to respective stores (requires manual approval)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

## License

MIT License - see LICENSE file for details