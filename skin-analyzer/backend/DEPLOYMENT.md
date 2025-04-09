# Deployment Guide for SmartShea Backend

This guide explains how to deploy the SmartShea backend to Render.com.

## Prerequisites

1. Create a free account on [Render.com](https://render.com)
2. Have your GitHub repository connected to Render

## Deployment Steps

1. Go to your Render dashboard
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: smartshea-backend
   - Environment: Python
   - Root Directory: skin-analyzer/backend
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
   - Select the Free plan

## Environment Variables

Set the following environment variables in your Render dashboard:

- `GITHUB_PAGES_URL`: https://murayeeto.github.io
- `UPLOAD_FOLDER`: /tmp/uploads
- `PYTHON_VERSION`: 3.8.0

## Important Notes

1. The free tier of Render will spin down after 15 minutes of inactivity. The first request after inactivity might take a few seconds.
2. Make sure your model files (skin_classifier_model.pth and class_indices.npy) are included in your repository.
3. The /tmp/uploads directory is used for temporary file storage and is cleared periodically.

## Connecting Frontend

1. After deployment, get your Render service URL (e.g., https://smartshea-backend.onrender.com)
2. Update the production apiUrl in frontend/src/config.js with your Render service URL

## File Structure
Make sure your repository has the following structure:
```
/
├── skin-analyzer/
│   └── backend/
│       ├── app.py
│       ├── requirements.txt
│       ├── render.yaml
│       └── [other backend files]
└── frontend/
    └── [frontend files]
```

## Testing

1. Deploy your frontend to GitHub Pages
2. Test the skin analyzer functionality
3. Check the Render logs for any issues

## Troubleshooting

If you encounter issues:

1. Check the Render logs for error messages
2. Verify your environment variables are set correctly
3. Ensure all required files are present in your repository
4. Check CORS settings if you get cross-origin errors