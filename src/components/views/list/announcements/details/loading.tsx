import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useTranslation } from "react-i18next";

const Loading: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Skeleton className='w-[500px] h-8' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
        <div className='flex flex-col gap-2'>
          <p className='flex items-center'>
            <span className='font-medium text-gray-700 mr-2'>
              {t("data-table.columns.status")}:
            </span>{" "}
            <Skeleton className='w-[120px] h-6' />
          </p>
          <p className='flex items-center'>
            <span className='font-medium text-gray-700 mr-2'>
              {t("data-table.columns.class")}:
            </span>{" "}
            <Skeleton className='w-[130px] h-6' />
          </p>
          <p className='text-gray-700 flex items-center'>
            <span className='font-medium  mr-2'>
              {t("data-table.columns.createdBy")}:
            </span>{" "}
            <Skeleton className='w-[140px] h-6' />
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='flex items-center'>
            <span className='font-medium text-gray-700 mr-2'>
              {t("data-table.columns.date")}:
            </span>{" "}
            <Skeleton className='w-[160px] h-6' />
          </p>
          <p className='flex items-center'>
            <span className='font-medium text-gray-700 mr-2'>
              {t("data-table.columns.createdAt")}:
            </span>{" "}
            <Skeleton className='w-[200px] h-6' />
          </p>
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold text-gray-800 mb-2'>
          {t("data-table.columns.description")}
        </h2>
        
        <Skeleton className='w-full h-5 mb-2' />
        <Skeleton className='w-[90%] h-5 mb-2' />
        <Skeleton className='w-[80%] h-5' />
      </div>
    </div>
  );
};

export default Loading;
