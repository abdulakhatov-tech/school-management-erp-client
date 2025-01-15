import { ILesson } from "./lesson";
import { ITeacher } from "./user";

export interface ISubject {
  _id: string;
  name: string;
  imgUrl: string;
  description: string;
  status: "active" | "inactive" | "pending";
  teachers: Array<ITeacher>;
  lessons: Array<ILesson>;
  createdAt: Date;
  updatedAt: Date;
}
