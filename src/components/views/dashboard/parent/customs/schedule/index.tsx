import BigCalendar from "@/components/generic/big-calendar";
import { Card, CardTitle } from "@/components/ui/card";
import { adjustScheduleToCurrentWeek } from "@/helpers";

const mockData = [
  {
    id: 1,
    name: "Math Class",
    startTime: new Date("2024-12-25T09:00:00"),
    endTime: new Date("2024-12-25T10:30:00"),
    teacherId: "teacher-1",
    classId: 101,
  },
  {
    id: 2,
    name: "Science Class",
    startTime: new Date("2024-12-26T11:00:00"),
    endTime: new Date("2024-12-26T12:30:00"),
    teacherId: "teacher-2",
    classId: 102,
  },
  {
    id: 3,
    name: "History Class",
    startTime: new Date("2024-12-27T13:00:00"),
    endTime: new Date("2024-12-27T14:30:00"),
    teacherId: "teacher-1",
    classId: 101,
  },
];

const BigCalendarContainer = ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const dataRes = mockData.filter((lesson) =>
    type === "teacherId"
      ? lesson.teacherId === id
      : lesson.classId === Number(id)
  );

  const data = dataRes.map((lesson: any) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <Card className='relative pt-4 pb-14 px-6 gap-4'>
      <CardTitle className='mb-2 text-lg'>Schedule (Jack Smith)</CardTitle>

      <BigCalendar data={schedule} />
    </Card>
  );
};

export default BigCalendarContainer;
