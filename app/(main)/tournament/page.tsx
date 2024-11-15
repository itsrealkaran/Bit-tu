'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { TournamentDialogProps } from './TournamentDialog'

// Dynamic import of the Dialog component with ssr disabled
const TournamentDialog = dynamic<TournamentDialogProps>(
  () => import('./TournamentDialog'),
  { ssr: false }
)

const tournaments = [
  { id: 1, name: "Beginner's Bash", startDate: "2023-06-01", status: "ongoing", price: "20 Aura" },
  { id: 2, name: "Intermediate Challenge", startDate: "2023-06-15", status: "ongoing", price: "30 Aura" },
  { id: 3, name: "Advanced Arena", startDate: "2023-07-01", status: "upcoming", price: "50 Aura" },
  { id: 4, name: "Language Masters", startDate: "2023-07-15", status: "upcoming", price: "50 Aura" },
  { id: 5, name: "Quiz Champions", startDate: "2023-06-20", status: "ongoing", price: "50 Aura" },
] as const

interface Tournament {
  id: number;
  name: string;
  startDate: string;
  status: string;
  price: string;
}

interface TournamentCardProps {
  tournament: Tournament;
}

function TournamentCard({ tournament }: TournamentCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  const handleJoin = () => {
    if (tournament.status === "ongoing") {
      setIsModalOpen(true)
    } else {
      alert(`You've registered for ${tournament.name}. We'll notify you when it starts!`)
    }
  }

  const handleStartQuiz = (playerName: string) => {
    router.push(`/quiz/${tournament.id}?name=${encodeURIComponent(playerName)}`)
  }

  return (
    <Card className="bg-white border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-orange-50 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-orange-600">{tournament.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-orange-700">Starts: {tournament.startDate}</p>
        <p className="text-orange-700 capitalize">Status: <span className="font-semibold">{tournament.status}</span></p>
        <p className="text-orange-700">Price: {tournament.price}</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          onClick={handleJoin}
        >
          {tournament.status === "ongoing" ? "Join Now" : "Register"}
        </Button>
      </CardFooter>

      {isModalOpen && (
        <TournamentDialog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tournament={tournament}
          onStartQuiz={handleStartQuiz}
        />
      )}
    </Card>
  )
}

export default function Page() {
  const ongoingTournaments = tournaments.filter(t => t.status === "ongoing")
  const upcomingTournaments = tournaments.filter(t => t.status === "upcoming")

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center">Quiz Tournaments</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">Ongoing Tournaments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ongoingTournaments.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">Upcoming Tournaments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingTournaments.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </section>
    </div>
  )
}