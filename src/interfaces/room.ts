

export interface IRoom {
  _id: string;
  name: string;
  capacity: number;
  lessons: Array<any>;
  createdAt: Date;
  updatedAt: Date;
}
