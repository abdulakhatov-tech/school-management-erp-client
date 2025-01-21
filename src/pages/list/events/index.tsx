import React from "react";
import { Outlet, useOutlet } from "react-router-dom";

import EventsPageView from "@/components/views/list/events";

const EventsPage:React.FC = () => {
  const hasOutlet = useOutlet();

  if(hasOutlet) {
    return <Outlet />
  }

  return <EventsPageView />
};

export default EventsPage;
