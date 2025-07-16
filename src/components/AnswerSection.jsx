import React from 'react'

// Fix props destructuring
const AnswerSection = ({ questions, currentQuestion, handleAnswerOptionClick }) => {
  return (
    <div className="answer-section flex flex-col items-center gap-4 w-full">
      {questions[currentQuestion]?.answers &&
        Object.entries(questions[currentQuestion]?.answers).map(
          ([key, value]) =>
            value && (
              <button
                className="answer-options w-full max-w-md bg-blue-100 hover:bg-blue-300 text-blue-900 font-medium px-4 py-3 rounded-lg shadow transition text-left"
                key={key}
                onClick={() =>
                  handleAnswerOptionClick(
                    questions[currentQuestion]?.correct_answers[`${key}_correct`] === "true",
                    value
                  )
                }
              >
                {value}
              </button>
            )
        )}
    </div>
  )
}

export default AnswerSection