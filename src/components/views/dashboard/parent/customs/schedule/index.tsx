import BigCalendar from "@/components/generic/big-calendar";
import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { adjustScheduleToCurrentWeek } from "@/helpers";
import { ILesson } from "@/interfaces/lesson";
import { IStudent } from "@/interfaces/user";
import { useGetAllLessonsByClassId } from "@/services/lessons";

const BigCalendarContainer = ({ user }: { user: IStudent }) => {
  const { data, isLoading } = useGetAllLessonsByClassId(user?.class?._id);

  const lessonsData = data?.map((lesson: ILesson) => ({
    title: lesson.name,
    start: new Date(lesson.startTime),
    end: new Date(lesson.endTime),
  }));

  const schedule = adjustScheduleToCurrentWeek(lessonsData);

  return (
    <Card className='relative pt-4 pb-14 px-6 gap-4'>
      <CardTitle className='mb-2 text-lg'>
        Schedule ({user?.fullName})
      </CardTitle>

      {
        isLoading ? <Skeleton /> :<BigCalendar data={schedule} />
      }

      
    </Card>
  );
};

export default BigCalendarContainer;
