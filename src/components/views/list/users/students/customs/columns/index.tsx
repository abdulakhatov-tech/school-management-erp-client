import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  UserInfo,
  IsActive,
  RowUserActions,
  CopyableText,
  ColumnHeader,
  RowSelection,
  RowSelectionHeader,
} from "@/components/ui/data-table";
import { IStudent } from "@/interfaces/user";
import { ColumnDef } from "@tanstack/react-table";

export const useColumns = () => {
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
      accessorKey: "parent",
      header: ({ column }) => (
        <ColumnHeader column={column} title='parent' />
      ),
      cell: ({ row }) => {
        const parent = row.original?.parent;

        if (!parent) {
          return <span>-</span>;
        }

        return (
          <Link
            to={`/list/parants/${row.original?.parent?._id}`}
            className='hover:underline'
          >
            {row.original?.parent?.fullName}
          </Link>
        );
      },
    },
    {
      accessorKey: "gender",
      header: ({ column }) => (
        <ColumnHeader column={column} title='gender' />
      ),
      cell: ({ row }) => t(`data-table.${row.original.gender}`),
    },
    {
      accessorKey: "birthday",
      header: ({ column }) => (
        <ColumnHeader column={column} title='birthday' />
      ),
      cell: ({ row }) => {
        const birthday = row.original.birthday;

        return format(new Date(birthday), "MMMM dd, yyyy");
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <ColumnHeader column={column} title='address' />
      ),
      cell: ({ row }) => (
        <CopyableText row={row} accessorKey='address' />
      ),
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
