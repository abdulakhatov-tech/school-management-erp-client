import React from "react";

import EventCards from "@/components/generic/event-cards";
import { useEventsService } from "@/services/events";
import { IEvent } from "@/interfaces/event";

const Events: React.FC = () => {
  // const { events } = EventsFeatures();

    const { getAllEvents } = useEventsService();
  
    const { data, isLoading } = getAllEvents;

    if(isLoading) {
      return <div>Loading...</div>;
    }

    const events = data?.data?.map((event: IEvent) => ({
      _id: event._id,
      name: event.name,
      description: event.description,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
    }))

    return <EventCards data={events} />;
};

export default Events;
