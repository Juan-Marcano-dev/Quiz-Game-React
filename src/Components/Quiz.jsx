import {useState} from 'react';
import {resultInitialState} from '../constants';
import AnswerTimer from './AnswerTimer';
import Result from './Result';

const Quiz = ({ questions}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const  [showAnswerTimer, setShowAnswerTimer] = useState(true);
    const[answerIdx, setAnswerIdx] = useState(null);
    const [inputAnswer, setInputAnswer] = useState('');
    const[answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const { question, choices, correctAnswer, type}= questions[currentQuestion];
    const [showResult, setShowResult] = useState(false);
    const onAnswerClick = (answer, index) => {  
        setAnswerIdx(index);
        if (answer === correctAnswer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    };

    const onClickNext = (finalAnswer) => {
        setAnswerIdx(null);
        setShowAnswerTimer(false); 
        setInputAnswer("");
        setResult((prev) => {
            return finalAnswer
            ? {
                ...prev,
                score: prev.score + 5,
                correctAnswer: prev.correctAnswer + 1
            } : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1,
            }
        });

        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1)
        } else {
            setCurrentQuestion(0);
            setShowResult(true);
        }

            setTimeout(() => {
                setShowAnswerTimer(true)
        }, 1);
    };

    const onTryAgain = () => {
        setResult(resultInitialState);
        setShowResult(false);
    }

    const handleTimeUp = () => {
        setAnswer(false);
        onClickNext(false);
    };

    const handleInputChange = (evt) => {
        setInputAnswer(evt.target.value);

        if (evt.target.value === correctAnswer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    }
    const getAnswerUI = () => {

        if (type === 'FIB') {
            return <input value={inputAnswer} onChange={handleInputChange} />;
        }

        return (
            <ul>
                    {
                        choices.map((answer, index) => {
                            return (
                            <li onClick={() => onAnswerClick(answer, index)}  key={answer} className={answerIdx === index ? 'selected-answer' : null}>
                            {answer}
                            </li>
                            )
                        })
                    }
                </ul>
        );
    }

    return (
        <div className="quiz-container">
            {!showResult ? (
            <>
            {showAnswerTimer && <AnswerTimer  duration={8} onTimeUp={handleTimeUp}/>}
                <span className="active-question-no">{currentQuestion + 1}</span>
                <span className="total-question">/{questions.length}</span>
                <h2>{question}</h2>
                {getAnswerUI()}
                <div className='footer'>
                <button
                onClick={() => onClickNext(answer)}
                disabled={type === 'FIB' ? inputAnswer.trim() === '' : answerIdx === null}>
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
                </div>
</>            
            ) : (
                <Result result={result} onTryAgain={onTryAgain} totalQuestions= {questions.length} />
            )}
        </div>
    )
};

export default Quiz;