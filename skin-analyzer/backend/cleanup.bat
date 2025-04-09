@echo off
echo Cleaning up unused TensorFlow files...
echo.

echo Removing train.py...
if exist train.py del train.py

echo Removing train_model.py...
if exist train_model.py del train_model.py

echo Removing train_simple.py...
if exist train_simple.py del train_simple.py

echo Removing train_simple_v2.py...
if exist train_simple_v2.py del train_simple_v2.py

echo Removing train.bat...
if exist train.bat del train.bat

echo Removing train_simple.bat...
if exist train_simple.bat del train_simple.bat

echo Removing train_simple_v2.bat...
if exist train_simple_v2.bat del train_simple_v2.bat

echo Removing train_with_dataset.py...
if exist train_with_dataset.py del train_with_dataset.py

echo.
echo Cleanup complete!
echo.
echo The application now uses PyTorch instead of TensorFlow.
pause