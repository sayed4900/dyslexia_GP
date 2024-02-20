import  { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../src/utils/services';
import AudioPlayer from 'react-audio-player';
import PopupComponent from './Popup';
import './imageUploader.css';

// Import your MP3 file
import recordMP3 from '../public/Cat.mp3';
const apiKey = 'K85143902588957';


const ImageUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);



  const url = 'https://api.ocr.space/parse/image';
  


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        // const res = await axios.post(`${baseUrl}/predict-hand-written`, formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // });
        
        const res = await axios.post(url, formData,);
        const parsedText = res.data.ParsedResults[0].ParsedText;


        if (parsedText === 'Cat') {
          setShowPopup(true);
          setPopupMessage('You wrote the right word!');
        } else {
          setShowPopup(true);
          setPopupMessage('You did not write the right word.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setPredictionResult(null);
      }
    } else {
      console.error('Please select an image before uploading.');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  return (
    <div className="upload-container">
      <div className="preduction-result">
        <h3>Listen to the following audio:</h3>
        <AudioPlayer
          src={recordMP3} // Path to your MP3 file
          autoPlay={false}
          controls
        />
      </div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleImageUpload}>Upload Audio</button>
      {predictionResult && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p>{predictionResult}</p>
        </div>
      )}
      <PopupComponent showPopup={showPopup} onClose={closePopup} message={popupMessage} />
    </div>
  );
};

export default ImageUploadComponent;
