'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Types for better type safety
type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

type Score = {
  correct: number
  incorrect: number
}

// This would typically come from an API based on the tournament ID
const questions: Question[] = [
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
  }
  // Add more questions as needed
]

export default function QuizPage() {
  const searchParams = useSearchParams()
  const playerName = searchParams.get('name') || 'Player'
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState<Score>({ correct: 0, incorrect: 0 })
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    
    const isCorrect = answer === questions[currentQuestion].correctAnswer
    setScore(prev => ({
      ...prev,
      [isCorrect ? 'correct' : 'incorrect']: prev[isCorrect ? 'correct' : 'incorrect'] + 1
    }))

    const isLastQuestion = currentQuestion === questions.length - 1

    setTimeout(() => {
      if (isLastQuestion) {
        setQuizCompleted(true)
      } else {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer("")
      }
    }, 1000)
  }

  const getButtonClassName = (option: string) => {
    if (selectedAnswer === "") return "bg-orange-500"
    
    if (selectedAnswer === option) {
      return option === questions[currentQuestion].correctAnswer
        ? "bg-green-500"
        : "bg-red-500"
    }
    
    return "bg-orange-500"
  }

  if (quizCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-orange-600">Quiz Completed</CardTitle>
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

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQuestionData = questions[currentQuestion]

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-orange-600">
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-2">Player: {playerName}</p>
          <p className="text-green-600">Correct: {score.correct}</p>
          <p className="text-red-600">Incorrect: {score.incorrect}</p>
          <Progress value={progress} className="my-4" />
          <p className="text-xl mb-4">{currentQuestionData.question}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestionData.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full ${getButtonClassName(option)} hover:opacity-80 text-white`}
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