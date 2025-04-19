import { useState } from 'react';
import Quiz from './Components/Quiz';
import './App.css'
import {jsQuizz} from './constants';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Quiz questions={jsQuizz.questions} />
  )
}

export default App
