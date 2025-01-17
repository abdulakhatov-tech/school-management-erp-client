import { ILesson } from "./lesson";

export interface IAssignment {
  _id: string;
  name: string;
  startDate: string;
  dueDate: string;
  lesson: ILesson;
  results: any[];
  createdAt: string;
  updatedAt: string;
}
