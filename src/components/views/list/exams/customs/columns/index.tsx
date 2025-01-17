import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import {
    ColumnHeader,
    CopyableText,
    RowSelection,
    RowExamActions,
    RowSelectionHeader,
} from "@/components/ui/data-table";
import { IExam } from "@/interfaces/exam";

const useColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<IExam>[] = [
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
      accessorKey: "lesson",
      header: ({ column }) => <ColumnHeader column={column} title='lesson' />,
      cell: ({ row }) =>
        row.original?.lesson ? row.original?.lesson?.name : "-",
    },
    {
      accessorKey: "startTime",
      header: ({ column }) => (
        <ColumnHeader column={column} title='startTime' />
      ),
      // cell: ({ row }) => {
      //   const createdAt = new Date(row.original?.startTime);
      //   return format(new Date(createdAt), "MMMM dd, yyyy");
      // },
    },
    {
      accessorKey: "endTime",
      header: ({ column }) => <ColumnHeader column={column} title='endTime' />,
      // cell: ({ row }) => {
      //   const createdAt = new Date(row.original?.endTime);
      //   return format(new Date(createdAt), "MMMM dd, yyyy");
      // },
    },
    {
      accessorKey: "actions",
      header: () => (
        <div className='text-right'>{t("data-table.columns.actions")}</div>
      ),
      cell: ({ row }) => <RowExamActions row={row} />,
    },
  ];

  return {
    columns,
  };
};

export default useColumns;
