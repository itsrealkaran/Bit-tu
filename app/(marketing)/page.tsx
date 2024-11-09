import { Coins, Trophy, Rocket, Users } from "lucide-react"
import Image from "next/image"

export default function MarketingPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center gap-14 p-4 lg:flex-row">
      <div className="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
        <Image src="/logo3.png" alt="EduLingo Hero" fill className="object-contain" />
      </div>

      <div className="flex flex-col items-center gap-y-8 lg:items-start">
        <h1 className="max-w-[600px] text-center text-3xl font-bold text-blue-600 lg:text-left lg:text-5xl">
          Revolutionize Your Language Learning with EduLingo
        </h1>

        <p className="max-w-[600px] text-center text-lg text-neutral-600 lg:text-left">
          Learn, practice, and master new languages while earning rewards. Stake to learn, compete in tournaments, and unlock your potential!
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-blue-500" />
            <span className="text-sm">Stake & Earn Rewards</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-blue-500" />
            <span className="text-sm">Compete in Tournaments</span>
          </div>
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-blue-500" />
            <span className="text-sm">Milestone-Based Progress</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Users className="h-5 w-5" />
          <span>Join 10,000+ language learners today!</span>
        </div>
      </div>
    </div>
  )
}