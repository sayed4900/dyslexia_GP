import { useEffect, useState } from "react";
import axios from "axios";
import QuestionComponent from "../components/QuestionComponent";
import { baseUrl } from "../src/utils/services";
import Header from '../components/Header';
import './StatisticsTest.css';
import { useNavigate } from "react-router-dom";

export const StatisticsTest = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [result, setResult] = useState(0);
    const [progress, setProgress] = useState(5);
    let correctCount = 0;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
              const res = await axios.get(`${baseUrl}/question`);
              setQuestions(res.data.questions);
            } catch (error) {
              console.log(error);
            }
        };
        fetchQuestions();
    }, []);

    const handleChoiceClick = (questionId, choice) => {
        setUserAnswers({
          ...userAnswers,
          [questionId]: choice
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            const newProgress = ((currentQuestionIndex + 1) / (questions.length - 1)) * 100;
            setProgress(newProgress);
        } else {
            compareAnswers();
            console.log("result is "+result)
            navigate('/result', { state: { result: correctCount >= ((questions.length)/2)? "Normal": "Ab Normal",testType:"statistics", } });
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            const newProgress = ((currentQuestionIndex - 1) / (questions.length - 1)) * 100;
            setProgress(newProgress);
        }
    };

    const compareAnswers = () => {
        
        questions.forEach(question => {
            if (userAnswers[question._id] === question.answer) {
                console.log(userAnswers[question._id], " and " , question.answer)
                setResult(correctCount++);
            }
        });
        console.log("correctCount is "+correctCount)
        console.log("result is " + result)
    };

    const isNextDisabled = !userAnswers[questions[currentQuestionIndex]?._id];

    return (
        <div className="container">
            <Header />
            {questions.length > 0 && (
              <div className="question">
                  <QuestionComponent
                    question={questions[currentQuestionIndex]}
                    onChoiceClick={handleChoiceClick}
                    selectedChoice={userAnswers[questions[currentQuestionIndex]?._id]}
                  />
              </div>
            )}
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="fixed-bottom">
                <div className="navigation-buttons">
                  <button onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</button>
                  <button onClick={handleNext} disabled={isNextDisabled}>
                      {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
                  </button>
                </div>
            </div>
        </div>
    );
};
