import {
  ColumnDef,
  SortingState,
  useReactTable,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useState } from "react";

import { TUser } from "@/interfaces/user";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

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
  const isTeacher = user?.role === "teacher";

  // Check if the pathname matches and role is allowed to view edit action
  const canModify =
    (location.pathname === "/list/lessons" && isSuperAdmin) ||
    (["/list/lessons"].includes(location.pathname) &&
      (isSuperAdmin || isAdmin || isTeacher));

  return {
    table,
    canModify,
  };
};

export default useDataTableFeatures;
