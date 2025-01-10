import React from "react";

import {
  Schedule,
  UserInfo,
  Shortcuts,
  InfoCards,
  Performance,
  Announcements,
} from "./customs";
import Loading from "./loading";
import Section from "@/components/layout/section";
import { useStudentService } from "@/services/users/students";

const StudentPageView: React.FC = () => {
  const { getStudentById } = useStudentService();

  const { data, isLoading } = getStudentById;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Section id='admin-profile-page'>
      <div className='grid 2xl:grid-cols-[4fr_1fr] gap-4'>
        <div className='flex flex-col gap-4'>
          {/* User Info */}
          <UserInfo data={data} />

          {/* Teacher's Schedule */}
          <Schedule />
        </div>
        <div className='flex flex-col gap-4'>
          {/* Info Cards */}
          <InfoCards />

          {/* Shortcuts */}
          <Shortcuts />

          {/* Performance Section */}
          <Performance />

          {/* Announcements Section */}
          <Announcements />
        </div>
      </div>
    </Section>
  );
};

export default StudentPageView;
