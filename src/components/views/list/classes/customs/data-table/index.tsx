import {
    Pagination,
    TableBody,
    SearchInput,
    TableHeader,
    ViewOptions,
    SelectedRowCount,
  } from "@/components/ui/data-table";
  import AddBtn from "../add-btn";
  import { StatusSelector } from "./customs";
  import useDataTableFeatures from "./features";
  import { Table } from "@/components/ui/table";
  import { Skeleton } from "@/components/ui/skeleton";
  import { DataTablePropsI } from "@/interfaces/data-table";
  import { PaginationLoading, TableLoading } from "./loading";
  
  function DataTable<TData, TValue>({
    data,
    columns,
    loading = false,
  }: DataTablePropsI<TData, TValue>) {
    const { table, canModify } = useDataTableFeatures<TData, TValue>({
      columns,
      data: data?.data || [],
    });
  
    return (
      <div className='min-w-[1200px]'>
        <div className='flex items-center justify-between py-4'>
          <SearchInput table={table} loading={loading} />
          <div className='flex items-center gap-2 md:gap-3'>
            <StatusSelector loading={loading} />
            {loading ? (
              <Skeleton className='w-20 h-8' />
            ) : (
              <ViewOptions table={table} />
            )}
            {canModify && <AddBtn loading={loading} />}
            
          </div>
        </div>
  
        <div className="rounded-md border min-h-[740px]">
          {loading ? (
            <TableLoading columns={columns.length} />
          ) : (
            <Table>
              <TableHeader table={table} />
              <TableBody table={table} columns={columns} />
            </Table>
          )}
        </div>
  
        {loading ? (
          <PaginationLoading />
        ) : (
          <div className='flex items-center justify-between'>
            <SelectedRowCount table={table} />
            <Pagination table={table} meta={data?.meta} />
          </div>
        )}
      </div>
    );
  }
  
  export default DataTable;
  