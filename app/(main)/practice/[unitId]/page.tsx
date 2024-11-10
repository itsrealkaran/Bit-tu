'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PracticePage() {
  const params = useParams()
  const { unitId } = params

  return (
    <div className="p-6">
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="mr-2" />
        <span className="text-lg font-semibold">Back to Lessons</span>
      </Link>
      <h1 className="text-3xl font-bold mb-4">Practice Unit {unitId}</h1>
      <p className="text-lg">Here you can add your practice exercises for Unit {unitId}.</p>
    </div>
  )
}