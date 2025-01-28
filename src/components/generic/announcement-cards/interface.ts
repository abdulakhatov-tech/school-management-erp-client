export interface PropsI {
  data: {
    _id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    class: {
      _id: string;
      name: string;
    };
    date: string;
  }[];
  textRows?: number;
  loading?: boolean;
}
