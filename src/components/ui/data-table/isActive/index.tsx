import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

const IsActive: React.FC<{ row: any }> = ({ row }) => {
  const { t } = useTranslation();

  return (
    <div className='flex items-center gap-2'>
      <div
        className={classNames(
          "flex items-center justify-center rounded-full p-[2px]",
          {
            "border-[1px] border-[#198754]": row.original.isActive,
            "border-[1px] border-[#DC3545]": !row.original.isActive,
          }
        )}
      >
        <div
          className={classNames("block w-2 h-2 rounded-full", {
            "bg-[#198754]": row.original.isActive,
            "bg-[#DC3545]": !row.original.isActive,
          })}
        />
      </div>
      <span>
        {row.original.isActive
          ? t("data-table.active")
          : t("data-table.inactive")}
      </span>
    </div>
  );
};

export default IsActive;
