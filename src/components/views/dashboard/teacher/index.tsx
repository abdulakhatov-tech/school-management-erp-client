import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { ITeacher } from "@/interfaces/user";
import { ILesson } from "@/interfaces/lesson";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardTitle } from "@/components/ui/card";
import { adjustScheduleToCurrentWeek } from "@/helpers";
import BigCalendar from "@/components/generic/big-calendar";
import { useGetAllLessonsByTeacherId } from "@/services/lessons";

const TeacherDashboard: React.FC = () => {
  const user = useAuthUser() as ITeacher
  const { data: lessons, isLoading } = useGetAllLessonsByTeacherId(user?._id)

  const data = lessons?.map((lesson: ILesson) => ({
    title: lesson?.subject?.name,
    start: new Date(lesson.startTime),
    end: new Date(lesson.endTime),
  })) || [];

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <Card className='relative pt-4 pb-14 px-6 gap-4'>
      <CardTitle className='mb-2 text-lg'>Teacher's Schedule</CardTitle>

      {isLoading ? (
        <Skeleton className='w-full h-full' />
      ) : (
        <BigCalendar data={schedule} />
      )}
    </Card>
  );
};

export default TeacherDashboard;
