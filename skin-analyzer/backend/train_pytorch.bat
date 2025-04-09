@echo off
echo Starting PyTorch Skin Analyzer Model Training...
echo.
echo This script uses PyTorch instead of TensorFlow.
echo.
python train_pytorch.py --transfer
echo.
echo If the training was successful, you can now run the Flask app with:
echo python app.py
pause