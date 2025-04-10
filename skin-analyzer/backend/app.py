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

# Define the device and enable memory efficient optimizations
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
torch.backends.cudnn.benchmark = True
torch.backends.cudnn.deterministic = True
if device.type == 'cpu':
    torch.set_num_threads(1)  # Limit CPU threads to prevent memory issues
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
            nn.Linear(128 * 14 * 14, 256),  # Reduced dimensions
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(256, num_classes)
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
            # Load the model first
            state_dict = torch.load(MODEL_PATH, map_location=device)
            
            # Remove module prefix if present
            if isinstance(state_dict, dict):
                if any(k.startswith('module.') for k in state_dict.keys()):
                    state_dict = {k[7:] if k.startswith('module.') else k: v for k, v in state_dict.items()}
                model.load_state_dict(state_dict)
            else:
                logger.warning("Loaded state_dict is not a dictionary, trying to load as full model")
                model = state_dict
            
            # Move model to device before quantization
            model.to(device)
            
            # Apply quantization after loading if on CPU
            if device.type == 'cpu':
                model = torch.quantization.quantize_dynamic(
                    model, {torch.nn.Linear, torch.nn.Conv2d}, dtype=torch.qint8
                )
            
            # Set model to evaluation mode and log info
            model.eval()
            logger.info(f"Model architecture: {model}")
            logger.info("Model loaded successfully")
            
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            logger.error(f"Model file size: {os.path.getsize(MODEL_PATH)} bytes")
            raise  # Re-raise the exception to be caught by outer try block
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
    transforms.Resize((112, 112)),  # Reduced image size
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
        # Optimize image loading and processing with memory efficiency
        with Image.open(image_path) as img:
            # Convert and resize in one step to minimize memory usage
            img = img.convert('RGB').resize((112, 112), Image.Resampling.BILINEAR)
            img_tensor = transforms.ToTensor()(img)
            img_tensor = transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])(img_tensor)
            img_tensor = img_tensor.unsqueeze(0)
        
        # Clear any cached memory before inference
        if hasattr(torch.cuda, 'empty_cache'):
            torch.cuda.empty_cache()
        
        try:
            img_tensor = img_tensor.to(device)
            
            # Make prediction with memory optimization
            with torch.no_grad(), torch.inference_mode():
                torch.set_grad_enabled(False)
                outputs = model(img_tensor)
                probabilities = torch.nn.functional.softmax(outputs, dim=1)[0]
                predicted_class_index = torch.argmax(probabilities).item()
                confidence = probabilities[predicted_class_index].item()
            
            # Get skin type and prepare response
            skin_type = class_names[predicted_class_index]
            predictions_dict = {class_names[i]: float(probabilities[i]) for i in range(len(class_names))}
            
            logger.info(f"Prediction: {skin_type} with confidence {confidence:.2f}")
            
            return {
                "skin_type": skin_type,
                "recommendation": recommendations[skin_type],
                "confidence": confidence,
                "predictions": predictions_dict
            }
            
        except torch.cuda.OutOfMemoryError as e:
            logger.error(f"CUDA out of memory error: {str(e)}")
            # Clear CUDA cache and retry with CPU
            if hasattr(torch.cuda, 'empty_cache'):
                torch.cuda.empty_cache()
            
            # Move model and tensor to CPU
            model.to('cpu')
            img_tensor = img_tensor.to('cpu')
            
            # Retry prediction on CPU
            with torch.no_grad(), torch.inference_mode():
                outputs = model(img_tensor)
                probabilities = torch.nn.functional.softmax(outputs, dim=1)[0]
                predicted_class_index = torch.argmax(probabilities).item()
                confidence = probabilities[predicted_class_index].item()
            
            # Move model back to original device
            model.to(device)
            
            # Get skin type and prepare response
            skin_type = class_names[predicted_class_index]
            predictions_dict = {class_names[i]: float(probabilities[i]) for i in range(len(class_names))}
            
            return {
                "skin_type": skin_type,
                "recommendation": recommendations[skin_type],
                "confidence": confidence,
                "predictions": predictions_dict,
                "note": "Processed on CPU due to memory constraints"
            }
            
    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        logger.error(f"Error type: {type(e)}")
        logger.error(f"Stack trace: {traceback.format_exc()}")
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