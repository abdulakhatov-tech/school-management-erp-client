import React from "react";
import { useTranslation } from "react-i18next";
import { Copy, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { TUser } from "@/interfaces/user";
import { Button } from "@/components/ui/button";
import useDataTableRowActionsFeatures from "./features";

const DataTableGroupRowActions: React.FC<{ row: any }> = ({ row }) => {
  const { t } = useTranslation();
  const data = row.original as TUser;
  const {
    handleAction,
    isDropdownOpen,
    setIsDropdownOpen,
    handleDropdownToggle,
  } = useDataTableRowActionsFeatures();

  return (
    <div className='text-right'>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
            onClick={handleDropdownToggle}
          >
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>{t("data-table.actions.title")}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(data?._id);
              setIsDropdownOpen(false);
            }}
          >
            <Copy /> {t("data-table.actions.data_id")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Eye />
            {t("data-table.view")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction(data?._id, "edit")}>
            <Pencil />
            {t("data-table.actions.edit")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction(data?._id, "delete")}>
            <Trash2 />
            {t("data-table.actions.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DataTableGroupRowActions;
