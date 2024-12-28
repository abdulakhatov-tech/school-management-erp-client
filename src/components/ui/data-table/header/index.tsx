import React from "react";
import { flexRender } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DataTableHeader: React.FC<{ table: any }> = ({ table }) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup: any) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default DataTableHeader;