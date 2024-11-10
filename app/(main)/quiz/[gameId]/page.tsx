'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// This would typically come from an API based on the tournament ID
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  // Add more questions as needed
]

export default function QuizPage() {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const playerName = searchParams.get('name') || 'Player'
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }))
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }))
    }

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer("")
      }, 1000)
    } else {
      setQuizCompleted(true)
    }
  }

  const totalQuestions = questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  if (quizCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-600">Quiz Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-4">Congratulations, {playerName}!</p>
            <p className="mb-2">Your score:</p>
            <p className="text-green-600">Correct: {score.correct}</p>
            <p className="text-red-600">Incorrect: {score.incorrect}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-600">
            Question {currentQuestion + 1} of {totalQuestions}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-2">Player: {playerName}</p>
          <p className="text-green-600">Correct: {score.correct}</p>
          <p className="text-red-600">Incorrect: {score.incorrect}</p>
          <Progress value={progress} className="my-4" />
          <p className="text-xl mb-4">{questions[currentQuestion].question}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full ${
                  selectedAnswer === option
                    ? option === questions[currentQuestion].correctAnswer
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-blue-500"
                } hover:opacity-80 text-white`}
                disabled={selectedAnswer !== ""}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}