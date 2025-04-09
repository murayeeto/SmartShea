# SmartShea Skin Analyzer

A full-stack application that uses AI to analyze skin type and recommend personalized shea butter products.

## Features

- AI-powered skin type analysis
- Personalized product recommendations
- Interactive skin analysis interface
- Real-time camera integration
- Responsive design

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS3

### Backend
- Flask
- PyTorch
- OpenCV
- NumPy
- Pillow

## Installation

### Quick Install (Unix-based systems)
```bash
chmod +x install.sh
./install.sh
```

### Manual Installation

1. Frontend Setup
```bash
cd frontend
npm install
```

2. Backend Setup
```bash
cd skin-analyzer/backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Unix or MacOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Running the Application

1. Start the Backend
```bash
cd skin-analyzer/backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

2. Start the Frontend (in a new terminal)
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend API: http://localhost:8000

## Deployment

### Frontend (GitHub Pages)
The frontend is configured for GitHub Pages deployment:

1. Update the homepage in `frontend/package.json` if needed
2. Deploy to GitHub Pages:
```bash
cd frontend
npm run deploy
```

The application will be available at: https://murayeeto.github.io/SmartShea

### Backend (Render.com)
The backend is configured for Render.com deployment:

1. Connect your GitHub repository to Render.com
2. Create a new Web Service
3. Configure the service:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
   - Root Directory: skin-analyzer/backend

## Environment Variables

### Frontend
Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=your_backend_url
```

### Backend
Configure in Render.com dashboard:
- `GITHUB_PAGES_URL`: https://murayeeto.github.io
- `UPLOAD_FOLDER`: /tmp/uploads
- `PYTHON_VERSION`: 3.8.0

## Project Structure
```
/
├── frontend/               # React frontend
│   ├── public/            # Static files
│   └── src/               # Source code
├── skin-analyzer/         # Python backend
│   └── backend/          # Flask application
└── install.sh            # Installation script
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
