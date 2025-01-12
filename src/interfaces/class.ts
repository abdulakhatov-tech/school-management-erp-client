import { IRoom } from "./room";
import { ITeacher } from "./user";

export interface IClass {
  _id: string;
  name: string;
  capacity: number;
  teacher: ITeacher;
  lessons: any[];
  students: any[];
  room: IRoom;
  grade:
    | "1 Grade"
    | "2 Grade"
    | "3 Grade"
    | "4 Grade"
    | "5 Grade"
    | "6 Grade"
    | "7 Grade"
    | "8 Grade"
    | "9 Grade"
    | "10 Grade"
    | "11 Grade";
  createdAt: Date;
  updatedAt: Date;
}
