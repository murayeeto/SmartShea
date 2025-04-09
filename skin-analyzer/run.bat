@echo off
echo Skin Analyzer Application
echo =======================
echo.
echo Please select an option:
echo.
echo 1. Train the AI model (PyTorch)
echo 2. Run the backend server
echo 3. Run the frontend server
echo 4. Exit
echo.

:menu
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
  cd backend
  call train_pytorch.bat
  cd ..
  goto menu
)

if "%choice%"=="2" (
  cd backend
  start cmd /k run_app.bat
  cd ..
  goto menu
)

if "%choice%"=="3" (
  cd frontend
  start cmd /k run_frontend.bat
  cd ..
  goto menu
)

if "%choice%"=="4" (
  exit
)

echo Invalid choice. Please try again.
goto menu