import React from "react";
import { useTranslation } from "react-i18next";

import { Chart } from "./customs";
import DropDown from "../dropdown";
import CardTitle from "../card-title";
import { Card } from "@/components/ui/card";
import { useAnalyticsService } from "@/services/analytics";

const CountUserChart: React.FC = () => {
  const { t } = useTranslation();
  const { getAnalytics } = useAnalyticsService();
  
    const { data } = getAnalytics;

  const boys = data?.maleStudents ?? 0;
  const girls = data?.femaleStudents ?? 0;

  return (
    <Card className='relative p-4'>
      {/* ------------------- TITLE ------------------- */}
      <CardTitle>{t('admin_dashboard.students')}</CardTitle>      
      <DropDown url='/list/students' />

      {/* ------------------- CHART ------------------- */}
      <Chart boys={boys} girls={girls} />

      {/* ------------------- BOTTOM  ------------------- */}
      <div className='flex justify-center gap-16'>
        <div className='flex flex-col gap-1'>
          <span className='bg-[#8884D8] block w-4 h-4 rounded-full' />
          <h1 className='font-bold'>{boys}</h1>
          <h2 className="text-xs text-gray-300">
          {t('admin_dashboard.boys')} ({Math.round((boys / (boys + girls)) * 100)}%)
					</h2>
        </div>
        <div className="flex flex-col gap-1">
          <span className='bg-[#FAE27C] block w-4 h-4 rounded-full' />
					<h1 className="font-bold">{girls}</h1>
					<h2 className="text-xs text-gray-300">
          {t('admin_dashboard.girls')} ({Math.round((girls / (boys + girls)) * 100)}%)
					</h2>
				</div>
      </div>
    </Card>
  );
};

export default CountUserChart;
