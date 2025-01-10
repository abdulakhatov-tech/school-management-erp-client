import React from "react";
import { Outlet, useOutlet } from "react-router-dom";
import ParentsPageView from "@/components/views/list/users/parents";

const ParentsPage: React.FC = () => {
  const hasOutlet = useOutlet();

  if (hasOutlet) {
    return <Outlet />;
  }

  return <ParentsPageView />;
};

export default ParentsPage;
