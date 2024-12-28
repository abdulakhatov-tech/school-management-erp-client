import React from "react";
import { useTranslation } from "react-i18next";
import { flexRender } from "@tanstack/react-table";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const DataTableBody: React.FC<{ table: any; columns: any }> = ({
  table,
  columns,
}) => {
  const { t } = useTranslation()

  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row: any) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="h-[70px]">
            {row.getVisibleCells().map((cell: any) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className='h-24 text-center'>
            {t('data-table.no_results')}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default DataTableBody;