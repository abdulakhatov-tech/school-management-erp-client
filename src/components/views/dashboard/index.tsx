import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { Calendar } from "./customs";
import AdminDashboard from "./admin";
import ParentDashboard from "./parent";
import TeacherDashboard from "./teacher";
import StudentDashboard from "./student";
import { TUser } from "@/interfaces/user";
import { Section } from "@/components/layout";
import { useEventsService } from "@/services/events";
import EventCards from "@/components/generic/event-cards";
import { useAnnouncementsService } from "@/services/announcements";
import AnnouncementCards from "@/components/generic/announcement-cards";

const HomePageComponent: React.FC = () => {
  const user = useAuthUser<TUser>();
  const { getAllEvents } = useEventsService();
  const { getAllAnnouncements } = useAnnouncementsService();

  const { data: eventsData, isLoading: isEventsDataLoading } = getAllEvents;
  const { data: announcementsData, isLoading: isAnnouncementsDataLoading } =
    getAllAnnouncements;

  return (
    <Section id='dashboard'>
      <div className='grid lg:grid-cols-[1fr_auto] gap-4'>
        {(user?.role === "admin" ||
          user?.role === "super-admin") && <AdminDashboard />}
        {user?.role === "teacher" && <TeacherDashboard />}
        {user?.role === "student" && <StudentDashboard />}
        {user?.role === "parent" && <ParentDashboard />}

        {/* RIGHT SIDE */}
        <div className='flex flex-col sm:flex-row md:flex-col gap-4 lg:max-w-[340px]'>
          {/* CALENDAR */}
          <Calendar />

          {/* Events */}
          <EventCards data={eventsData?.data} loading={isEventsDataLoading} />

          {/* ANNOUNCEMENTS */}
          <AnnouncementCards
            data={announcementsData?.data}
            loading={isAnnouncementsDataLoading}
          />
        </div>
      </div>
    </Section>
  );
};

export default HomePageComponent;
