export const Quests = ({ points }: { points: number }) => {
    return (
      <div className="border rounded-xl p-4">
        <h2 className="font-bold text-xl mb-2">Daily Quests</h2>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 w-4 rounded-full bg-green-500" />
          <p>Earn {points}/30 XP</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-green-500" />
          <p>Complete 2 lessons</p>
        </div>
      </div>
    );
  };