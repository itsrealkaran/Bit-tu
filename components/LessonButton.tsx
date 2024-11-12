"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface LessonButtonProps {
  id: number
  status: "locked" | "completed" | "current"
}

export const LessonButton = ({ id, status }: LessonButtonProps) => {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)

  // Function to get button styling based on status
  // const getButtonVariant = () => {
  //   switch (status) {
  //     case "locked":
  //       return "secondary"
  //     case "completed":
  //       return "default"
  //     case "current":
  //       return "primary"
  //     default:
  //       return "default"
  //   }
  // }

  return (
    <Button
      // variant={getButtonVariant()}
      disabled={status === "locked"}
      onClick={() => {
        setSelectedLesson(id)
        // You can add additional logic here like navigation or parent callback
      }}
      className={`w-12 h-12 ${
        selectedLesson === id ? "ring-2 ring-primary" : ""
      }`}
    >
      {id}
    </Button>
  )
}