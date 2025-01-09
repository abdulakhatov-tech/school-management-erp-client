import React from "react";

import {
  UserInfo,
  Schedule,
  InfoCards,
  Shortcuts,
  Performance,
  Announcements,
} from "./customs";
import Loading from "./loading";
import { Section } from "@/components/layout";
import { useTeacherService } from "@/services/users/teachers";

const TeacherProfileView: React.FC = () => {
  const { getTeacherById } = useTeacherService();

  const { data, isLoading } = getTeacherById;

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
          <Schedule id={'teacher-1'} />
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

export default TeacherProfileView;
