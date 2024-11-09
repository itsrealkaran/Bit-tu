
interface Lesson {
    id: string;
    title: string;
    order: number;
    status: "completed" | "in-progress" | "locked";
  }
  
  interface UnitProps {
    id: string;
    order: number;
    title: string;
    description: string;
    lessons: Lesson[];
    activeLesson: {
      id: string;
      unitId: string;
    };
    activeLessonPercentage: number;
  }
  
  export const Unit = ({
    id,
    order,
    title,
    description,
    lessons,
    activeLesson,
    activeLessonPercentage
  }: UnitProps) => {
    return (
      <div className="border rounded-xl p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 text-green-700">
            {order}
          </div>
          <div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`p-4 border rounded-lg flex items-center gap-4 ${
                lesson.status === "locked" ? "opacity-50" : ""
              }`}
            >
              <div className={`h-4 w-4 rounded-full ${
                lesson.status === "completed" ? "bg-green-500" :
                lesson.status === "in-progress" ? "bg-yellow-500" :
                "bg-gray-200"
              }`} />
              <div className="flex-1">
                <h4 className="font-semibold">{lesson.title}</h4>
                {activeLesson.id === lesson.id && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${activeLessonPercentage}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };