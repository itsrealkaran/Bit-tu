"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface LessonButtonProps {
  id: number
  status: "locked" | "completed" | "current"
}

export const LessonButton = ({ id, status }: LessonButtonProps) => {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)

  return (
    <Button
      size="lg"
      className={`relative h-[64px] w-[64px] rounded-full border-4 ${
        status === "locked"
          ? "border-orange-100 bg-orange-50 text-orange-200"
          : status === "completed"
          ? "border-orange-500 bg-orange-500 text-white"
          : "border-orange-500 bg-white text-orange-500"
      }`}
      disabled={status === "locked"}
      onClick={() => setSelectedLesson(id)}
    >
      {id}
    </Button>
  )
}
