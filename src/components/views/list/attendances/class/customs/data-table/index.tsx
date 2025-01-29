import { TableBody, TableHeader } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

import { TableLoading } from "./loading";
import useDataTableFeatures from "./features";
import { Table } from "@/components/ui/table";

interface DataTablePropsI<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  loading: boolean;
}

function DataTable<TData, TValue>({
  data,
  columns,
  loading = false,
}: DataTablePropsI<TData, TValue>) {
  const { table } = useDataTableFeatures<TData, TValue>({
    columns,
    data: data || [],
  });

  return (
    <div className='min-w-[1200px]'>
      <div className='rounded-md border min-h-[740px]'>
        {loading ? (
          <TableLoading columns={columns.length} />
        ) : (
          <Table>
            <TableHeader table={table} />
            <TableBody table={table} columns={columns} />
          </Table>
        )}
      </div>
    </div>
  );
}

export default DataTable;
