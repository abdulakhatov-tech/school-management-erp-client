import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import {
    ColumnHeader,
    CopyableText,
    RowSelection,
    RowSelectionHeader,
    RowAssignmentActions,
} from "@/components/ui/data-table";
import { IAssignment } from "@/interfaces/assignment";
import { format } from "date-fns";

const useColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<IAssignment>[] = [
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
      accessorKey: "startDate",
      header: ({ column }) => (
        <ColumnHeader column={column} title='startDate' />
      ),
      cell: ({ row }) => {
        const createdAt = new Date(row.original?.startDate);
        return format(new Date(createdAt), "MMMM dd, yyyy");
      },
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => <ColumnHeader column={column} title='dueDate' />,
      cell: ({ row }) => {
        const createdAt = new Date(row.original?.dueDate);
        return format(new Date(createdAt), "MMMM dd, yyyy");
      },
    },
    {
      accessorKey: "actions",
      header: () => (
        <div className='text-right'>{t("data-table.columns.actions")}</div>
      ),
      cell: ({ row }) => <RowAssignmentActions row={row} />,
    },
  ];

  return {
    columns,
  };
};

export default useColumns;
