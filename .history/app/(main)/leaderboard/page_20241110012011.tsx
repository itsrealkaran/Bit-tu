import RankingList from "./Component/RankingList";

export default function LeaderboardPage() {
  return (
    <div className="h-full w-full">
      {/* top section for the unlock and side explanation   */}

      <div className="flex w-full h-[45%]  ">
        {/* this is the right side  */}
        <div className="w-[58%] flex flex-col items-center h-full ">
          <div className="hover:rotate-[10deg] transition-all duration-500" >
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/660a07cd535396f03982f24bd0c3844a.svg" alt="not showing" />
          </div>

          <div >
              <h1 className="text-3xl leading-[3.5rem] font-bold text-center opacity-80">Unlock leader boards !</h1>
              <h2 className="text-xl opacity-50 font-semibold text-center">Complete 9 more lessons to start competing</h2>
          </div>

          <div className="w-[42%] ] transition-all  h-[15%] flex items-start pt-[1px] justify-center mt-5 bg-[#E5E5E5] rounded-xl">
            <div className="w-[98%] hover:mt-[1px] transition-all duration-100 h-[92%] bg-white rounded-xl flex items-center justify-center">
              <h1 className="text-[#1CB0F6] font-extrabold tracking-wide text-md uppercase">Start a Lesson</h1>
            </div>
          </div>
        </div>
        {/* this si the left side */}
        <div className="w-[42%] h-full flex items-start justify-center pl-5 ">
        <div className="w-[88%] relative h-[65%] rounded-2xl border-[2px] border-black/10 p-5">
          <h1 className=" font-extrabold opacity-40 text-sm tracking-tighter uppercase">what are leaderboards? </h1>

          <h2 className="text-lg font-extrabold w-[55%] leading-[1.7rem] mt-[6px]">Do lessons. Earn Xp. Compete.</h2>
          <p className="opacity-50 font-bold leading-[1.7rem] tracking-tight mt-2 text-md w-[68%]">Earn XP through lessons, then compete with players in a weekly leaderboard</p>
        <div className="absolute right-1 top-5">
          <img className=" scale-110" src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/071159d03311fcb556c4dfe730941de1.svg" alt="not showing" />
        </div>
        </div>
        </div>
      </div>
{/* this is the bottom part of the leader board  */}
      <div className="w-[58%] h-[55%] pt-10 flex-nowrap flex flex-col gap-5 overflow-y-auto">
   <RankingList name={"nikochan"} rank={1} image={"https://picsum.photos/200/300"}/>
   <RankingList name={"isagi yoichi"} rank={2}/>
   <RankingList name={"arima kousie"} rank={3}/>
   <RankingList name={"kuze kun"} rank={4}/>
   <RankingList name={"maou san"} rank={5}/>
   <RankingList name={"chitantsu sempai"} rank={6}/>
   <RankingList name={"hiromiya"} rank={7}/>
   <RankingList name={"nikochan"} rank={1}/>
   <RankingList name={"nikochan"} rank={1}/>
   <RankingList name={"nikochan"} rank={1}/>
   <RankingList name={"nikochan"} rank={1}/>
   <RankingList name={"nikochan"} rank={1}/>
   <RankingList name={"nikochan"} rank={1}/>
   <RankingList name={"nikochan"} rank={1}/>
   <RankingList name={"nikochan"} rank={1}/>
      </div>


    </div>
  )
}