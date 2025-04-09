# SmartShea Skin Analyzer

This repository contains the SmartShea skin analyzer application, configured for GitHub Pages deployment.

## Changes Made

1. Added a popup to the skin analyzer that explains how it works:
   - Created a popup with the "PERFECT" header
   - Added instructions with icons for proper skin analysis
   - Included a "GET STARTED" button to close the popup
   - The popup appears when the skin analyzer loads and can be reopened via a "How It Works" button

2. Modified the Shop dropdown menu to only have two categories:
   - Products
   - Gift Packages

3. Updated the .gitignore file to exclude:
   - The AI model file (skin_classifier_model.pth)
   - All training images (Dataset directory)
   - Node.js dependencies and virtual environment files

4. Configured for GitHub Pages:
   - Added homepage field to package.json
   - Added gh-pages deployment scripts
   - Changed BrowserRouter to HashRouter for proper routing on GitHub Pages

## GitHub Pages Deployment

This application is configured to be deployed on GitHub Pages. To deploy:

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run deploy` to build and deploy to GitHub Pages

The application will be available at: https://murayeeto.github.io/SmartShea
