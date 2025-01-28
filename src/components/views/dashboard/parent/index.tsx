import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import Loading from "./loading";
import { IParent, IStudent } from "@/interfaces/user";
import { Announcements, Events, Schedule } from "./customs";

const ParentDashboard: React.FC = () => {
  const user = useAuthUser() as IParent;
  const loading = false;

  if (loading) {
    return <Loading />;
  }

  

  return (
    <div className='grid lg:grid-cols-[1fr_auto] gap-4'>
      {/* SCHEDULE */}
      <div className='grid gap-4'>
        {
          user?.children?.map((child: IStudent) => (
            <Schedule user={child} />
          ))
        }
      </div>

      <div className='flex flex-col sm:flex-row md:flex-col gap-4 lg:max-w-[320px]'>
        {/* Events */}
        <Events />

        {/* ANNOUNCEMENTS */}
        <Announcements />
      </div>
    </div>
  );
};

export default ParentDashboard;
