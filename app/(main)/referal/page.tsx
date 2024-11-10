'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Gift, Trophy, Sparkles } from 'lucide-react'

export default function ReferralPage() {
  const [referralCode, setReferralCode] = useState('')
  const [copiedMessage, setCopiedMessage] = useState('')

  useEffect(() => {
    // In a real app, this would come from an API or user session
    setReferralCode('QUIZMASTER2023')
  }, [])

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopiedMessage('Copied!')
    setTimeout(() => setCopiedMessage(''), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">Invite Friends, Earn Rewards!</h1>
      
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8 border-blue-200 shadow-lg">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <Users className="text-blue-500" />
              Your Referral Code
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Input 
                value={referralCode} 
                readOnly 
                className="text-lg font-semibold text-blue-600 border-blue-300"
              />
              <Button 
                onClick={copyReferralCode}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Copy
              </Button>
            </div>
            {copiedMessage && (
              <p className="text-green-600 mt-2">{copiedMessage}</p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                <Gift className="text-blue-500" />
                Invite Friends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">Share your code and invite friends to join the quiz platform.</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                <Trophy className="text-blue-500" />
                Earn Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">Get 500 points for each friend who joins using your code.</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                <Sparkles className="text-blue-500" />
                Unlock Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">Use your points to unlock exclusive quizzes and badges.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-200 shadow-lg">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-2xl font-bold text-blue-600">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>Share your unique referral code with friends</li>
              <li>Friends sign up using your code</li>
              <li>You earn 500 points for each successful referral</li>
              <li>Use your points to unlock special content and features</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}