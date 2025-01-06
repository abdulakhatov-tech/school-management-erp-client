import React from "react";
import { Outlet, useOutlet } from "react-router-dom";

import AdminsPageViews from "@/components/views/list/users/admins";

const AdminsPage:React.FC = () => {
  const hasOutlet = useOutlet();

  if(hasOutlet) {
    return <Outlet />
  }


  return <AdminsPageViews />
};

export default AdminsPage;
