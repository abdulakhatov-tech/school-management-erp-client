import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import {
  ColumnHeader,
  CopyableText,
  RowSelection,
  RowLessonActions,
  RowSelectionHeader,
} from "@/components/ui/data-table";
import { ILesson } from "@/interfaces/lesson";

export const useColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<ILesson>[] = [
    {
      id: "select",
      header: ({ table }) => <RowSelectionHeader table={table} />,
      cell: ({ row }) => <RowSelection row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <ColumnHeader column={column} title='name' />
      ),
      cell: ({ row }) => <CopyableText row={row} accessorKey='name' className='text-base font-semibold' />,
    },
    {
      accessorKey: "teacher",
      header: ({ column }) => (
        <ColumnHeader column={column} title='teacher' />
      ),
      cell: ({ row }) => <Link to={`/list/teachers/${row.original?.teacher?._id}`} className="hover:underline hover:text-blue-500">{row.original?.teacher?.fullName}</Link>,
    },
    {
      accessorKey: "class",
      header: ({ column }) => (
        <ColumnHeader column={column} title='class' />
      ),
      cell: ({ row }) => row.original?.class ? <Link to={`/list/classes/${row.original?.class?._id}`} className="hover:underline hover:text-blue-500">{row.original?.class?.name} {t('user_form.class')}</Link> : '-',
    },
    {
      accessorKey: "subject",
      header: ({ column }) => (
        <ColumnHeader column={column} title='subject' />
      ),
      cell: ({ row }) => row.original?.subject ? row.original?.subject?.name : '-',
    },
    {
      accessorKey: "day",
      header: ({ column }) => (
        <ColumnHeader column={column} title='day' />
      ),
    },
    {
      accessorKey: "startTime",
      header: ({ column }) => (
        <ColumnHeader column={column} title='startTime' />
      ),
      cell: ({ row }) => {
        const createdAt = new Date(row.original?.startTime);
        return format(new Date(createdAt), "hh:mm:a, MMMM dd");
      },
    },
    {
      accessorKey: "endTime",
      header: ({ column }) => (
        <ColumnHeader column={column} title='endTime' />
      ),
      cell: ({ row }) => {
        const createdAt = new Date(row.original?.endTime);
        return format(new Date(createdAt), "hh:mm:a, MMMM dd");
      },
    },
    {
      accessorKey: "actions",
      header: () => (
        <div className='text-right'>{t("data-table.columns.actions")}</div>
      ),
      cell: ({ row }) => <RowLessonActions row={row} />,
    },
  ];

  return {
    columns,
  };
};

export default useColumns;
