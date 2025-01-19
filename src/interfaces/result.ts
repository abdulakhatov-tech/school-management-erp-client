import { IExam } from "./exam";
import { IStudent } from "./user";
import { IAssignment } from "./assignment";
import { IClass } from "./class";

export interface IResult {
  _id: string;
  score: number;
  description: string;
  student: IStudent;
  exam: IExam;
  assignment: IAssignment;
  class: IClass;
  createdAt: string;
  updatedAt: string;
}
