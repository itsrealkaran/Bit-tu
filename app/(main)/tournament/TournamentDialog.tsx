'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Tournament {
  id: number;
  name: string;
  startDate: string;
  status: string;
  price: string;
}

export interface TournamentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tournament: Tournament;
  onStartQuiz: (playerName: string) => void;
}

export default function TournamentDialog({ isOpen, onClose, tournament, onStartQuiz }: TournamentDialogProps) {
  const [playerName, setPlayerName] = useState('')

  const handleStartQuiz = () => {
    if (!playerName.trim()) {
      alert("Please enter your name")
      return
    }
    onStartQuiz(playerName)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-orange-600">Join Tournament: {tournament.name}</DialogTitle>
          <DialogDescription className="text-orange-700">
            Enter your name to join the tournament and start the quiz.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-orange-600">
              Name
            </Label>
            <Input
              id="name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="col-span-3 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              placeholder="Enter your name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleStartQuiz} className="bg-orange-600 hover:bg-orange-700 text-white">
            Start Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}