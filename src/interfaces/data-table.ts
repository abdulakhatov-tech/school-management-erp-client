import { ColumnDef } from "@tanstack/react-table";

export interface DataTablePropsI<TData, TValue> {
  data: {
    data: TData[];
    meta: {
      total: number;
      skip: number;
      limit: number;
    };
  };
  columns: ColumnDef<TData, TValue>[];
  loading: boolean;
}
