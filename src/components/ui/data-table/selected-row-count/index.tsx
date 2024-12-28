import React from "react";
import { useTranslation } from "react-i18next";

const DataTableSelectedRowsCount: React.FC<{ table: any }> = ({ table }) => {
  const { t } = useTranslation()

  return (
    <span>
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} {t('data-table.selected_rows')}.
    </span>
  );
};

export default DataTableSelectedRowsCount;