import React, { useState } from 'react'
import '../styles/Quiz.css'

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState([])

  const questions = [
    {
      question: 'How much food is wasted globally per year?',
      options: ['500 million tonnes', '1.3 billion tonnes', '5 billion tonnes', '100 million tonnes'],
      correct: 1,
      explanation: 'Approximately 1.3 billion tonnes of food are wasted annually worldwide.'
    },
    {
      question: 'What percentage of global emissions come from food waste?',
      options: ['2%', '5%', '10%', '20%'],
      correct: 2,
      explanation: 'Food waste is responsible for about 10% of global greenhouse gas emissions.'
    },
    {
      question: 'Which storage method keeps herbs fresh the longest?',
      options: ['In a plastic bag', 'In water like flowers', 'In the freezer', 'In paper towels'],
      correct: 1,
      explanation: 'Storing fresh herbs in water (like flowers in a vase) keeps them fresh for longer.'
    },
    {
      question: 'How much of the world\'s freshwater is used in food production?',
      options: ['10%', '25%', '50%', '75%'],
      correct: 1,
      explanation: 'Approximately 25% of the world\'s freshwater is used in food production, much of which is wasted.'
    },
    {
      question: 'What is the best way to reduce food waste at home?',
      options: ['Buy organic only', 'Plan meals and shop with a list', 'Never buy fresh produce', 'Always buy in bulk'],
      correct: 1,
      explanation: 'Meal planning and shopping with a list is the most effective way to reduce food waste at home.'
    },
    {
      question: 'How many people face food insecurity globally?',
      options: ['100 million', '400 million', '821 million', '1 billion'],
      correct: 2,
      explanation: 'Approximately 821 million people face food insecurity, while significant food is wasted.'
    },
    {
      question: 'Which vegetable part is edible and often wasted?',
      options: ['Broccoli stems', 'Carrot tops', 'Beet leaves', 'All of the above'],
      correct: 3,
      explanation: 'All of these are edible and nutritious but are commonly thrown away!'
    },
    {
      question: 'What is the environmental benefit of composting?',
      options: ['Creates CO2', 'Reduces methane in landfills', 'Uses more water', 'Attracts pests'],
      correct: 1,
      explanation: 'Composting reduces methane emissions from landfills and creates nutrient-rich soil.'
    }
  ]

  const handleAnswer = (index) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = index
    setSelectedAnswers(newSelectedAnswers)

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowScore(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedAnswers([])
  }

  return (
    <section className="quiz">
      <div className="quiz-container">
        <h2>Food Waste Awareness Quiz</h2>
        
        {showScore ? (
          <div className="score-section">
            <h3>Quiz Complete! 🎉</h3>
            <div className="score-display">
              <p>You scored <span className="score-number">{score}</span> out of <span className="total-questions">{questions.length}</span></p>
              <div className="score-percentage">
                {Math.round((score / questions.length) * 100)}%
              </div>
            </div>
            
            <div className="score-feedback">
              {score === questions.length && <p>Perfect score! You're a food waste expert! 🌟</p>}
              {score >= questions.length * 0.75 && score < questions.length && <p>Excellent! You know a lot about food waste. Keep learning! 👏</p>}
              {score >= questions.length * 0.5 && score < questions.length * 0.75 && <p>Good job! You're on your way to becoming a food waste warrior. 💪</p>}
              {score < questions.length * 0.5 && <p>Good start! Learn more about food waste and try again. 📚</p>}
            </div>

            <button className="restart-btn" onClick={restartQuiz}>
              Retake Quiz
            </button>
          </div>
        ) : (
          <div className="question-section">
            <div className="question-header">
              <span className="question-number">Question {currentQuestion + 1}/{questions.length}</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="question">{questions[currentQuestion].question}</h3>

            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              ))}
            </div>

            {selectedAnswers[currentQuestion] !== undefined && (
              <div className={`explanation ${selectedAnswers[currentQuestion] === questions[currentQuestion].correct ? 'correct' : 'incorrect'}`}>
                <p>{questions[currentQuestion].explanation}</p>
              </div>
            )}

            <button 
              className="next-btn" 
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
            >
              {currentQuestion === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Quiz
