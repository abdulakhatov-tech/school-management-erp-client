import React from "react";
import { Outlet, useOutlet } from "react-router-dom";
import AttendancesPageView from "@/components/views/list/attendances";

const AttendancesPage:React.FC = () => {
  const hasOutlet = useOutlet();

  if(hasOutlet) {
    return <Outlet />
  }

  return <AttendancesPageView />;
};

export default AttendancesPage;
