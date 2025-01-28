import { useEventsService } from "@/services/events";

const events = [
  {
    _id: "1",
    name: "Book Fair",
    description: "Browse and purchase books at our annual school Book Fair.",
    startDate: "2025-01-15T08:30:00.000+00:00",
    endDate: "2025-01-15T08:30:00.000+00:00",
  },
  {
    _id: "2",
    name: "Sports day",
    description: "A full-filled day of athletic events and team competitions.",
    startDate: "2025-01-15T08:30:00.000+00:00",
    endDate: "2025-01-15T08:30:00.000+00:00",
  },
  {
    _id: "3",
    name: "Art Exhibition",
    description: "Display your artwork for the school community to admire.",
    startDate: "2025-01-15T08:30:00.000+00:00",
    endDate: "2025-01-15T08:30:00.000+00:00",
  },
];

const EventsFeatures = () => {

  return { events };
};

export default EventsFeatures;
