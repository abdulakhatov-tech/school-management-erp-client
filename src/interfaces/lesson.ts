export type TWeekDays =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY";

export interface ILesson {
  _id: string;
  name: string;
  day: TWeekDays;
  startTime: Date;
  endTime: Date;
  subject: {
    _id: string;
    name: string;
  };
  class: {
    _id: string;
    name: string;
  };
  teacher: {
    _id: string;
    fullName: string;
  };
  videos: string[];
  exams: any[];
  assignments: any[];
  attendances: any[];
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
