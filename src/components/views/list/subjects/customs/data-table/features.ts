import { useState } from "react";

import {
  SortingState,
  useReactTable,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { TUser } from "@/interfaces/user";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const useDataTableFeatures = <TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) => {
  const user = useAuthUser() as TUser;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const isSuperAdmin = user?.role === "super-admin";
  const isAdmin = user?.role === "admin";

  // Check if the pathname matches and role is allowed to view edit action
  const canModify =
    (location.pathname === "/list/subjects" && isSuperAdmin) ||
    (["/list/subjects"].includes(location.pathname) &&
      (isSuperAdmin || isAdmin));

  return {
    table,
    canModify,
  };
};

export default useDataTableFeatures;
