
export default function LeaderboardPage() {
  return (
    <div className="h-full w-full">
      {/* top section for the unlock and side explanation   */}

      <div className="flex w-full h-[45%] ">
        <div className="w-[58%] flex flex-col items-center h-full ">
          <div >
            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/660a07cd535396f03982f24bd0c3844a.svg" alt="not showing" />
          </div>

          <div >
              <h1 className="text-3xl leading-[3.5rem] font-bold text-center opacity-80">Unlock leader boards !</h1>
              <h2 className="text-xl opacity-50 font-semibold text-center">Complete 9 more lessons to start competing</h2>
          </div>

          <div className="w-[50%] h-10 bg-black"></div>
        </div>
        <div className="w-[42%] h-full "></div>
      </div>


    </div>
  )
}