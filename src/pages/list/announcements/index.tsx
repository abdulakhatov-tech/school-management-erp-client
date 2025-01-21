import React from "react";
import { Outlet, useOutlet } from "react-router-dom";

import AnnouncementsPageView from "@/components/views/list/announcements";

const AnnouncementsPage:React.FC = () => {
  const hasOutlet = useOutlet();

  if(hasOutlet) {
    return <Outlet />
  }

  return <AnnouncementsPageView />
};

export default AnnouncementsPage;
