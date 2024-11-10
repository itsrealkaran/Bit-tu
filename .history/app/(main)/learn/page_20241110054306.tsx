'use client'

import { ArrowLeft, Book, Lock, Star, Trophy } from "lucide-react"
import LockedSection from "./components/LockedSection"
import SingleSection from "./components/SingleSection"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Mock data to replace database
const mockSections = [
  {
    id: 1,
    title: "Section 1",
    subtitle: "Bonjour!",
    progress: 0,
    total: 10,
    units: [
      { id: 1, title: "Use basic phrases", locked: false },
      { id: 2, title: "Greetings", locked: true },
      { id: 3, title: "Basic conversation", locked: true },
    ]
  },
  {
    id: 2,
    title: "Section 2",
    subtitle: "Je commence en français",
    progress: 0,
    total: 22,
    locked: true
  },
  {
    id: 3,
    title: "Section 3",
    subtitle: "Je connais quelques mots",
    progress: 0,
    total: 20,
    locked: true
  }
]

const Page = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null)
  const [sectionOpen, setSectionOpen] = useState(true)
  const section = mockSections.find(s => s.id === activeSection)

  const toggleSection = () => {
    setSectionOpen(prev => !prev)
  }

  return (
    <div className='w-full h-full flex'>
      {sectionOpen ? (
        <div className='w-[62%] h-full'>
          <div className='w-full flex justify-center h-[13%]'>
            <div className='w-[90%] pt-2 relative border-b-[2px] border-black/20'>
              <div className="flex h-full opacity-50 mt-2 items-center gap-3">
                <ArrowLeft />
                <h1 className="text-xl font-extrabold">Back</h1>
              </div>
            </div>
          </div>
          <div className="w-full h-[87%] overflow-y-auto pb-3 pt-8 flex flex-col gap-3 items-center">
            <SingleSection func={toggleSection} BGcolor="#DDF4FF" number="1" para="I can participate in daily life in English." img="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/801070f230984a26ae39fff41cbb1dc6.svg"/>
            <LockedSection BGcolor="#F7F7F7" number="2" para="I can express myself appropriately depending on the context." img="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/7f2dfc9cc806971c2230c8f91b5b8bdd.svg"/>
            <LockedSection BGcolor="#F7F7F7" number="3" para="Further practice required for unlocking." img="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/3d544b217f0f66952b44b0caa5681fa2.svg"/>
          </div>
        </div>
      ) : (
   <>
          <div className="w-[62%] h-full  overflow-y-auto flex flex-col gap-2 ">
            <div className="w-full flex justify-center  h-[12%]">
              <div className="w-[97%] px-3 py-3 h-full text-white rounded-xl bg-[#58CC02]">
                <h1 className=" font-bold opacity-70">SECTION 1 , UNIT 1</h1>
                <h1 className="text-lg font-bold ">Discuss traveling solo</h1>
              </div>
            </div>
            <div className="flex-shrink-0 h-[80%] w-full "></div>
          </div>
   </>
      )}
      <div className='w-[38%] h-full'>
        <div className="flex justify-around pl-16 pt-2 items-center">
          <div className="flex gap-2 items-center">
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/ba95e6081679d9d7e8c132da5cfce1ec.svg" alt="not showing" />
            <h1 className="font-bold opacity-50 text-xl pt-1">1</h1>
          </div>
          <div className="flex gap-1 items-center">
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/gems/45c14e05be9c1af1d7d0b54c6eed7eee.svg" alt="not showing" />
            <h1 className="font-bold opacity-50 text-lg pt-1 text-[#1CB0F6] tracking-tighter">505</h1>
          </div>
          <div className="flex gap-1 items-center">
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/hearts/8fdba477c56a8eeb23f0f7e67fdec6d9.svg" alt="not showing" />
            <h1 className="font-bold opacity-50 text-lg pt-1 text-[#FF4B4B] tracking-tighter">5</h1>
          </div>
        </div>
        <div className="w-full flex flex-col items-center pl-5 gap-5 pt-[50px] h-full">
          <div className="w-full p-3 h-[30%] rounded-xl border-[2px] border-black/10">
            <div className="relative">
              <img className="" src="https://d35aaqx5ub95lt.cloudfront.net/images/super/2e50c3e8358914df5285dc8cf45d0b4c.svg" alt="not showing" />
              <div className="mt-5">
                <h1 className="text-lg font-extrabold">Try Super for free</h1>
                <h2 className="text-sm font-bold opacity-50 mt-1">No ads, personalized practice, and unlimited Legendary!</h2>
              </div>
              <div className="absolute top-[45%] -translate-y-1/2 right-5 w-[27%] h-full">
                <img className="w-full h-full object-contain" src="https://d35aaqx5ub95lt.cloudfront.net/images/super/fb7130289a205fadd2e196b9cc866555.svg" alt="not showing" />
              </div>
            </div>
            <div className="w-full h-[35%] flex justify-center items-center">
              <div className="w-[90%] text-sm font-extrabold uppercase tracking-wide rounded-xl h-[70%] bg-[#3C4DFF] text-white flex items-center justify-center">
                Try for Free
              </div>
            </div>
          </div>
          <div className="w-full h-[20%] rounded-xl border-[2px] border-black/10 py-3 px-5">
            <h1>Unlock Leaderboards!</h1>
            <div className="flex mt-5 gap-7">
              <img src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/d4280fdf64d66de7390fe84802432a53.svg" alt="not showing" />
              <p className="text-lg font-semibold opacity-60">Complete 9 more lessons to unlock</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
