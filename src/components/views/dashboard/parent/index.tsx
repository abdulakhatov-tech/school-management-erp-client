import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import Loading from "./loading";
import { TUser } from "@/interfaces/user";
import { Announcements,  Events, Schedule } from "./customs";

const ParentDashboard:React.FC = () => {
  const user = useAuthUser() as TUser
  const loading = false;

  if(loading) {
    return <Loading />
  }

  return <div className='grid lg:grid-cols-[1fr_auto] gap-4'>
     {/* SCHEDULE */}
     <div className="flex flex-col gap-4">
     <Schedule type='teacherId' id={user?._id} />
     
     <Schedule type='teacherId' id={user?._id} />
     </div>

     <div className='flex flex-col sm:flex-row md:flex-col gap-4 lg:max-w-[280px]'>
        {/* Events */}
        <Events />

        {/* ANNOUNCEMENTS */}
        <Announcements />
      </div>
  </div>;
};

export default ParentDashboard;
