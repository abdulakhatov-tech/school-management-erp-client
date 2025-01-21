import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import {
    ColumnHeader,
    RowSelection,
    RowEventActions,
    RowSelectionHeader,
} from "@/components/ui/data-table";
import { IEvent } from "@/interfaces/event";

const useColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<IEvent>[] = [
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
        <Link to={`/list/events/${row.original._id}`} className="hover:underline hover:text-blue-500">{row.original.name}</Link>
      ),
    },

    {
      accessorKey: "class",
      header: ({ column }) => <ColumnHeader column={column} title='class' />,
      cell: ({ row }) =>
        row.original?.class ? <Link to={`/list/classes/${row.original.class?._id}`} className="hover:underline hover:text-blue-500">{row.original?.class?.name} {t('data-table.columns.class')}</Link>  : t('data-table.general'),
    },
    {
      accessorKey: "createdBy",
      header: ({ column }) => <ColumnHeader column={column} title='createdBy' />,
      cell: ({ row }) =>
        row.original?.createdBy ? <Link to={`/list/admins/${row.original.createdBy?._id}`} className="hover:underline hover:text-blue-500">{row.original?.createdBy?.fullName}</Link> : "-",
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <ColumnHeader column={column} title='startDate' />
      ),
      cell: ({ row }) => {
        const createdAt = new Date(row.original?.startDate);
        return format(new Date(createdAt), "hh:mm:a, MMMM dd, yyyy");
      },
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <ColumnHeader column={column} title='dueDate' />
      ),
      cell: ({ row }) => {
        const createdAt = new Date(row.original?.endDate);
        return format(new Date(createdAt), "hh:mm:a, MMMM dd, yyyy");
      },
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
      cell: ({ row }) => <RowEventActions row={row} />,
    },
  ];

  return {
    columns,
  };
};

export default useColumns;
