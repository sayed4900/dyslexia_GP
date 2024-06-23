// DyslexiaTests.jsx
import {  useNavigate } from 'react-router-dom';
import './DyslexiaTests.css';
import Header from './Header';

const DyslexiaTests = () => {
  const tests = [
    { name: 'Handwriting', testLink:"hand-writing", color: '#1E88E5' },
    { name: 'Eye Tracking', color: '#AB47BC' },
    { name: 'EEG-Based Brain Activity', color: '#8E24AA' },
    { name: 'MRI-Based Brain Imaging', color: '#00ACC1' },
    { name: 'Other Behavioral /Cognitive Tests', color: '#FFB300' },
  ];

    const navigate = useNavigate();

  const handleTestClick = (testName) => {
    
    navigate(`/test/${testName}`)
  };

  return (
    <div className='container'>
    <Header/>
    <div className="dyslexia-tests">
      <h1>Dyslexia tests</h1>
      {tests.map((test, index) => (
        <div
            key={index}
            className="test-card"
            style={{ backgroundColor: test.color }}
            onClick={() => handleTestClick(test.testLink)}
          >
          <div className='lock-imgs'>
            <img className='ellipse' src="../public/imgs/Ellipse.png" alt="" />
            <img className='lock' src="../public/imgs/lock.png" alt="" />
          </div>
          <span className="test-name">{test.name}</span>
        </div>
      ))}
    </div>
    </div>
  );
};

export default DyslexiaTests;
