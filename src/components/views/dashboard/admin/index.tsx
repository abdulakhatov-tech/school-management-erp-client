import React from "react";

import {
  Events,
  Calendar,
  UserCards,
  FinanceChart,
  Announcements,
  CountUserChart,
  AttendanceChart,
} from "./custom";
import Loading from "./loading";
import { useAnalyticsService } from "@/services/analytics";

const AdminDashboard: React.FC = () => {
  const { getAnalytics } = useAnalyticsService();

  const { isLoading } = getAnalytics;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className='grid lg:grid-cols-[1fr_auto] gap-4'>
      {/* LEFT SIDE */}
      <div className='flex flex-col gap-4'>
        {/* USER CARDS */}
        <UserCards />

        {/* MIDDLE CHARTS */}
        <div className='grid 2xl:grid-cols-[320px_1fr] gap-4'>
          {/* COUNT USER CHART */}
          <CountUserChart />

          {/* ATTENDANCE CHART */}
          <AttendanceChart />
        </div>

        {/* FINANCE CHART */}
        <FinanceChart />
      </div>
      {/* RIGHT SIDE */}
      <div className='flex flex-col sm:flex-row md:flex-col gap-4 lg:max-w-[280px]'>
        {/* CALENDAR */}
        <Calendar />

        {/* Events */}
        <Events />

        {/* ANNOUNCEMENTS */}
        <Announcements />
      </div>
    </div>
  );
};

export default AdminDashboard;
