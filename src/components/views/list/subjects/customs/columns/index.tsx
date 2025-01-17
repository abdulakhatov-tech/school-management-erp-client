import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import {
  SubjectInfo,
  ColumnHeader,
  RowSelection,
  RowSubjectActions,
  RowSelectionHeader,
} from "@/components/ui/data-table";

import DataLinks from "../data-links";
import { ISubject } from "@/interfaces/subject";
import { ColumnDef } from "@tanstack/react-table";

const useColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<ISubject>[] = [
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
      cell: ({ row }) => <SubjectInfo row={row} accessorKey='name' />,
    },
    {
      accessorKey: "teachers",
      header: ({ column }) => <ColumnHeader column={column} title='teachers' />,
      cell: ({ row }) => <DataLinks row={row} accessorKey='teachers' />,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <ColumnHeader column={column} title='description' />
      ),
      cell: ({ row }) => (
        <div className='max-w-[500px]'>{row.original.description}</div>
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
      cell: ({ row }) => <RowSubjectActions row={row} />,
    },
  ];

  return {
    columns,
  };
};

export default useColumns;
