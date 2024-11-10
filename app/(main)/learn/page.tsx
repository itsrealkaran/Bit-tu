'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Book, Lock, Star, Trophy, Zap, Heart, Gem } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

// Mock data
const mockSections = [
  {
    id: 1,
    title: 'Basics',
    subtitle: 'Learn the essentials',
    progress: 80,
    total: 5,
    units: [
      { id: 1, title: 'Greetings', locked: false },
      { id: 2, title: 'Simple Phrases', locked: false },
      { id: 3, title: 'Common Words', locked: false },
      { id: 4, title: 'Basic Questions', locked: false },
      { id: 5, title: 'Numbers', locked: true },
    ]
  },
  {
    id: 2,
    title: 'Travel',
    subtitle: 'Prepare for your journey',
    progress: 40,
    total: 5,
    units: [
      { id: 6, title: 'At the Airport', locked: false },
      { id: 7, title: 'Booking a Hotel', locked: false },
      { id: 8, title: 'Public Transportation', locked: true },
      { id: 9, title: 'Asking for Directions', locked: true },
      { id: 10, title: 'Ordering Food', locked: true },
    ]
  },
  {
    id: 3,
    title: 'Business',
    subtitle: 'Master professional language',
    progress: 0,
    total: 5,
    locked: true
  }
]

export default function LanguageLearningPage() {
  const [activeSection, setActiveSection] = useState<number | null>(null)
  const router = useRouter()

  const handleUnitClick = (unitId: number) => {
    router.push(`/practice/${unitId}`)
  }

  return (
    <div className="flex h-screen bg-blue-50">
      <main className="flex-1 overflow-y-auto p-6">
        <header className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2" />
            <span className="text-lg font-semibold">Back to Home</span>
          </Link>
        </header>

        <h1 className="text-3xl font-bold mb-6 text-blue-900">Learn French</h1>

        {mockSections.map((section) => (
          <Accordion
            key={section.id}
            type="single"
            collapsible
            className="mb-6"
          >
            <AccordionItem value={`section-${section.id}`} className="border-none">
              <AccordionTrigger className="bg-white rounded-t-lg shadow-sm hover:bg-blue-50">
                <div className="flex items-center justify-between w-full p-4">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-900">{section.title}</h2>
                    <p className="text-sm text-blue-600">{section.subtitle}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Progress value={section.progress} className="w-24" />
                    <span className="text-sm font-medium text-blue-700">
                      {section.progress}%
                    </span>
                    {section.locked && <Lock className="text-blue-300" />}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-white rounded-b-lg shadow-sm">
                <div className="p-4 space-y-4">
                  {section.units?.map((unit) => (
                    <Button
                      key={unit.id}
                      onClick={() => handleUnitClick(unit.id)}
                      className="w-full justify-between"
                      // variant={unit.locked ? 'outline' : 'default'}
                      disabled={unit.locked}
                    >
                      <span>{unit.title}</span>
                      {unit.locked ? <Lock className="ml-2" /> : <Zap className="ml-2" />}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </main>

      <aside className="w-80 bg-white p-6 border-l border-blue-100 overflow-y-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center text-blue-700">
                  <Trophy className="mr-2 text-yellow-500" />
                  XP
                </span>
                <Badge variant="secondary" className="font-bold">50</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-blue-700">
                  <Gem className="mr-2 text-blue-500" />
                  Gems
                </span>
                <Badge variant="secondary" className="font-bold">20</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-blue-700">
                  <Heart className="mr-2 text-red-500" />
                  Lives
                </span>
                <Badge variant="secondary" className="font-bold">4/5</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900">Daily Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={60} className="mb-2" />
            <p className="text-sm text-blue-600">3/5 lessons completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-yellow-100 p-3 mb-2">
                  <Star className="text-yellow-500" />
                </div>
                <span className="text-xs text-center text-blue-700">10 Day Streak</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-green-100 p-3 mb-2">
                  <Book className="text-green-500" />
                </div>
                <span className="text-xs text-center text-blue-700">100 Lessons</span>
              </div>
              <div className="flex flex-col items-center opacity-50">
                <div className="rounded-full bg-gray-100 p-3 mb-2">
                  <Trophy className="text-gray-400" />
                </div>
                <span className="text-xs text-center text-blue-700">Locked</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}