import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import Loading from "./loading";
import { TUser } from "@/interfaces/user";
import { Announcements, Calendar, Events, Schedule } from "./customs";

const StudentDashboard:React.FC = () => {
  const user = useAuthUser() as TUser
  const loading = false;

  if(loading) {
    return <Loading />
  }

  return <div className='grid lg:grid-cols-[1fr_auto] gap-4'>
     {/* SCHEDULE */}
     <Schedule type='teacherId' id={user?._id} />

     <div className='flex flex-col sm:flex-row md:flex-col gap-4 lg:max-w-[280px]'>
        {/* CALENDAR */}
        <Calendar />

        {/* Events */}
        <Events />

        {/* ANNOUNCEMENTS */}
        <Announcements />
      </div>
  </div>;
};

export default StudentDashboard;
