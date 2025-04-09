import cv2
import os
import time
import argparse

def create_dataset_directories(base_path):
    """
    Create the necessary directories for the dataset
    """
    # Create main directories
    os.makedirs(os.path.join(base_path, 'train', 'normal'), exist_ok=True)
    os.makedirs(os.path.join(base_path, 'train', 'dry'), exist_ok=True)
    os.makedirs(os.path.join(base_path, 'train', 'oily'), exist_ok=True)
    
    os.makedirs(os.path.join(base_path, 'valid', 'normal'), exist_ok=True)
    os.makedirs(os.path.join(base_path, 'valid', 'dry'), exist_ok=True)
    os.makedirs(os.path.join(base_path, 'valid', 'oily'), exist_ok=True)
    
    os.makedirs(os.path.join(base_path, 'test', 'normal'), exist_ok=True)
    os.makedirs(os.path.join(base_path, 'test', 'dry'), exist_ok=True)
    os.makedirs(os.path.join(base_path, 'test', 'oily'), exist_ok=True)
    
    print(f"Created dataset directories in {base_path}")

def collect_data(dataset_path):
    """
    Collect and label skin images using webcam
    """
    # Create dataset directories
    create_dataset_directories(dataset_path)
    
    # Initialize camera
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open camera.")
        return
    
    # Set up window
    cv2.namedWindow('Skin Data Collection Tool', cv2.WINDOW_NORMAL)
    
    # Set up counters
    counters = {
        'train': {'normal': 0, 'dry': 0, 'oily': 0},
        'valid': {'normal': 0, 'dry': 0, 'oily': 0},
        'test': {'normal': 0, 'dry': 0, 'oily': 0}
    }
    
    # Current mode (train, valid, test)
    current_mode = 'train'
    
    print("\n=== Skin Data Collection Tool ===")
    print("Press the following keys to capture images:")
    print("1: Save as 'normal' (healthy, well-balanced skin)")
    print("2: Save as 'dry' (lacks moisture, may feel tight)")
    print("3: Save as 'oily' (excess sebum, shiny appearance)")
    print("\nOther controls:")
    print("m: Switch mode (train/valid/test)")
    print("q: Quit")
    print("\nCurrent mode: TRAIN")
    
    while True:
        # Capture frame
        ret, frame = cap.read()
        if not ret:
            print("Error: Failed to capture image")
            break
        
        # Add text overlay
        cv2.putText(frame, f"Mode: {current_mode.upper()}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        cv2.putText(frame, "1:Normal 2:Dry 3:Oily", (10, 60),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        cv2.putText(frame, "m:Switch Mode q:Quit", (10, 90),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        # Display counts
        y_pos = 120
        for skin_type in ['normal', 'dry', 'oily']:
            count = counters[current_mode][skin_type]
            cv2.putText(frame, f"{skin_type}: {count}", (10, y_pos),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            y_pos += 30
        
        # Display frame
        cv2.imshow('Skin Data Collection Tool', frame)
        
        # Wait for key press
        key = cv2.waitKey(1) & 0xFF
        
        # Process key press
        if key == ord('q'):
            break
        elif key == ord('m'):
            # Switch mode
            if current_mode == 'train':
                current_mode = 'valid'
            elif current_mode == 'valid':
                current_mode = 'test'
            else:
                current_mode = 'train'
            print(f"\nSwitched to {current_mode.upper()} mode")
        elif key == ord('1'):
            # Save as normal
            filename = f"img_{int(time.time())}_{counters[current_mode]['normal']}.jpg"
            filepath = os.path.join(dataset_path, current_mode, 'normal', filename)
            cv2.imwrite(filepath, frame)
            counters[current_mode]['normal'] += 1
            print(f"Saved as normal in {current_mode} set: {filepath}")
        elif key == ord('2'):
            # Save as dry
            filename = f"img_{int(time.time())}_{counters[current_mode]['dry']}.jpg"
            filepath = os.path.join(dataset_path, current_mode, 'dry', filename)
            cv2.imwrite(filepath, frame)
            counters[current_mode]['dry'] += 1
            print(f"Saved as dry in {current_mode} set: {filepath}")
        elif key == ord('3'):
            # Save as oily
            filename = f"img_{int(time.time())}_{counters[current_mode]['oily']}.jpg"
            filepath = os.path.join(dataset_path, current_mode, 'oily', filename)
            cv2.imwrite(filepath, frame)
            counters[current_mode]['oily'] += 1
            print(f"Saved as oily in {current_mode} set: {filepath}")
    
    # Release resources
    cap.release()
    cv2.destroyAllWindows()
    
    # Print summary
    print("\n=== Data Collection Summary ===")
    for mode in ['train', 'valid', 'test']:
        print(f"\n{mode.upper()} set:")
        for skin_type in ['normal', 'dry', 'oily']:
            print(f"  {skin_type}: {counters[mode][skin_type]} images")
    
    print("\nTotal images collected:", sum(sum(counters[mode][skin_type] for skin_type in counters[mode]) for mode in counters))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Collect and label skin images')
    parser.add_argument('--dataset', type=str, default='dataset',
                        help='Path to save the dataset (default: ./dataset)')
    
    args = parser.parse_args()
    
    collect_data(args.dataset)