'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// This would typically come from an API or database
const tournaments = [
  { id: 1, name: "Beginner's Bash", startDate: "2023-06-01", status: "ongoing" },
  { id: 2, name: "Intermediate Challenge", startDate: "2023-06-15", status: "ongoing" },
  { id: 3, name: "Advanced Arena", startDate: "2023-07-01", status: "upcoming" },
  { id: 4, name: "Language Masters", startDate: "2023-07-15", status: "upcoming" },
  { id: 5, name: "Quiz Champions", startDate: "2023-06-20", status: "ongoing" },
]

export default function TournamentsPage() {
  const ongoingTournaments = tournaments.filter(t => t.status === "ongoing")
  const upcomingTournaments = tournaments.filter(t => t.status === "upcoming")

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">Quiz Tournaments</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Ongoing Tournaments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ongoingTournaments.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Upcoming Tournaments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingTournaments.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </section>
    </div>
  )
}

interface Tournament {
  id: number;
  name: string;
  startDate: string;
  status: string;
}

function TournamentCard({ tournament }: { tournament: Tournament }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const router = useRouter()

  const handleJoin = () => {
    if (tournament.status === "ongoing") {
      setIsModalOpen(true)
    } else {
      // For upcoming tournaments, we'll just show an alert
      alert(`You've registered for ${tournament.name}. We'll notify you when it starts!`)
    }
  }

  const handleStartQuiz = () => {
    if (!playerName.trim()) {
      alert("Please enter your name")
      return
    }
    // Navigate to the quiz page with the tournament ID and player name
    router.push(`/quiz/${tournament.id}?name=${encodeURIComponent(playerName)}`)
  }

  return (
    <Card className="bg-white border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-blue-50 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-blue-600">{tournament.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-blue-700">Starts: {tournament.startDate}</p>
        <p className="text-blue-700 capitalize">Status: <span className="font-semibold">{tournament.status}</span></p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleJoin}
        >
          {tournament.status === "ongoing" ? "Join Now" : "Register"}
        </Button>
      </CardFooter>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-blue-600">Join Tournament: {tournament.name}</DialogTitle>
            <DialogDescription className="text-blue-700">
              Enter your name to join the tournament and start the quiz.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-blue-600">
                Name
              </Label>
              <Input
                id="name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="col-span-3 border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleStartQuiz} className="bg-blue-600 hover:bg-blue-700 text-white">Start Quiz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}