import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import { IStudent } from "@/interfaces/user";
import {
  ColumnHeader,
  RowSelection,
  RowSelectionHeader,
} from "@/components/ui/data-table";

const useColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<IStudent>[] = [
    {
      id: "select",
      header: ({ table }) => <RowSelectionHeader table={table} />,
      cell: ({ row }) => <RowSelection row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "student",
      header: ({ column }) => <ColumnHeader column={column} title='student' />,
      cell: ({ row }) => (
        <Link
          to={`/list/students/${row.original?._id}`}
          className='hover:underline hover:text-blue-500'
        >
          {row.original?.fullName}
        </Link>
      ),
    },
    {
      accessorKey: "present",
      header: ({ column }) => <ColumnHeader column={column} title='present' />,
    },
    {
      accessorKey: "late",
      header: ({ column }) => <ColumnHeader column={column} title='late' />,
    },
  ];

  return {
    columns,
  };
};

export default useColumns;
