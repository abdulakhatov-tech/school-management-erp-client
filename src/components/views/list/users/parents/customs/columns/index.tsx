import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import {
  UserInfo,
  IsActive,
  ColumnHeader,
  RowSelection,
  CopyableText,
  RowUserActions,
  RowSelectionHeader
} from "@/components/ui/data-table";
import { IParent } from "@/interfaces/user";
import  ChildrenLinks from "../children-links";

export const useColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<IParent>[] = [
    {
      id: "select",
      header: ({ table }) => <RowSelectionHeader table={table} />,
      cell: ({ row }) => <RowSelection row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <ColumnHeader column={column} title='fullName' />
      ),
      cell: ({ row }) => <UserInfo row={row} accessorKey='fullName' />,
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <ColumnHeader column={column} title='isActive' />
      ),
      cell: ({ row }) => <IsActive row={row} />,
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <ColumnHeader column={column} title='phoneNumber' />
      ),
      cell: ({ row }) => (
        <CopyableText row={row} accessorKey='phoneNumber' />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <ColumnHeader column={column} title='email' />
      ),
      cell: ({ row }) => {
        const email = row.original.email;

        return email ? <CopyableText row={row} accessorKey='email' /> : '-'
      },
    },
    {
      accessorKey: "children",
      header: ({ column }) => (
        <ColumnHeader column={column} title='students' />
      ),
      cell: ({ row }) => <ChildrenLinks row={row} />,
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
