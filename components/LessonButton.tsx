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
          ? "border-blue-100 bg-blue-50 text-blue-200"
          : status === "completed"
          ? "border-blue-500 bg-blue-500 text-white"
          : "border-blue-500 bg-white text-blue-500"
      }`}
      disabled={status === "locked"}
      onClick={() => setSelectedLesson(id)}
    >
      {id}
    </Button>
  )
}
