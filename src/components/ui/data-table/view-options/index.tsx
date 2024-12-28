import React from "react";
import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

const DataTableViewOptions: React.FC<{ table: any }> = ({ table }) => {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' size='default'>
          <Settings2 /> {t('data-table.view')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' >
        <DropdownMenuLabel className="py-[6px] px-2">{t('data-table.toggle_columns')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column: any) => column.getCanHide())
          .map((column: any) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {t(`data-table.columns.${column.id}`)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableViewOptions;