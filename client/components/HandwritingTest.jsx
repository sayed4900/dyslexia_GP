import  { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../src/utils/services';

import './Handwriting.css'
import '../src/style.css'
import Header from './Header';

const HandwritingTest = () => {
  
  const [audio, setAudio] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [audioText, setAudioText] = useState("");


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
    <div className='container'>
      <Header/> 
      <div className="upload-container">
        <div>
          <h1>HandWriting Test</h1>
          <h2>Please listen then write</h2>
        </div>
        <div className='preduction-result'>
          <audio controls>
            <source src={audio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <button>Continue</button>
      </div>
    </div>
  );
};

export default HandwritingTest;
