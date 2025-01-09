import React from "react";
import { Outlet, useOutlet } from "react-router-dom";
import TeachersPageView from "@/components/views/list/users/teachers";

const TeachersPage:React.FC = () => {
  const hasOutlet = useOutlet();

  if(hasOutlet) {
    return <Outlet />
  }

  return <TeachersPageView />;
};

export default TeachersPage;
