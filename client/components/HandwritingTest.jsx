import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../src/utils/services';

import './Handwriting.css'
import '../src/style.css'
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const HandwritingTest = () => {
  
  const navigate = useNavigate();

  const [audio, setAudio] = useState("");
  const [audioText, setAudioText] = useState("");

  useEffect(() => {
    const getRandomAudio = async () => {
      try {
        const res = await axios.get(`${baseUrl}/handwritten/random-audio`);
        console.log('API Response:', res);
        setAudio(res.data.audioUrl);
        setAudioText(res.data.text);
      } catch (error) {
        console.log('API Error:', error);
      }
    };
    getRandomAudio();
  }, []);
  
  const handleContinue = () => {
    navigate('/test/hand-writing/continue',  { state: { audioText } });
  };

  return (
    <div className='container'>
      <Header/> 
      <div className="upload-container">
        <div>
          <h1>HandWriting Test</h1>
          <h2>Please listen then write</h2>
        </div>
        <div className='preduction-result'>
          {audio && (
            <audio controls>
              <source src={audio} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
};

export default HandwritingTest;
