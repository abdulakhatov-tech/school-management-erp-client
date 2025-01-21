import { IClass } from "./class";
import { IAdmin } from "./user";

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  class: IClass;
  createdBy: IAdmin;
  createdByModel: "admin" | "super-admin" | "teacher";
  status: "pending" | "approved" | "rejected" | "finished";
  createdAt: Date;
  updatedAt: Date;
}
