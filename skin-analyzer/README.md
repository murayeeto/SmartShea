# SmartShea Application

This is a full-stack application that allows users to take a photo of their skin and get an analysis of their skin type along with SmartShea product recommendations.

## Features

- React frontend with camera integration
- Flask backend API
- Skin type classification using PyTorch
- Product recommendations based on skin type

## Skin Types

The application classifies skin into three categories:
- Normal (healthy, well-balanced skin)
- Dry (lacks moisture, may feel tight)
- Oily (excess sebum production, shiny appearance)

## Setup Instructions

### Quick Start (Windows)

For Windows users, we've included batch files to make running the application easier:

1. Double-click the `run.bat` file in the skin-analyzer folder
2. Select from the menu:
   - Option 1: Train the AI model (PyTorch)
   - Option 2: Run the backend server
   - Option 3: Run the frontend server

### Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```
   cd skin-analyzer/backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

5. Run the Flask server:
   ```
   python app.py
   ```
   The server will run on http://localhost:8000

#### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd skin-analyzer/frontend
   ```

2. Install the required packages:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```
   The application will open in your browser at http://localhost:8080

## Usage

1. Open the application in your browser
2. Click "Use Camera" to take a photo or "Select Image" to upload an existing photo
3. Click "Analyze Skin" to get your skin analysis
4. View your skin type and product recommendations

## AI Model Training

The application includes tools to create and train a custom skin classification model:

### 1. Data Collection

Use the provided data collection tool to gather training data:

```
cd skin-analyzer/backend
python data_collection_tool.py --dataset path/to/your/dataset
```

This tool will:
- Create the necessary directory structure
- Allow you to capture images using your webcam
- Label images as normal, dry, or oily
- Organize images into train, valid, and test sets

### 2. Dataset Structure

Your dataset should be organized as follows:

```
dataset/
├── train/
│   ├── normal/
│   ├── dry/
│   └── oily/
├── valid/
│   ├── normal/
│   ├── dry/
│   └── oily/
└── test/
    ├── normal/
    ├── dry/
    └── oily/
```

### 2.1 Using the Provided Dataset

This application comes with a pre-organized dataset in the `backend/Dataset` directory. The dataset contains images of different skin types already categorized into normal, dry, and oily categories.

#### Windows Users

1. Double-click the `run.bat` file in the skin-analyzer folder
2. Select option 1 to train the AI model with PyTorch

#### Alternative Method

To train the model using the provided dataset:

```
cd skin-analyzer/backend
python train_pytorch.py
```

### 3. Training the Model

#### PyTorch Training

```
cd skin-analyzer/backend
python train_pytorch.py --transfer
```

#### Advanced Options

Train the model with specific parameters:

```
cd skin-analyzer/backend
python train_pytorch.py --dataset path/to/your/dataset --transfer --epochs 20
```

Options:
- `--dataset`: Path to your dataset directory (default: ./Dataset)
- `--transfer`: Use transfer learning with ResNet18 (recommended)
- `--epochs`: Number of training epochs (default: 15)
- `--batch-size`: Batch size for training (default: 16)

### 4. Using the Trained Model

After training, two files will be generated:
- `skin_classifier_model.pth`: The trained PyTorch model
- `class_indices.npy`: Mapping between class indices and names

These files will be saved in the backend directory, and the Flask app will automatically use them for predictions.

## Model Performance

The training script will evaluate the model on the test set and provide:
- Test accuracy
- Confusion matrix
- Classification report with precision, recall, and F1-score

## Note

For best results:
1. Collect at least 50-100 images per skin type
2. Ensure good lighting when taking photos
3. Include diverse skin tones and conditions in your dataset
4. Use transfer learning (--transfer flag) for better performance with smaller datasets