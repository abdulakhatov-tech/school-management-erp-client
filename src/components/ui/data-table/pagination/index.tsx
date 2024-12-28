import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import RowsPerPage from "./rows-per-page";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps {
  table: any;
  meta: {
    total: number;
    skip: number;
    limit: number;
  };
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  table,
  meta,
}) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

// Destructure meta
const { total, skip, limit: pageSize } = meta;

// Calculate derived values
const totalPages = Math.ceil(total / pageSize);
const currentPage = Math.floor(skip / pageSize) + 1;

// Retrieve URL parameters
const urlLimit = parseInt(searchParams.get("limit") || `${pageSize}`, 10);
const urlPage = parseInt(searchParams.get("page") || "1", 10) - 1;

// Synchronize URL params with table state
useEffect(() => {
  if (urlLimit !== pageSize) {
    table.setPageSize(urlLimit);
  }

  if (urlPage !== currentPage - 1 && urlPage >= 0 && urlPage < totalPages) {
    table.setPageIndex(urlPage);
  }
}, [urlLimit, urlPage, pageSize, currentPage, totalPages, table]);

// Handle page change
const handlePageChange = (newPageIndex: number) => {
  searchParams.set("page", (newPageIndex + 1).toString());
  if (!searchParams.get("limit")) {
    searchParams.set("limit", String(pageSize));
  }
  setSearchParams(searchParams);
  table.setPageIndex(newPageIndex);
};

return (
    <div className="flex items-center justify-between space-x-4 py-4">
      {/* Rows per page dropdown */}
      <RowsPerPage pageSize={pageSize} table={table} />

      <div className="flex items-center">
        <span className="mx-3">
          {t("data-table.page")} {currentPage} / {totalPages} ({total}{" "}
          {t("data-table.items")})
        </span>

        {/* First Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft />
        </Button>

        {/* Previous Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 2)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </Button>

        {/* Next Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </Button>

        {/* Last Page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
};

export default DataTablePagination;
