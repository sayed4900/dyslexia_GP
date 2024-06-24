import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';
import '../src/style.css';
import '../components/EyeTracking.css';
import Header from '../components/Header';
import { baseUrl } from '../src/utils/services';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EyeTrackingTest = () => {
  const [eyeTest, setEyeTest] = useState({});
  const [showEyeTracking, setShowEyeTracking] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [screenshots, setScreenshots] = useState([]);
  const [cameraAllowed, setCameraAllowed] = useState(false);
    const [directions, setDirections] = useState("");


  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const captureScreenshot = async () => {
    if (webcamRef.current) {
      const canvas = await html2canvas(webcamRef.current.video);
      const screenshot = canvas.toDataURL('image/png');
      setScreenshots((prevScreenshots) => [...prevScreenshots, screenshot]);
    }
  };

  useEffect(() => {
    const getEyeTest = async () => {
      try {
        const res = await axios.get(`${baseUrl}/eye/`);
        setEyeTest(res.data.eye[0]);
        console.log(res.data.eye[0])
      } catch (error) {
        console.log(error);
      }
    };
    getEyeTest();
  }, []);

    const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:4000/predict-eye', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setDirections(...directions,response.data.direction);
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

    useEffect(() => {
    let interval;
    if (capturing) {
      interval = setInterval(() => {
        captureScreenshot();
      }, eyeTest.screenPerSecond * 1000);

      setTimeout(async () => {
        setCapturing(false);
        // Convert screenshots to files and submit each
        for (let i = 0; i < screenshots.length; i++) {
          const file = dataURLtoFile(screenshots[i], `screenshot-${i}.png`);
          await handleSubmit(file);
        }
        navigate('/'); // Replace '/new-route' with your desired route
      }, eyeTest.timerSeconds * 1000); // Stop capturing and navigate after the specified duration
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [capturing, screenshots]);

   

  const handleContinue = () => {
    setShowEyeTracking(true);
  };

  const startCapturing = () => {
    setCapturing(true);
  };

  const stopCapturing = () => {
    setCapturing(false);
  };

  const handleCameraPermission = () => {
    setCameraAllowed(true);
  };

  return (
    <div className="container">
      <Header />
      {!showEyeTracking ? (
        <div className="before-eye">
          <h1>Eye Tracking</h1>
          <p>Once you open the camera, a piece of reading will appear. To continue, please allow camera permission.</p>
          <button onClick={handleCameraPermission}>Allow Camera</button>
          {cameraAllowed && (
            <>
              <Webcam ref={webcamRef} audio={false} />
              <button onClick={handleContinue}>Continue</button>
            </>
          )}
        </div>
      ) : (
        <div className="eye-tracking">
          {cameraAllowed && <Webcam ref={webcamRef} audio={false} className="hidden-camera" />}
          <div className="eye-text">
            <p>{eyeTest.text}</p>
          </div>
          <div className="btn-eye">
            <button onClick={startCapturing}>Start Capturing</button>
            <button onClick={stopCapturing}>Stop Capturing</button>
          </div>
          <div className="screenshots">
            {screenshots.map((screenshot, index) => (
              <img key={index} src={screenshot} alt={`screenshot-${index}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EyeTrackingTest;
