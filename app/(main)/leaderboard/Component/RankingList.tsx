import React from 'react'

interface val { 
               name:string,
               rank:number
               image:string
}

const RankingList:React.FC<val> = ({name,rank , image}) => {
  return (
               <div className="w-full flex items-center justify-between px-5  flex-shrink-0">
               {/* the right side  */}
               <div className="flex items-center gap-5">
                 <div className="w-5 h-5 rounded-full bg-black/20"></div>
                 <div className="w-12 h-12 rounded-full overflow-hidden">
                   <img className="w-full h-full object-cover" src={image} alt="not showing" />
                 </div>
                 <h1 className="font-bold opacity-60">{name}</h1>
               </div>
     
               <div> 
                 <h1 className="text-[#2563EB] opacity-70 font-bold">Rank <span className="">{rank}</span></h1>
               </div>
     
     
             </div>
  )
}

export default RankingList