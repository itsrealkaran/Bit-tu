'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Volume2, Heart, Star, Zap, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const lessonContent = {
  title: 'French Basics',
  questions: [
    {
      type: 'multiple-choice',
      question: 'What does "Bonjour" mean?',
      options: ['Hello', 'Goodbye', 'Good night', 'Thank you'],
      correctAnswer: 'Hello',
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      type: 'translation',
      question: 'Translate: "Goodbye" to French',
      correctAnswer: 'Au revoir',
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      type: 'listening',
      question: 'What did you hear?',
      options: ['Comment allez-vous?', 'Comment vous appelez-vous?', 'Quel âge avez-vous?', 'Où habitez-vous?'],
      correctAnswer: 'Comment allez-vous?',
      audioUrl: '/placeholder.mp3'
    },
    {
      type: 'multiple-choice',
      question: 'Which word means "please" in French?',
      options: ['Merci', 'S\'il vous plaît', 'Pardon', 'Excusez-moi'],
      correctAnswer: 'S\'il vous plaît',
      image: '/placeholder.svg?height=400&width=600'
    },
    {
      type: 'translation',
      question: 'Translate: "My name is John" to French',
      correctAnswer: 'Je m\'appelle John',
      image: '/placeholder.svg?height=400&width=600'
    }
  ]
}

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [lives, setLives] = useState(3)
  const [streak, setStreak] = useState(0)

  const currentQuestionData = lessonContent.questions[currentQuestion]

  const handleAnswer = () => {
    const correct = userAnswer.toLowerCase() === currentQuestionData.correctAnswer.toLowerCase()
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
      setStreak(streak + 1)
    } else {
      setLives(lives - 1)
      setStreak(0)
    }
    setShowFeedback(true)

    setTimeout(() => {
      setShowFeedback(false)
      setUserAnswer('')
      if (currentQuestion < lessonContent.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      }
    }, 2000)
  }

  const renderQuestion = () => {
    switch (currentQuestionData.type) {
      case 'multiple-choice':
        return (
          <RadioGroup onValueChange={setUserAnswer} value={userAnswer} className="space-y-2">
            {currentQuestionData.options && currentQuestionData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case 'translation':
        return (
          <Input
            type="text"
            placeholder="Type your answer here"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full p-3 rounded-lg shadow-sm"
          />
        )
      case 'listening':
        return (
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full flex items-center justify-center bg-blue-100 hover:bg-blue-200 transition-colors"
              onClick={() => {
                console.log('Playing audio:', currentQuestionData.audioUrl)
              }}
            >
              <Volume2 className="h-6 w-6 mr-2" />
              Play Audio
            </Button>
            <RadioGroup onValueChange={setUserAnswer} value={userAnswer} className="space-y-2">
              {currentQuestionData.options && currentQuestionData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="mr-2" />
            <span className="text-lg font-semibold">Back to Lessons</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="flex items-center bg-red-100">
              <Heart className="h-4 w-4 mr-1 text-red-500" />
              {lives}
            </Badge>
            <Badge variant="secondary" className="flex items-center bg-yellow-100">
              <Zap className="h-4 w-4 mr-1 text-yellow-500" />
              {streak}
            </Badge>
          </div>
        </header>

        <Card className="mb-6 border-2 border-blue-200 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">{lessonContent.title}</CardTitle>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <Progress value={(currentQuestion / lessonContent.questions.length) * 100} className="mb-4" />
            {/* {currentQuestionData.image && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={currentQuestionData.image}
                  alt="Question illustration"
                  fill
                  className="object-cover"
                />
              </div>
            )} */}
            <h2 className="text-xl font-semibold text-blue-800 mt-4">{currentQuestionData.question}</h2>
            {renderQuestion()}
            {showFeedback && (
              <Alert variant={isCorrect ? "default" : "destructive"} className="mt-4">
                <AlertTitle className="flex items-center">
                  {isCorrect ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
                  {isCorrect ? "Correct!" : "Incorrect"}
                </AlertTitle>
                <AlertDescription>
                  {isCorrect ? "Great job!" : `The correct answer is: ${currentQuestionData.correctAnswer}`}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between items-center bg-gray-50 rounded-b-lg">
            <p className="text-blue-600">Question {currentQuestion + 1} of {lessonContent.questions.length}</p>
            <Button 
              onClick={handleAnswer} 
              disabled={!userAnswer || showFeedback} 
              className="bg-green-500 hover:bg-green-600 text-white transition-colors"
            >
              Check Answer
            </Button>
          </CardFooter>
        </Card>
{/* 
        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="text-xl font-bold">Lesson Progress</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Star className="h-6 w-6 mr-2 text-yellow-500" />
                <span className="text-lg font-semibold">{score} / {lessonContent.questions.length}</span>
              </div>
              <Progress value={(score / lessonContent.questions.length) * 100} className="w-2/3" />
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}