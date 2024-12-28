import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const DataTableRowSelection: React.FC<{ row: any }> = ({ row }) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label='Select row'
    />
  );
};

export default DataTableRowSelection;