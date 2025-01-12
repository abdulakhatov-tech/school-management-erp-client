import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import {
  RowClassActions,
  ColumnHeader,
  CopyableText,
  RowSelection,
  RowSelectionHeader,
} from "@/components/ui/data-table";
import { IClass } from "@/interfaces/class";

export const useColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<IClass>[] = [
    {
      id: "select",
      header: ({ table }) => <RowSelectionHeader table={table} />,
      cell: ({ row }) => <RowSelection row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <ColumnHeader column={column} title='name' />,
      cell: ({ row }) => (
        <CopyableText
          row={row}
          accessorKey='name'
          className='text-base font-semibold'
        />
      ),
    },
    {
      accessorKey: "grade",
      header: ({ column }) => <ColumnHeader column={column} title='grade' />,
      cell: ({ row }) => (
        <span className='text-sm font-semibold'>{row.original?.grade ? t(`class_form.grades.${row.original?.grade}`) : '-' }</span>
      ),
    },
    {
      accessorKey: "teacher",
      header: ({ column }) => <ColumnHeader column={column} title='teacher' />,
      cell: ({ row }) => (
        <Link
          to={`/list/teachers/${row.original?.teacher?._id}`}
          className='hover:underline hover:text-blue-500'
        >
          {row.original?.teacher?.fullName}
        </Link>
      ),
    },
    {
      accessorKey: "room",
      header: ({ column }) => <ColumnHeader column={column} title='room' />,
      cell: ({ row }) =>
        row.original?.room ? (
          <Link
            to={`/list/rooms/${row.original?.room?._id}`}
            className='hover:underline hover:text-blue-500'
          >
            {row.original?.room?.name}
          </Link>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "capacity",
      header: ({ column }) => <ColumnHeader column={column} title='capacity' />,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <ColumnHeader column={column} title='createdAt' />
      ),
      cell: ({ row }) => {
        const createdAt = new Date(row.original?.createdAt);
        return format(new Date(createdAt), "MMMM dd, yyyy");
      },
    },
    {
      accessorKey: "actions",
      header: () => (
        <div className='text-right'>{t("data-table.columns.actions")}</div>
      ),
      cell: ({ row }) => <RowClassActions row={row} />,
    },
  ];

  return {
    columns,
  };
};

export default useColumns