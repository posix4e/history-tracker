# OpenHands Development Instructions

## Project Structure

```
history-tracker/
├── src/                    # Core extension code
│   ├── manifest.json       # Extension manifest
│   ├── background.js      # Background service worker
│   ├── popup.html         # Extension popup UI
│   └── popup.js           # Popup functionality
├── platforms/
│   ├── chrome/            # Chrome-specific adjustments
│   ├── firefox/           # Firefox Android specific code
│   └── ios/               # iOS Swift implementation
└── docs/                  # Documentation
```

## Development Workflow

1. **Making Changes**
   - Create a new branch for your feature/fix
   - Make changes in the appropriate directories
   - Test locally before committing

2. **Testing**
   - Chrome/Firefox: Load unpacked extension
   - iOS: Use Xcode simulator
   - Run automated tests: `npm test`

3. **Creating Releases**
   - Update version numbers in:
     - src/manifest.json
     - platforms/ios/Info.plist
     - package.json
   - Create and push a new tag
   - GitHub Actions will handle the release process

4. **Store Submissions**
   - Chrome Web Store: Auto-submitted via GitHub Actions
   - Firefox Add-ons: Auto-submitted via GitHub Actions
   - iOS App Store: Manual submission required via App Store Connect

## Release Process

1. **Prepare Release**
   ```bash
   # Update version numbers
   git checkout -b release-v1.0.0
   # Make version updates
   git commit -am "Bump version to 1.0.0"
   git push origin release-v1.0.0
   ```

2. **Create Pull Request**
   - Create PR from release branch to main
   - Wait for CI checks and reviews
   - Merge when approved

3. **Tag Release**
   ```bash
   git checkout main
   git pull
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

4. **Monitor Release Pipeline**
   - Check GitHub Actions for build status
   - Verify store submissions
   - Test installed versions

## Store-Specific Notes

### Chrome Web Store
- Manifest V3 required
- Store listing assets in platforms/chrome/store-assets/

### Firefox Android
- Additional permissions may be required
- Firefox-specific manifest adjustments in platforms/firefox/

### iOS App Store
- Requires Apple Developer Account
- Follow App Store guidelines for extensions
- Submit through App Store Connect

## Troubleshooting

1. **Build Issues**
   - Check node_modules is up to date
   - Verify manifest.json syntax
   - Check browser console for errors

2. **Store Submission Failures**
   - Review store-specific requirements
   - Check submission logs in GitHub Actions
   - Verify all required assets are present

3. **Release Problems**
   - Ensure all version numbers match
   - Verify tag format (v1.0.0)
   - Check GitHub Actions logs