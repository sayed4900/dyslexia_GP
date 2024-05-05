import  { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../src/utils/services';
import showImage from '../hooks/showImage'
import PopupComponent from './Popup';
import './HandwritingTest.css'

const HandwritingTest = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { handleImageChange, imgUrl } = showImage();
  const [predictionResult, setPredictionResult] = useState(null);
  const [randomLetter, setRandomLetter] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const [audio, setAudio] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [audioText, setAudioText] = useState("");


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    handleImageChange(event)
  };


  const handleImageUpload = async() => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const res = await axios.post(`${baseUrl}/predict-hand-written`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        // const data = await res.json() ; 

        console.log(res.data)
        setPredictionResult(res.data)

        if (randomLetter === res.data) {
          setShowPopup(true);
          setPopupMessage('You wrote the right letter!');
        } else {
          setShowPopup(true);
          setPopupMessage('You did not write the right letter.');
        }
      } catch (error) {
        console.log(error)
        setPredictionResult(null)
      }
      
    } else {
      console.error('Please select an image before uploading.');
    }
  };

  
  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  const generateRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  }
  
  useState(() => {
    setRandomLetter(generateRandomLetter());
  }, []);

  useEffect(()=>{
    
    const getRandomAudio = async() =>{
      try {
        const res = await axios.get(`${baseUrl}/api/handwritten/random-audio`);
        console.log(res);
        setAudio(res.data.audioUrl);
        setAudioText(res.data.text);
      } catch (error) {
        console.log(error);
      }
    }
    getRandomAudio();
    
  },[])
  
  return (
    <div className="upload-container">
      <div className='preduction-result'>
        <h3>Please listen then write</h3>
        
        <audio controls>
          <source src={audio} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {imgUrl &&
        <div className="image-preview">
          <img className='img-upload' src={imgUrl}/> 
        </div>
      }
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

export default HandwritingTest;
