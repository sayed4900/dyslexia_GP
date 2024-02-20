from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing import image as img_preprocess
import numpy as np
from joblib import joblib

app = Flask(__name__)
CORS(app)

# Load your trained model
model_handwirte = tf.keras.models.load_model('./myلهف_model.h5')
# model_handwirte = tf.keras.models.load_model('./Handwritten-OCR.h5')
# model_handwirte = tf.keras.models.load_model('./best_model.pth')
model = joblib.load('ocr_modell')



def number_to_char(num):
    if num < 0 or num > 25:
        return "Out of range"
    else:
        return chr(ord('A') + num)

# Function to preprocess the image
def preprocess_image(image_path, target_width, target_height):
    img = img_preprocess.load_img(image_path, target_size=(target_width, target_height), color_mode='grayscale')
    img_array = img_preprocess.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0  # Normalize pixel values
    return img_array

@app.route('/predict-hand-written', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    try:
        # Save the received image 
        image_path = './temp_image.png'
        file.save(image_path)

        # Define your target width and height as expected by the model
        target_width, target_height = 28, 28  # Replace with the model's input dimensions

        # Preprocess the image
        processed_image = preprocess_image(image_path, target_width, target_height)

        # Make predictions using the model
        predictions = model_handwirte.predict(processed_image)

        # Get the predicted class or classes depending on your model's output
        predicted_class = np.argmax(predictions, axis=1)
        predicted_class = number_to_char(predicted_class[0])

        # Return the predicted class
        return jsonify(predicted_class)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
