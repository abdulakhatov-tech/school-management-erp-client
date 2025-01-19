import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ColumnDef } from "@tanstack/react-table";

import {
  ColumnHeader,
  RowSelection,
  RowResultActions,
  RowSelectionHeader,
} from "@/components/ui/data-table";
import { IResult } from "@/interfaces/result";

const useColumns = () => {
  const { t } = useTranslation();

  const columns: ColumnDef<IResult>[] = [
    {
      id: "select",
      header: ({ table }) => <RowSelectionHeader table={table} />,
      cell: ({ row }) => <RowSelection row={row} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => <ColumnHeader column={column} title={"title"} />,
      cell: ({ row }) => {
        const isExam = Boolean(row.original?.exam);

        return isExam ? row.original.exam.name : row.original.assignment.name;
      },
    },
    {
      accessorKey: "student",
      header: ({ column }) => <ColumnHeader column={column} title='student' />,
      cell: ({ row }) => (
        <Link
          to={`/list/students/${row.original?.student?._id}`}
          className='hover:underline hover:text-blue-500'
        >
          {row.original?.student?.fullName}
        </Link>
      ),
    },
    {
      accessorKey: "score",
      header: ({ column }) => <ColumnHeader column={column} title={"score"} />,
      cell: ({ row }) => {
        const score = row.original?.score;
        return score !== undefined ? `${Math.round(score)}%` : "-";
      },
    },
    {
      accessorKey: "class",
      header: ({ column }) => <ColumnHeader column={column} title='class' />,
      cell: ({ row }) =>
        row.original?.class ? (
          <Link
            to={`/list/classes/${row.original?.class?._id}`}
            className='hover:underline hover:text-blue-500'
          >
            {row.original?.class?.name} {t("user_form.class")}
          </Link>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <ColumnHeader column={column} title='description' />
      ),

      cell: ({ row }) => {
        const description = row.original.description;

        // Split the description into words
        const words = description.split(" ");
        const wordLimit = 6;

        // Check if truncation is needed
        const truncated = words.length > wordLimit;
        const shortDescription = truncated
          ? words.slice(0, wordLimit).join(" ") + "..."
          : description;

        return (
          <span>
            {shortDescription}{" "}
            {truncated && (
              <Link
                to={`/list/results/${row.original._id}`} // Replace with your custom modal or expand logic
                className='text-blue-500 underline'
              >
                More
              </Link>
            )}
          </span>
        );
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
      cell: ({ row }) => <RowResultActions row={row} />,
    },
  ];

  return {
    columns,
  };
};

export default useColumns;
