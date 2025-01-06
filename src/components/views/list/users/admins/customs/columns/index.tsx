import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import {
  UserInfo,
  ActiveStatus,
  CopyableText,
  ColumnHeader,
  RowSelection,
  RowUserActions,
  RowSelectionHeader,
} from "@/components/ui/data-table";
import { IAdmin } from "@/interfaces/user";
import { ColumnDef } from "@tanstack/react-table";

export const useColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<IAdmin>[] = [
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
      cell: ({ row }) => <ActiveStatus row={row} />,
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <ColumnHeader column={column} title='role' />
      ),
      cell: ({ row }) => t(`app_sidebar.${row.original.role}`),
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <ColumnHeader column={column} title='phoneNumber' />
      ),
      cell: ({ row }) => <CopyableText row={row} accessorKey='phoneNumber' />,
    },
    {
      accessorKey: "gender",
      header: ({ column }) => <ColumnHeader column={column} title='gender' />,
      cell: ({ row }) => t(`data-table.${row.original.gender}`),
    },
    {
      accessorKey: "birthday",
      header: ({ column }) => <ColumnHeader column={column} title='birthday' />,
      cell: ({ row }) =>
        format(new Date(row.original.birthday), "MMMM dd, yyyy"),
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
