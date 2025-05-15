import { useEffect, useState, useRef } from "react";

function AnswerTimer({ duration, onTimeUp }) {
  const [counter, setCounter] = useState(0);
  const [progressLoaded, setProgressLoaded] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 0.05);
    }, 50);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setProgressLoaded(100 * (counter / duration));

    if (counter >= duration) {
      clearInterval(intervalRef.current);
      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
  }, [counter, duration, onTimeUp]);

  return (
    <div className="answer-timer-container">
      <div
        className="progress"
        style={{
          width: `${Math.min(progressLoaded, 100)}%`,
          backgroundColor:
            progressLoaded < 40
              ? "lightgreen"
              : progressLoaded < 70
              ? "orange"
              : "red",
        }}
      ></div>
    </div>
  );
}

export default AnswerTimer;
