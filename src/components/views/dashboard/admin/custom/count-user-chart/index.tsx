import React from "react";
import { useTranslation } from "react-i18next";

import { Chart } from "./customs";
import DropDown from "../dropdown";
import CardTitle from "../card-title";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalyticsService } from "@/services/analytics";

const CountUserChart: React.FC<{ loading: boolean }> = ({ loading }) => {
  const { t } = useTranslation();
  const { getAnalytics } = useAnalyticsService();

  const { data } = getAnalytics;

  const boys = data?.maleStudents ?? 0;
  const girls = data?.femaleStudents ?? 0;

  return (
    <Card className='relative p-4 h-[400px]'>
      {/* ------------------- TITLE ------------------- */}
      <CardTitle>{t("admin_dashboard.students")}</CardTitle>
      <DropDown url='/list/students' />

      {loading ? (
        <Skeleton className='h-[328px] w-full mt-2' />
      ) : (
        <>
          {/* ------------------- CHART ------------------- */}
          <Chart boys={boys} girls={girls} />

          {/* ------------------- BOTTOM  ------------------- */}
          <div className='flex flex-wrap justify-center gap-8'>
            <div className='flex flex-col items-center gap-2'>
              <span className='bg-[#5AC8FA] block w-4 h-4 rounded-full' />
              <div className='flex items-center gap-2'>
                <h1 className='font-bold'>{boys}</h1>
                <h2 className='text-xs text-gray-300'>
                  {t("admin_dashboard.boys")} (
                  {Math.round((boys / (boys + girls)) * 100)}%)
                </h2>
              </div>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span className='bg-[#FFD54F] block w-4 h-4 rounded-full' />

              <div className='flex items-center gap-2'>
              <h1 className='font-bold'>{girls}</h1>
              <h2 className='text-xs text-gray-300'>
                {t("admin_dashboard.girls")} (
                {Math.round((girls / (boys + girls)) * 100)}%)
              </h2>
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default CountUserChart;
