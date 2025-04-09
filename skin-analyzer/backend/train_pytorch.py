import os
import sys
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms, models
from PIL import Image
import argparse

# Define the device
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# Custom dataset class
class SkinDataset(Dataset):
    def __init__(self, root_dir, transform=None):
        self.root_dir = root_dir
        self.transform = transform
        self.classes = sorted([d for d in os.listdir(root_dir) if os.path.isdir(os.path.join(root_dir, d))])
        self.class_to_idx = {cls_name: i for i, cls_name in enumerate(self.classes)}
        
        self.samples = []
        for class_name in self.classes:
            class_dir = os.path.join(root_dir, class_name)
            for img_name in os.listdir(class_dir):
                if img_name.lower().endswith(('.jpg', '.jpeg', '.png')):
                    self.samples.append((os.path.join(class_dir, img_name), self.class_to_idx[class_name]))
    
    def __len__(self):
        return len(self.samples)
    
    def __getitem__(self, idx):
        img_path, label = self.samples[idx]
        image = Image.open(img_path).convert('RGB')
        
        if self.transform:
            image = self.transform(image)
            
        return image, label

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

# Function to create a transfer learning model using ResNet18
def create_transfer_model(num_classes):
    model = models.resnet18(pretrained=True)
    
    # Freeze all parameters
    for param in model.parameters():
        param.requires_grad = False
    
    # Replace the final fully connected layer
    num_features = model.fc.in_features
    model.fc = nn.Linear(num_features, num_classes)
    
    return model

def train_model(model, dataloaders, criterion, optimizer, num_epochs=10):
    best_acc = 0.0
    best_model_wts = model.state_dict()
    
    for epoch in range(num_epochs):
        print(f'Epoch {epoch+1}/{num_epochs}')
        print('-' * 10)
        
        # Each epoch has a training and validation phase
        for phase in ['train', 'val']:
            if phase == 'train':
                model.train()  # Set model to training mode
            else:
                model.eval()   # Set model to evaluate mode
            
            running_loss = 0.0
            running_corrects = 0
            
            # Iterate over data
            for inputs, labels in dataloaders[phase]:
                inputs = inputs.to(device)
                labels = labels.to(device)
                
                # Zero the parameter gradients
                optimizer.zero_grad()
                
                # Forward pass
                with torch.set_grad_enabled(phase == 'train'):
                    outputs = model(inputs)
                    _, preds = torch.max(outputs, 1)
                    loss = criterion(outputs, labels)
                    
                    # Backward + optimize only if in training phase
                    if phase == 'train':
                        loss.backward()
                        optimizer.step()
                
                # Statistics
                running_loss += loss.item() * inputs.size(0)
                running_corrects += torch.sum(preds == labels.data)
            
            epoch_loss = running_loss / len(dataloaders[phase].dataset)
            epoch_acc = running_corrects.double() / len(dataloaders[phase].dataset)
            
            print(f'{phase} Loss: {epoch_loss:.4f} Acc: {epoch_acc:.4f}')
            
            # Deep copy the model if it's the best validation accuracy so far
            if phase == 'val' and epoch_acc > best_acc:
                best_acc = epoch_acc
                best_model_wts = model.state_dict()
        
        print()
    
    print(f'Best val Acc: {best_acc:.4f}')
    
    # Load best model weights
    model.load_state_dict(best_model_wts)
    return model

def main():
    parser = argparse.ArgumentParser(description='Train skin classification model with PyTorch')
    parser.add_argument('--dataset', type=str, default='Dataset',
                        help='Path to dataset directory (default: ./Dataset)')
    parser.add_argument('--transfer', action='store_true',
                        help='Use transfer learning with ResNet18')
    parser.add_argument('--epochs', type=int, default=100,
                        help='Number of epochs to train for (default: 15)')
    parser.add_argument('--batch-size', type=int, default=32,
                        help='Batch size for training (default: 16)')
    
    args = parser.parse_args()
    
    # Get the current directory (where this script is located)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Path to the dataset
    if os.path.isabs(args.dataset):
        dataset_path = args.dataset
    else:
        dataset_path = os.path.join(current_dir, args.dataset)
    
    # Check if dataset exists
    if not os.path.exists(dataset_path):
        print(f"Error: Dataset not found at {dataset_path}")
        print("Please make sure the Dataset folder exists.")
        sys.exit(1)
    
    # Check dataset structure
    train_dir = os.path.join(dataset_path, 'train')
    if not os.path.exists(train_dir):
        print(f"Error: 'train' directory not found at {train_dir}")
        sys.exit(1)
    
    # Check for validation directory
    valid_dir = os.path.join(dataset_path, 'valid')
    validation_dir = os.path.join(dataset_path, 'validation')
    test_dir = os.path.join(dataset_path, 'test')
    
    if os.path.exists(valid_dir):
        val_dir = valid_dir
    elif os.path.exists(validation_dir):
        val_dir = validation_dir
    elif os.path.exists(test_dir):
        val_dir = test_dir
        print("Using 'test' directory for validation")
    else:
        print("Warning: No validation directory found. Using training data for validation.")
        val_dir = train_dir
    
    # Print information
    print(f"\n=== PyTorch Skin Analyzer Model Training ===")
    print(f"Dataset path: {dataset_path}")
    print(f"Training directory: {train_dir}")
    print(f"Validation directory: {val_dir}")
    print(f"Transfer learning: {'Enabled' if args.transfer else 'Disabled'}")
    print(f"Epochs: {args.epochs}")
    print(f"Batch size: {args.batch_size}")
    
    # Define data transforms
    data_transforms = {
        'train': transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.RandomHorizontalFlip(),
            transforms.RandomRotation(20),
            transforms.ColorJitter(brightness=0.1, contrast=0.1, saturation=0.1, hue=0.1),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
        'val': transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
    }
    
    # Create datasets
    image_datasets = {
        'train': SkinDataset(train_dir, transform=data_transforms['train']),
        'val': SkinDataset(val_dir, transform=data_transforms['val'])
    }
    
    # Create dataloaders
    dataloaders = {
        'train': DataLoader(image_datasets['train'], batch_size=args.batch_size, shuffle=True, num_workers=0),
        'val': DataLoader(image_datasets['val'], batch_size=args.batch_size, shuffle=False, num_workers=0)
    }
    
    # Get class names and count
    class_names = image_datasets['train'].classes
    num_classes = len(class_names)
    
    print(f"\nFound {num_classes} classes: {', '.join(class_names)}")
    print(f"Training samples: {len(image_datasets['train'])}")
    print(f"Validation samples: {len(image_datasets['val'])}")
    
    # Create model
    if args.transfer:
        print("\nUsing transfer learning with ResNet18")
        model = create_transfer_model(num_classes)
    else:
        print("\nUsing custom CNN model")
        model = SkinClassifier(num_classes)
    
    # Move model to device
    model = model.to(device)
    
    # Define loss function and optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    # Train the model
    print("\nStarting training...")
    model = train_model(model, dataloaders, criterion, optimizer, num_epochs=args.epochs)
    
    # Save the model
    model_path = os.path.join(current_dir, 'skin_classifier_model.pth')
    torch.save(model.state_dict(), model_path)
    print(f"\nModel saved as 'skin_classifier_model.pth'")
    
    # Save class names
    class_indices = {i: name for i, name in enumerate(class_names)}
    np.save(os.path.join(current_dir, 'class_indices.npy'), class_indices)
    print(f"Class indices saved as 'class_indices.npy'")
    
    print("\nTraining complete!")
    print("You can now run the Flask app to use the trained model.")

if __name__ == "__main__":
    main()