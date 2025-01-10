export interface IOption {
  value: string;
  label: string;
}

export interface PropsI {
  name: string;
  label: string;
  options: IOption[];
  loading?: boolean;
  placeholder?: string;
}
