import React, { useState,useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  const decrementTime = () => {
    if (timeRemaining > 0) {
      setTimeRemaining(timeRemaining - 1);
    } else {
      // When timeRemaining hits 0, reset it to 10 seconds
      setTimeRemaining(10);
      onAnswered(false)
    }
  };
  // add useEffect code
  useEffect(() => {
    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    return function cleanup() {
      clearTimeout(timer);
    };
  }, [timeRemaining]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <div>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </div>
  );
}

export default Question;
