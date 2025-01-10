import React from "react";
import { Outlet, useOutlet } from "react-router-dom";

import StudentsPageView from "@/components/views/list/users/students";

const StudentsPage: React.FC = () => {
  const hasOutlet = useOutlet();

  if (hasOutlet) {
    return <Outlet />;
  }

  return <StudentsPageView />;
};

export default StudentsPage;
