#!/bin/bash

# Frontend setup
echo "Setting up frontend..."
cd frontend
npm install
cd ..

# Backend setup
echo "Setting up backend..."
cd skin-analyzer/backend

# Create Python virtual environment
echo "Creating Python virtual environment..."
python -m venv venv

# Activate virtual environment
if [[ "$OSTYPE" == "msys" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Deactivate virtual environment
deactivate
cd ../..

echo "Installation complete!"
echo "To run the frontend: cd frontend && npm start"
echo "To run the backend: cd skin-analyzer/backend && source venv/bin/activate && python app.py"