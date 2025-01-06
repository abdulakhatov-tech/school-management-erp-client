import {
  Map,
  Edit,
  Phone,
  Trash2,
  Calendar,
  RollerCoaster,
  MessageCircle,
  PersonStanding,
} from "lucide-react";
import React from "react";
import { format } from "date-fns";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { Card } from "@/components/ui/card";
import noUser from "@/assets/icons/no-user.svg";
import { IAdmin, TUser } from "@/interfaces/user";
import useAdminProfileFeatures from "../../features";

const Details: React.FC<{ adminData: IAdmin }> = ({ adminData }) => {
  const user = useAuthUser() as TUser;
  const { handleEditUser, handleDeleteUser } = useAdminProfileFeatures();

  return (
    <Card className='relative px-6 py-8 flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 md:gap-8 shadow-lg'>
      {/* Profile Photo */}
      <div className='center w-[150px] min-w-[150px] h-[150px] min-h-[150px] lg:w-[200px] lg:min-w-[200px] lg:h-[200px] lg:min-h-[200px] rounded-full overflow-hidden'>
        <img
          src={adminData?.profilePhoto || noUser}
          alt={adminData?.fullName || "Admin profile photo"}
          loading='lazy'
          className='w-full h-full object-cover'
        />
      </div>

      {user?.role === "super-admin" && (
        <div className='absolute right-5 top-5 active:scale-[0.97] flex items-center gap-3'>
          <Edit onClick={handleEditUser} className='w-6 hover:text-blue-500' />
          <Trash2
            onClick={handleDeleteUser}
            className='w-6 hover:text-[crimson]'
          />
        </div>
      )}

      {/* Profile Details */}
      <div className='flex-grow'>
        <h3 className='text-2xl font-bold text-center lg:text-left'>
          {adminData?.fullName || "No Name Available"}
        </h3>

        <p className='text-sm font-normal text-center lg:text-left mt-2 max-w-[90%] mx-auto lg:mx-0'>
          {adminData?.bio?.length
            ? adminData?.bio
            : "Efficient and resourceful administrator dedicated to overseeing operations, managing resources, and supporting teams to achieve organizational goals. Proficient in communication, decision-making, and problem-solving to ensure seamless functionality and growth."}
        </p>

        {/* Info List */}
        <ul className='mt-4 space-y-3 text-gray-600'>
          <li className='flex items-center gap-3'>
            <RollerCoaster className='text-blue-500' />
            <span className='uppercase'>{adminData?.role || "Admin"}</span>
          </li>
          <li className='flex items-center gap-3'>
            <MessageCircle className='text-blue-500' />
            <span>@{adminData?.username || "admin"}</span>
          </li>
          <li className='flex items-center gap-3'>
            <Phone className='text-blue-500' />
            <span>{adminData?.phoneNumber || "admin"}</span>
          </li>
          <li className='flex items-center gap-3'>
            <PersonStanding className='text-blue-500' />
            <span className='uppercase'>{adminData?.gender || "admin"}</span>
          </li>
          <li className='flex items-center gap-3'>
            <Calendar className='text-blue-500' />
            <span>
              {adminData?.birthday
                ? format(new Date(adminData?.birthday), "MMMM dd, yyyy")
                : "Not Provided"}
            </span>
          </li>
          <li className='flex items-center gap-3'>
            <Map className='text-blue-500' />
            <span>{adminData?.address || "Address Not Provided"}</span>
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default Details;
