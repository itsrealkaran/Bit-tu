interface UserProgressProps {
    activeCourse: {
      id: string;
      title: string;
      imageUrl: string;
    };
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
  }
  
  export const UserProgress = ({
    activeCourse,
    hearts,
    points,
    hasActiveSubscription
  }: UserProgressProps) => {
    return (
      <div className="border rounded-xl p-4 mb-4">
        <div className="flex items-center gap-4">
          <img
            src={activeCourse.imageUrl}
            alt={activeCourse.title}
            className="h-20 w-20"
          />
          <div>
            <h2 className="font-bold">{activeCourse.title}</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div>❤️ {hearts}</div>
              <div>🏆 {points} points</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  