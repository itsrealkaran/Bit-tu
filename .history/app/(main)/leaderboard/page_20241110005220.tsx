
export default function LeaderboardPage() {
  return (
    <div className="h-full w-full">
      {/* top section for the unlock and side explanation   */}

      <div className="flex w-full h-[45%] ">
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
        <div className="w-[42%] h-full flex items-start justify-center bg-red-500 ">
        <div className="w-[82%] h-[65%] rounded-2xl border-[1px] border-black/20  "></div>
        </div>
      </div>


    </div>
  )
}