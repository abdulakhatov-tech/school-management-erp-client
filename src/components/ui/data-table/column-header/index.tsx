import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp, ArrowUpDown, EyeOff } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PropsI {
  column: {
    getIsSorted: () => "asc" | "desc" | false;
    toggleSorting: (isAsc?: boolean) => void;
    toggleVisibility: (isVisible: boolean) => void;
  };
  title: string;
}

const DataTableColumnHeader: React.FC<PropsI> = ({ column, title }) => {
  const { t } = useTranslation();
  const isSorted = column.getIsSorted();

  const handleHideColumn = () => {
    column.toggleVisibility(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center w-fit">
          {t(`data-table.columns.${title}`)}
          {isSorted === "asc" && <ArrowUp className='ml-2 h-4 w-4' />}
          {isSorted === "desc" && (
            <ArrowUp className='ml-2 h-4 w-4 rotate-180' />
          )}
          {!isSorted && <ArrowUpDown className='ml-2 h-4 w-4' />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <ArrowUp className='mr-2 h-4 w-4' /> {t('data-table.sort_asc')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <ArrowUp className='mr-2 h-4 w-4 rotate-180' /> {t('data-table.sort_desc')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleHideColumn}>
          <EyeOff className='mr-2 h-4 w-4' /> {t('data-table.hide_column')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableColumnHeader;