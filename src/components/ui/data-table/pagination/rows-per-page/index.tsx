import React, { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface PropsI {
  table: any;
  pageSize?: number;
  onChange?: (pageSize: number) => void;
}

const RowsPerPage: React.FC<PropsI> = ({ pageSize = 10, table, onChange }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const rowsPerPageOptions = [10, 20, 50, 100];

  // Get the limit from the URL or fallback to pageSize
  const limit = parseInt(searchParams.get("limit") || `${pageSize}`, 10);

  // Check if the limit is valid; if not, set it to the default pageSize
  const validLimit = rowsPerPageOptions.includes(limit) ? limit : pageSize;

  // Ensure the page size is valid before setting it
  useEffect(() => {
    // If the limit from the URL is invalid, update the search params with the valid one
    if (!rowsPerPageOptions.includes(limit)) {
      searchParams.set("limit", validLimit.toString());
      setSearchParams(searchParams);
    }

    // Set the page size on the table
    if (validLimit !== table.getState().pagination.pageSize) {
      table.setPageSize(validLimit);
      if (onChange) onChange(validLimit);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, pageSize]);


  const handlePageSizeChange = (option: number) => {
    // Only update if the option is valid
    if (rowsPerPageOptions.includes(option)) {
      table.setPageSize(option);
      searchParams.set("limit", option.toString());
      setSearchParams(searchParams);
      if (onChange) onChange(option);
    } else {
      console.error(`Invalid page size option: ${option}`);
    }
  };

  return (
    <div>
      <span className="mx-3">
        {t("data-table.rows_per_page")}: {table.getState().pagination.pageSize}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {table.getState().pagination.pageSize} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {rowsPerPageOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option}
              checked={table.getState().pagination.pageSize === option}
              onCheckedChange={() => handlePageSizeChange(option)}
            >
              {option}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RowsPerPage;