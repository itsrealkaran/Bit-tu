// 'use client'

import { ArrowLeft, Book, Lock, Star, Trophy } from "lucide-react"
import LockedSection from "./components/LockedSection"
import SingleSection from "./components/SingleSection"
// import Link from "next/link"
// import { useState } from "react"

// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"

// // Mock data to replace database
// const mockSections = [
//   {
//     id: 1,
//     title: "Section 1",
//     subtitle: "Bonjour!",
//     progress: 0,
//     total: 10,
//     units: [
//       { id: 1, title: "Use basic phrases", locked: false },
//       { id: 2, title: "Greetings", locked: true },
//       { id: 3, title: "Basic conversation", locked: true },
//     ]
//   },
//   {
//     id: 2,
//     title: "Section 2",
//     subtitle: "Je commence en français",
//     progress: 0,
//     total: 22,
//     locked: true
//   },
//   {
//     id: 3,
//     title: "Section 3",
//     subtitle: "Je connais quelques mots",
//     progress: 0,
//     total: 20,
//     locked: true
//   }
// ]

// export default function Component() {
//   const [activeSection, setActiveSection] = useState<number | null>(null)
  
//   if (activeSection !== null) {
//     const section = mockSections.find(s => s.id === activeSection)
//     if (!section) return null

//     return (
//       <div className="min-h-screen bg-slate-900 text-white">
//         <div className="bg-blue-500 p-4 flex items-center justify-between">
//           <Button 
//             variant="ghost" 
//             className="text-white hover:text-white/80"
//             onClick={() => setActiveSection(null)}
//           >
//             <ArrowLeft className="h-5 w-5 mr-2" />
//             {section.title}
//           </Button>
//           <Button variant="secondary" className="bg-blue-400 hover:bg-blue-300">
//             <Book className="h-5 w-5 mr-2" />
//             Guidebook
//           </Button>
//         </div>
//         <div className="max-w-md mx-auto pt-10 px-4">
//           <div className="flex flex-col items-center gap-8">
//             {section.units?.map((unit, index) => (
//               <div key={unit.id} className="relative">
//                 {index === 0 && (
//                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-md">
//                     START
//                   </div>
//                 )}
//                 <Button
//                   variant={unit.locked ? "secondary" : "default"}
//                   className={`h-16 w-16 rounded-full ${
//                     unit.locked ? 'bg-slate-700' : 'bg-blue-500 hover:bg-blue-400'
//                   }`}
//                   disabled={unit.locked}
//                 >
//                   {unit.locked ? (
//                     <Lock className="h-6 w-6" />
//                   ) : index === section.units.length - 1 ? (
//                     <Trophy className="h-6 w-6" />
//                   ) : (
//                     <Star className="h-6 w-6" />
//                   )}
//                 </Button>
//                 {index < section.units.length - 1 && (
//                   <div className="absolute h-8 w-0.5 bg-slate-700 left-1/2 -translate-x-1/2 -bottom-8" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-slate-900 text-white p-4">
//       <Button 
//         variant="ghost" 
//         className="text-white hover:text-white/80 mb-6"
//         asChild
//       >
//         <Link href="/courses">
//           <ArrowLeft className="h-5 w-5 mr-2" />
//           Back
//         </Link>
//       </Button>
      
//       <div className="max-w-md mx-auto space-y-6">
//         {mockSections.map((section) => (
//           <div
//             key={section.id}
//             className="bg-slate-800 rounded-lg p-6 space-y-4"
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-blue-400 text-sm font-medium">
//                   A{section.id} • SEE DETAILS
//                 </div>
//                 <h2 className="text-xl font-bold">{section.title}</h2>
//               </div>
//               {section.locked && <Lock className="h-5 w-5 text-slate-500" />}
//             </div>
            
//             <div className="space-y-2">
//               <Progress 
//                 value={(section.progress / section.total) * 100} 
//                 className="bg-slate-700"
//               />
//               <div className="text-sm text-slate-400">
//                 {section.progress} / {section.total}
//               </div>
//             </div>

//             <div className="text-lg">{section.subtitle}</div>
            
//             <Button
//               className="w-full bg-blue-500 hover:bg-blue-400"
//               disabled={section.locked}
//               onClick={() => setActiveSection(section.id)}
//             >
//               {section.locked ? 'Locked' : 'Continue'}
//             </Button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }



const page = () => {
  return (
    <div className='w-full h-full flex  '>
      {/* this is the right side */}

      <div className='w-[62%] h-full '>
        {/* this is the going back button  */}
        <div className='w-full flex justify-center h-[13%] '>
              <div className='w-[90%] pt-2 relative border-b-[2px] border-black/20'>
                <div className="flex h-full opacity-50 mt-2 items-center gap-3">
                <ArrowLeft/>
                  <h1 className="text-xl font-extrabold  ">Back</h1>
                </div>
              </div>
        </div>

        {/* this is the section wala section lol */}

        <div className="w-full h-[87%] overflow-y-auto pb-3 pt-8 flex flex-col gap-3 items-center">
          {/* single section component  */}

         <SingleSection BGcolor="#DDF4FF" number="1" para="I can participate in daily life in English." img="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/801070f230984a26ae39fff41cbb1dc6.svg"/>
         <LockedSection BGcolor="#F7F7F7" number="2" para="I can express myself appropriately depending on the context." img="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/7f2dfc9cc806971c2230c8f91b5b8bdd.svg"/>
         <LockedSection BGcolor="#F7F7F7" number="2" para="I can express myself appropriately depending on the context." img="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/3d544b217f0f66952b44b0caa5681fa2.svg"/>
         <LockedSection BGcolor="#F7F7F7" number="2" para="I can express myself appropriately depending on the context." img="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/45a3c65a8dbd5f2eab7d98d7c732f449.svg"/>
         <LockedSection BGcolor="#F7F7F7" number="2" para="suck ma dick you'll peps in bangkok." img="https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/exampleSentences/50cda550d98bf95a129419ae4307e9d2.svg"/>
        </div>
      </div>

      {/* this is left side */}
      <div className='w-[38%] h-full '>
        
      </div>



    </div>
  )
}

export default page