import { IClass } from "./class";
import { ILesson } from "./lesson";
import { IStudent } from "./user";

export interface IAttendance {
  _id: string;
  date: Date;
  present: boolean;
  late: boolean;
  minutesLate: number;
  student: IStudent;
  lesson: ILesson;
  class: IClass;
  createdAt: Date;
  updatedAt: Date;
}
