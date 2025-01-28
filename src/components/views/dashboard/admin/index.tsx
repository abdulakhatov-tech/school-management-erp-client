import React from "react";

import {
  UserCards,
  FinanceChart,
  CountUserChart,
  AttendanceChart,
} from "./custom";
import { useAnalyticsService } from "@/services/analytics";

const AdminDashboard: React.FC = () => {
  const { getAnalytics } = useAnalyticsService();

  const { isLoading } = getAnalytics;

  return (
    <div className='flex flex-col gap-4'>
      {/* USER CARDS */}
      <UserCards loading={isLoading} />

      {/* MIDDLE CHARTS */}
      <div className='grid 2xl:grid-cols-[320px_1fr] gap-4'>
        {/* COUNT USER CHART */}
        <CountUserChart loading={isLoading} />

        {/* ATTENDANCE CHART */}
        <AttendanceChart loading={isLoading} />
      </div>

      {/* FINANCE CHART */}
      <FinanceChart loading={isLoading} />
    </div>
  );
};

export default AdminDashboard;
