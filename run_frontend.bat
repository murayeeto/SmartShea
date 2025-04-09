@echo off
echo Starting Skin Analyzer React Frontend...
echo.
echo If this is the first time running, it will install dependencies first.
echo This may take a few minutes.
echo.
echo The frontend will be available at http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

if not exist node_modules (
  echo Installing dependencies...
  npm install
)

npm start
pause