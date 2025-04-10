from flask import Flask, request, jsonify
import pickle
import _pickle
from flask_cors import CORS
import os
import numpy as np
from PIL import Image
import io
import base64
from dotenv import load_dotenv
import torch
import torch.nn as nn
import torchvision.transforms as transforms
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configure CORS for GitHub Pages
GITHUB_PAGES_URL = os.getenv('GITHUB_PAGES_URL', 'https://murayeeto.github.io')
CORS(app, resources={
    r"/api/*": {
        "origins": [
            GITHUB_PAGES_URL,
            "https://murayeeto.github.io/SmartShea",
            "http://localhost:8080",  # Allow requests from frontend development server
            "http://localhost:3000"   # Temporarily allow during transition
        ],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Configure upload folder
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', '/tmp/uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Path to the trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'skin_classifier_model.pth')
CLASS_INDICES_PATH = os.path.join(os.path.dirname(__file__), 'class_indices.npy')

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

def backup_model_file(path):
    """Create a backup of the model file"""
    try:
        backup_path = path + '.backup'
        if os.path.exists(path):
            with open(path, 'rb') as src, open(backup_path, 'wb') as dst:
                dst.write(src.read())
            logger.info(f"Created backup of model file at {backup_path}")
            return True
    except Exception as e:
        logger.error(f"Failed to create backup: {str(e)}")
        return False

def verify_model_file(path):
    """Verify the model file exists and is not corrupted"""
    if not os.path.exists(path):
        return False, "Model file does not exist"
    
    try:
        file_size = os.path.getsize(path)
        if file_size < 1000:  # Model file should be larger than 1KB
            return False, f"Model file seems too small: {file_size} bytes"
        
        # Try to read the first few bytes
        with open(path, 'rb') as f:
            header = f.read(10)
            if len(header) < 10:
                return False, "Model file appears truncated"
        
        return True, "Model file appears valid"
    except Exception as e:
        return False, f"Error checking model file: {str(e)}"

# Load the model if it exists
model = None
class_names = ["normal", "dry", "oily"]  # Default class names

try:
    # Create a backup of the model file
    backup_model_file(MODEL_PATH)
    
    # First verify the model file
    is_valid, message = verify_model_file(MODEL_PATH)
    if not is_valid:
        logger.error(f"Model file verification failed: {message}")
        raise Exception(message)
    if os.path.exists(MODEL_PATH):
        file_size = os.path.getsize(MODEL_PATH)
        logger.info(f"Loading model from {MODEL_PATH}")
        logger.info(f"Model file size: {file_size} bytes")
        
        # Read and log file details
        with open(MODEL_PATH, 'rb') as f:
            header = f.read(100)
            logger.info(f"First 100 bytes of model file: {header[:100].hex()}")
        
        # Log file permissions and ownership
        import stat
        st = os.stat(MODEL_PATH)
        logger.info(f"File permissions: {oct(st.st_mode)}")
        logger.info(f"File owner: {st.st_uid}, group: {st.st_gid}")
        
        # Load class indices first to determine number of classes
        if os.path.exists(CLASS_INDICES_PATH):
            class_indices = np.load(CLASS_INDICES_PATH, allow_pickle=True).item()
            class_names = [class_indices[i] for i in range(len(class_indices))]
            logger.info(f"Loaded class names: {class_names}")
        
        # Create and load the model
        model = SkinClassifier(len(class_names))
        try:
            # Try loading with different methods
            try:
                # Method 1: Try loading with torch.load
                state_dict = torch.load(MODEL_PATH, map_location=device)
            except _pickle.UnpicklingError:
                # Method 2: Try loading in a safer way
                with open(MODEL_PATH, 'rb') as f:
                    state_dict = torch.load(f, map_location=device, pickle_module=pickle)
            # Check if we need to remove 'module.' prefix (happens with DataParallel)
            if isinstance(state_dict, dict):
                if any(k.startswith('module.') for k in state_dict.keys()):
                    state_dict = {k[7:] if k.startswith('module.') else k: v for k, v in state_dict.items()}
                model.load_state_dict(state_dict)
            else:
                logger.warning("Loaded state_dict is not a dictionary, trying to load as full model")
                model = state_dict
        except Exception as e:
            logger.error(f"Detailed error during model loading: {str(e)}")
            logger.error(f"Model file size: {os.path.getsize(MODEL_PATH)} bytes")
            
            # Try loading in legacy format
            logger.info("Attempting to load model in legacy format...")
            try:
                with open(MODEL_PATH, 'rb') as f:
                    # Try with encoding='latin1' for older PyTorch models
                    state_dict = torch.load(f, map_location=device, encoding='latin1')
                if isinstance(state_dict, dict):
                    model.load_state_dict(state_dict)
                    logger.info("Successfully loaded model in legacy format")
                else:
                    model = state_dict
                    logger.info("Loaded full model in legacy format")
            except Exception as e2:
                logger.error(f"Failed to load in legacy format: {str(e2)}")
                raise e  # Raise the original error if legacy loading fails
            # If that fails, try loading as a full model with pickle safety
            with open(MODEL_PATH, 'rb') as f:
                # Read the first 1MB to check format
                header = f.read(1024 * 1024)
                f.seek(0)  # Reset file pointer
                if b'torch' in header:
                    model = torch.load(f, map_location=device)
                else:
                    logger.error("Model file does not appear to be a valid PyTorch model")
                    raise Exception("Invalid model file format")
        model.to(device)
        logger.info(f"Model architecture: {model}")  # Log model architecture
        model.eval()  # Set to evaluation mode
        logger.info("Model loaded successfully")
    else:
        logger.warning(f"Model file not found at {MODEL_PATH}. Using random predictions as fallback.")
        logger.warning(f"Current working directory: {os.getcwd()}")
        logger.warning(f"Directory contents: {os.listdir('.')}")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    logger.error(f"Error type: {type(e)}")
    logger.error(f"Current working directory: {os.getcwd()}")
    logger.error(f"Directory contents: {os.listdir('.')}")
    
    # Log detailed error information
    import traceback
    logger.error("Full traceback:")
    logger.error(traceback.format_exc())
    
    # Try to read raw file content
    try:
        with open(MODEL_PATH, 'rb') as f:
            content = f.read()
            logger.error(f"Raw file size: {len(content)} bytes")
            logger.error(f"File header (hex): {content[:100].hex()}")
    except Exception as read_error:
        logger.error(f"Failed to read file content: {str(read_error)}")
    
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

@app.route('/', methods=['GET', 'HEAD'])
def health_check():
    """Health check endpoint for Render"""
    return jsonify({"status": "healthy"}), 200

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
    port = int(os.getenv('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=False)