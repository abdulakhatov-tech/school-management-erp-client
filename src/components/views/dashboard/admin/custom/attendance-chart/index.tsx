import React from "react";
import { useTranslation } from "react-i18next";

import { Chart } from "./customs";
import DropDown from "../dropdown";
import CardTitle from "../card-title";
import { Card } from "@/components/ui/card";
import useAttendanceChartFeatures from "./features";

const AttendanceChart: React.FC = () => {
  const { t } = useTranslation();
  const { resData, data } = useAttendanceChartFeatures();

  return (
    <Card className='relative p-4'>
      <CardTitle>{t('admin_dashboard.attendance')}</CardTitle>
      <DropDown url='/list/attendance' />

      {/* ---------------------- CHART ---------------------- */}
      {resData.length === 0 ? (
        <p>{t('admin_dashboard.no_data_available')}</p>
      ) : (
        <Chart data={data} />
      )}
    </Card>
  );
};

export default AttendanceChart;
