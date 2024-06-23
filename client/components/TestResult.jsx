
import { useLocation } from 'react-router-dom';
import Header from './Header';
import './TestResult.css';

const TestResult = () => {
  const location = useLocation();
  const { result,testType,audioText,parsedText } = location.state || {};

  return (
    <div className='container'>
      <Header />
      <div className="content">
        <h1>{testType} Test</h1>

        <h2><span>The result is</span> {result}</h2>
        
        <div>
          {testType=="Handwriting"&&
          <div>
            <p>The orginal text : {audioText}</p>

            <p>You wrote : {parsedText}</p>
          </div>
          }
        </div>

      </div>
    </div>
  );
};

export default TestResult;
