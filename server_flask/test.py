import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import Image

# Load the OCR model
ocr_model = keras.models.load_model('./AI_models/ocr_results.h5')

# Load and preprocess the image
image_path = './test/CAT.jpg'
image = Image.open(image_path).convert('L')  # Convert image to grayscale
image = image.resize((32, 32))  # Resize image to match expected input shape
# Convert the image to a numpy array
image_array = np.array(image)
# Normalize the pixel values
image_array = image_array / 255.0  # Assuming normalization in [0, 1] range
# Reshape the image array if necessary
image_array = np.expand_dims(image_array, axis=-1)  # Add channel dimension

# Perform prediction
predictions = ocr_model.predict(np.expand_dims(image_array, axis=0))  # Expand dimensions to match the expected input shape

# Process predictions as needed
print(predictions)
