import React from "react";
import { useTranslation } from "react-i18next";

import { Chart } from "./customs";
import DropDown from "../dropdown";
import CardTitle from "../card-title";
import { Card } from "@/components/ui/card";
import useAttendanceChartFeatures from "./features";
import { Skeleton } from "@/components/ui/skeleton";

const AttendanceChart: React.FC<{ loading: boolean }> = ({loading}) => {
  const { t } = useTranslation();
  const { resData, data } = useAttendanceChartFeatures();

  return (
    <Card className='relative p-4 h-[400px]'>
      <CardTitle>{t("admin_dashboard.attendance")}</CardTitle>
      <DropDown url='/list/attendance' />

      {/* ---------------------- CHART ---------------------- */}
      {loading ? (
        <Skeleton className='h-[328px] w-full mt-2' />
      ) : resData.length === 0 ? (
        <p>{t("admin_dashboard.no_data_available")}</p>
      ) : (
        <Chart data={data} />
      )}
    </Card>
  );
};

export default AttendanceChart;
