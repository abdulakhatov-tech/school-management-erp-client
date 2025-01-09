import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import {
  UserInfo,
  IsActive,
  ColumnHeader,
  RowSelection,
  CopyableText,
  RowUserActions,
  RowSelectionHeader,
} from "@/components/ui/data-table";
import DataLinks from "../data-links";
import { ITeacher } from "@/interfaces/user";

export const useColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<ITeacher>[] = [
    {
      id: "select",
      header: ({ table }) => <RowSelectionHeader table={table} />,
      cell: ({ row }) => <RowSelection row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => <ColumnHeader column={column} title='fullName' />,
      cell: ({ row }) => <UserInfo row={row} accessorKey='fullName' />,
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => <ColumnHeader column={column} title='isActive' />,
      cell: ({ row }) => <IsActive row={row} />,
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <ColumnHeader column={column} title='phoneNumber' />
      ),
      cell: ({ row }) => <CopyableText row={row} accessorKey='phoneNumber' />,
    },
    {
      accessorKey: "subjects",
      header: ({ column }) => <ColumnHeader column={column} title='subjects' />,
      cell: ({ row }) => (
        <DataLinks row={row} accessorKey='subjects' navigate={false} />
      ),
    },
    {
      accessorKey: "groups",
      header: ({ column }) => <ColumnHeader column={column} title='groups' />,
      cell: ({ row }) => (
        <DataLinks row={row} accessorKey='groups' navigate={true} />
      ),
    },
    {
      accessorKey: "gender",
      header: ({ column }) => <ColumnHeader column={column} title='gender' />,
      cell: ({ row }) => t(`data-table.${row.original.gender}`),
    },
    {
      accessorKey: "birthday",
      header: ({ column }) => <ColumnHeader column={column} title='birthday' />,
      cell: ({ row }) => {
        const birthday = row.original.birthday;

        return format(new Date(birthday), "MMMM dd, yyyy");
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => <ColumnHeader column={column} title='address' />,
      cell: ({ row }) => <CopyableText row={row} accessorKey='address' />,
    },
    {
      accessorKey: "actions",
      header: () => (
        <div className='text-right'>{t("data-table.columns.actions")}</div>
      ),
      cell: ({ row }) => <RowUserActions row={row} />,
    },
  ];

  return {
    columns,
  };
};

export default useColumns;
