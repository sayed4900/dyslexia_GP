import { useState } from 'react';
import showImage from '../hooks/showImage'
import '../src/style.css'
import './Handwriting.css'
import Header from './Header'
import { baseUrl } from '../src/utils/services';
import axios from 'axios';

const HandwritingResult = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const { handleImageChange, imgUrl } = showImage();

  


  
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
        

        // if ("randomLetter" === res.data) {
        //   setShowPopup(true);
        //   setPopupMessage('You wrote the right letter!');
        // } else {
        //   setShowPopup(true);
        //   setPopupMessage('You did not write the right letter.');
        // }
      } catch (error) {
        console.log(error)
        // setPredictionResult(null)
      }
      
    } else {
      console.error('Please select an image before uploading.');
    }
  };


  return (
    <div className='container'>
      <Header/>
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
      
          <button>Reuslt</button>
        </div>
      </div>
    </div>
  )
}

export default HandwritingResult