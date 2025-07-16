import { useState, useEffect} from 'react'
import AnswerSection from './AnswerSection'
import axios from "axios";



const Quiz = () => {
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] =useState(0)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const apiKey = import.meta.env.VITE_QUIZ_API_KEY ;
    //Fetch Questions from API
    const fetchQuestions = async () =>{
        const response = await axios.get(`https://quizapi.io/api/v1/questions?apiKey=0Qu97uw1NhkhVHivqv7yku1vToRTHphjPFUUTtJ6&limit=20&category=code`)
        setQuestions(response.data)
    }
    useEffect(()=>{
        fetchQuestions()
    }, [])

    //Handle the clicked answers option
    const handleAnswerOptionClick = (isCorrect, answer) => {
        if(isCorrect){
            setScore((prev) => prev + 1)
        }

        const updatedSelectedAnswers = [...selectedAnswers]
        updatedSelectedAnswers[currentQuestion] = answer 
        setSelectedAnswers(updatedSelectedAnswers)
        const nextQuestion = currentQuestion + 1
        if(nextQuestion < questions.length){
            setCurrentQuestion(nextQuestion)
        }else{
            setShowScore(true)
        }
    }

    //handle play again button functionality
    const handlePlayAgainClick =  () =>{
        setCurrentQuestion(0)
        setShowScore(false)
        setScore(0)
        setSelectedAnswers([])
    }
  
  
    return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
    <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl flex flex-col items-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Devlab Quiz App</h1>
      {showScore ? (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Your Score: {score}</h2>
          <button
            className="playAgain-btn bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            onClick={handlePlayAgainClick}
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          {questions.length > 0 ? (
            <div className="question-sec flex flex-col items-center w-full">
              <div className="question-count text-gray-600 mb-2">
                <span className="font-bold text-lg">{currentQuestion + 1}</span> / {questions.length}
              </div>
              <div className="question-tex text-xl font-medium text-blue-800 mb-6 text-center">
                {questions[currentQuestion]?.question}
              </div>
              <AnswerSection
                questions={questions}
                currentQuestion={currentQuestion}
                handleAnswerOptionClick={handleAnswerOptionClick}
              />
              <div className="na-buttons flex gap-4 mt-6">
                {currentQuestion > 0 && (
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg transition"
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  >
                    Previous
                  </button>
                )}
                {currentQuestion < questions.length - 1 && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </>
      )}
    </div>
  </div>
  )
}

export default Quiz