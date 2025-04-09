from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
from PIL import Image
import io
import base64
import torch
import torch.nn as nn
import torchvision.transforms as transforms
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Create uploads directory if it doesn't exist
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Path to the trained model
MODEL_PATH = 'skin_classifier_model.pth'
CLASS_INDICES_PATH = 'class_indices.npy'

# Define the device
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
logger.info(f"Using device: {device}")

# Define the CNN model
class SkinClassifier(nn.Module):
    def __init__(self, num_classes):
        super(SkinClassifier, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
        )
        self.classifier = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(128 * 28 * 28, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(512, num_classes)
        )
    
    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        x = self.classifier(x)
        return x

# Load the model if it exists
model = None
class_names = ["normal", "dry", "oily"]  # Default class names

try:
    if os.path.exists(MODEL_PATH):
        logger.info(f"Loading model from {MODEL_PATH}")
        
        # Load class indices first to determine number of classes
        if os.path.exists(CLASS_INDICES_PATH):
            class_indices = np.load(CLASS_INDICES_PATH, allow_pickle=True).item()
            class_names = [class_indices[i] for i in range(len(class_indices))]
            logger.info(f"Loaded class names: {class_names}")
        
        # Create and load the model
        model = SkinClassifier(len(class_names))
        model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
        model.to(device)
        model.eval()  # Set to evaluation mode
        logger.info("Model loaded successfully")
    else:
        logger.warning(f"Model file not found at {MODEL_PATH}. Using random predictions as fallback.")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    logger.warning("Using random predictions as fallback.")

# Define image transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

def analyze_skin(image_path):
    """
    Analyze skin using the trained PyTorch model or fallback to random prediction.
    """
    recommendations = {
        "normal": "Your skin is well-balanced. Continue with your current skincare routine. We recommend our Hydrating Daily Moisturizer to maintain skin health.",
        "dry": "Your skin needs more hydration. Try our Intensive Hydration Cream to restore moisture balance and relieve dryness.",
        "oily": "Your skin produces excess sebum. We recommend our Oil-Control Mattifying Gel to reduce shine and prevent clogged pores."
    }
    
    # If model is not loaded, return random prediction
    if model is None:
        logger.warning("Model not loaded. Using random prediction.")
        skin_type = np.random.choice(class_names)
        return {
            "skin_type": skin_type,
            "recommendation": recommendations[skin_type],
            "confidence": None,
            "note": "Using random prediction (model not loaded)"
        }
    
    try:
        # Preprocess the image
        img = Image.open(image_path).convert('RGB')
        img_tensor = transform(img).unsqueeze(0).to(device)  # Add batch dimension and move to device
        
        # Make prediction
        with torch.no_grad():  # No need to track gradients
            outputs = model(img_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)[0]
            predicted_class_index = torch.argmax(probabilities).item()
            confidence = probabilities[predicted_class_index].item()
        
        # Get skin type
        skin_type = class_names[predicted_class_index]
        
        logger.info(f"Prediction: {skin_type} with confidence {confidence:.2f}")
        
        # Convert probabilities to dictionary
        predictions_dict = {class_names[i]: float(probabilities[i]) for i in range(len(class_names))}
        
        return {
            "skin_type": skin_type,
            "recommendation": recommendations[skin_type],
            "confidence": confidence,
            "predictions": predictions_dict
        }
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        skin_type = np.random.choice(class_names)
        return {
            "skin_type": skin_type,
            "recommendation": recommendations[skin_type],
            "confidence": None,
            "error": str(e),
            "note": "Error during prediction, using random fallback"
        }

@app.route('/api/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.json:
        return jsonify({"error": "No image provided"}), 400
    
    try:
        # Get the base64 encoded image from the request
        image_data = request.json['image'].split(',')[1]
        image_bytes = base64.b64decode(image_data)
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_bytes))
        
        # Save the image
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'temp_image.jpg')
        image.save(image_path)
        
        # Analyze the image
        result = analyze_skin(image_path)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)