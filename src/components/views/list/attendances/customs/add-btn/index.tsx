import React from "react";
import { Link } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import { useTranslation } from "react-i18next";

import { CustomTooltip } from "@/tools";
import { IClass } from "@/interfaces/class";
import { Skeleton } from "@/components/ui/skeleton";
import { useClassService } from "@/services/classes";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AddBtn: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const { t } = useTranslation();
  const { getAllClasssUnpaginated } = useClassService();

  const { data, isLoading } = getAllClasssUnpaginated;

  if (loading) {
    return <Skeleton className='w-9 h-9 rounded-full' />;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <CustomTooltip title={t("attendance_form.add-attendance")}>
          <button disabled={loading}>
            <CirclePlus className='w-7 md:w-8 h-7 md:h-8 active:scale-95 cursor-pointer' />
          </button>
        </CustomTooltip>
      </PopoverTrigger>
      <PopoverContent className='max-h-[240px] overflow-y-auto w-[160px]'>
        <ul className='flex flex-col gap-2'>
          {isLoading
            ? Array.from({ length: 10 }).map((_, idx: number) => (
                <Skeleton key={idx} className='w-full h-5' />
              ))
            : data?.map((item: IClass) => {
                return (
                  <li
                    key={item._id}
                    className='hover:text-blue-500 hover:underline'
                  >
                    <Link to={`/list/attendances/`}>
                      {item.name} {t("data-table.columns.class")}
                    </Link>
                  </li>
                );
              })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default AddBtn;
