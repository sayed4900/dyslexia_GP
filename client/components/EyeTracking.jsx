// WebcamCapture.jsx
import  { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';
import '../src/style.css'
import Header from './Header';


const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [screenshots, setScreenshots] = useState([]);

  const captureScreenshot = async () => {
    if (webcamRef.current) {
      const canvas = await html2canvas(webcamRef.current.video);
      const screenshot = canvas.toDataURL('image/png');
      setScreenshots((prevScreenshots) => [...prevScreenshots, screenshot]);
    }
  };

  useEffect(() => {
    let interval;
    if (capturing) {
      interval = setInterval(() => {
        captureScreenshot();
      }, 2000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [capturing]);

  const startCapturing = () => {
    setCapturing(true);
  };

  const stopCapturing = () => {
    setCapturing(false);
  };

  return (

    <div className="container">
      <Header/>
      <Webcam ref={webcamRef} audio={false} />
      <div className="text-overlay">
        <p>Please read this text aloud while the camera captures your image.</p>
      </div>
      <button onClick={startCapturing}>Start Capturing</button>
      <button onClick={stopCapturing}>Stop Capturing</button>
      <div className="screenshots">
        {screenshots.map((screenshot, index) => (
          <img key={index} src={screenshot} alt={`screenshot-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default WebcamCapture;
