import { ILesson } from "./lesson";

export interface IExam {
  name: string;
  startTime: string;
  endTime: string;
  lesson: ILesson;
  results: any[];
}
