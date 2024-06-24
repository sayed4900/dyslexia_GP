/* eslint-disable react/prop-types */
import './QuestionComponent.css';


const QuestionComponent = ({ question, onChoiceClick, selectedChoice }) => {
    return (
        <div className="question-container">
            <h2>{question.question}</h2>
            {question.image && <img src={question.image} alt="Question related visual" />}
            <div className="choices">
                {question.choices.map((choice, index) => (
                    <button
                        key={index}
                        className={`choice-button ${selectedChoice === choice ? 'selected' : ''}`}
                        onClick={() => onChoiceClick(question._id, choice)}
                    >
                        {choice}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionComponent;
