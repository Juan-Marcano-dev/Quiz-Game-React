import { useEffect, useState } from 'react';
import Quiz from './Components/Quiz';
import './App.css'

function App() {
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0)

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async() => {
    try {
      const response = await fetch("https://644982a3e7eb3378ca4ba471.mockapi.io/questions")
      const questionsResponse = await response.json();
      console.log(questionsResponse);
      setQuestions(questionsResponse);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="app-container">
      <h1 className='title-text'>Let's Play Quiz!</h1>
      {questions.length > 0 ? <Quiz questions={questions} /> : <p>Cargando preguntas...</p>}
    </div>
  );
  
}

export default App
