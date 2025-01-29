import {
  TAdminStatus,
  TParentStatus,
  TStudentStatus,
  TTeacherStatus,
} from "./status";
import { IClass } from "./class";
import { ILesson } from "./lesson";
import { ISubject } from "./subject";
import { IResult } from "./result";
import { IPayment } from "./payment";
import { IAttendance } from "./attendance";

export type TGender = "male" | "female";
export type TRole = "super-admin" | "admin" | "teacher" | "student" | "parent";

interface IUser {
  _id: string;
  fullName: string;
  phoneNumber: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  role: TRole;
  address: string;
  profilePhoto: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdmin extends IUser {
  status: TAdminStatus;
  gender: TGender;
  birthday: Date;
  bio: string;
}

export interface ITeacher extends IUser {
  status: TTeacherStatus;
  gender: TGender;
  birthday: Date;
  bio: string;
  subjects: Array<ISubject>;
  lessons: Array<ILesson>;
  primaryClass: IClass;
  assignedClasses: Array<ISubject>;
}

export interface IStudent extends IUser {
  status: TStudentStatus;
  gender: TGender;
  birthday: Date;
  bio: string;
  parent: IParent;
  class: IClass;
  attendances: Array<IAttendance>;
  results: Array<IResult>;
  payments: Array<IPayment>;
}

export interface IParent extends IUser {
  status: TParentStatus;
  children: Array<IStudent>;
}

export type TUser = IAdmin | ITeacher | IStudent | IParent;
