import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import {
  RowClassActions,
  ColumnHeader,
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
        <span>{row.original.name} {t('user_form.class')}</span>
      ),
    },
    {
      accessorKey: "capacity",
      header: ({ column }) => <ColumnHeader column={column} title='capacity' />,
      cell: ({ row }) => (
        <span>
          {row.original?.capacity}{" "}
          {row.original?.capacity > 1
            ? t("app_sidebar.students")
            : t("students_list_profile.student")}
        </span>
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
            {row.original?.room?.name} {t("class_form.room")}
          </Link>
        ) : (
          "-"
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

export default useColumns;
