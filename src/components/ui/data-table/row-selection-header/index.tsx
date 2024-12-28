import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const DataTableRowSelectionHeader: React.FC<{ table: any }> = ({ table }) => {
  return (
    <div className='flex items-center w-fit text-sm text-muted-foreground'>
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
      {/* <span>
        {table.getFilteredSelectedRowModel().rows.length}/
        {table.getFilteredRowModel().rows.length}
      </span> */}
    </div>
  );
};

export default DataTableRowSelectionHeader;