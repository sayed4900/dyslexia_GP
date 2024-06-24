import { useState } from 'react';
import showImage from '../hooks/showImage'
import '../src/style.css'
import './Handwriting.css'
import Header from './Header'
import { baseUrl } from '../src/utils/services';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const HandwritingResult = () => {
    const navigate = useNavigate();

  const location = useLocation();
  const { audioText } = location.state || {};

  const [selectedFile, setSelectedFile] = useState(null);
  const { handleImageChange, imgUrl } = showImage();

  const[loadingResult, setIsLoadingResult] = useState(false);

  
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
        
        console.log(res.data)
        console.log(audioText)

      } catch (error) {
        console.log(error)
        // setPredictionResult(null)
      }
      
    } else {
      console.error('Please select an image before uploading.');
    }
  };

  const handleResult = async() => {
    if (!selectedFile) {
      alert("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      setIsLoadingResult(true);
      const res = await axios.post(`${baseUrl}/handwritten/predict-hand`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res.data.parsedText);
      console.log(audioText)
      let result = "Normal";
      if (res.data.parsedText !== audioText)
        result = "Not Normal"

      setIsLoadingResult(false);
      navigate('/result', { state: { parsedText: res.data.parsedText,audioText,testType:"Handwriting",result } });

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='container'>
      <Header />
      <div className="upload-container">
        <h1>Handwriting Test</h1>
        {imgUrl ? (
          <div className="image-preview">
            <img className='img-upload' src={imgUrl} alt="Uploaded Image"/> 
          </div>
        ) : (
          <div className='img-choose'>
            <p>Choose an image</p>
          </div>
        )}
        <div className='imgs-uploads'>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <div className='pick-img'>
            {/* <img src='../public/imgs/solar_gallery-bold.png'/> */}
            <button onClick={handleImageUpload}>Select an Image</button>
          </div>

          <div className='pick-img'>
            {/* <img src='../public/imgs/cameraImg.png'/> */}
            <button onClick={handleImageUpload}>Upload Image</button>
          </div>
          <div>
            <button onClick={handleResult}> 
              {loadingResult ? "Loading Your result" : "Get Reuslt"} </button>
          </div>
            
        </div>
      </div>
    </div>
  )
}

export default HandwritingResult