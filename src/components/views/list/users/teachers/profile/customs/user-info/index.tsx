import {
  Edit,
  Map,
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
import { ITeacher, TUser } from "@/interfaces/user";
import useTeacherProfileFeatures from "../../features";
import { useTranslation } from "react-i18next";

const UserInfo: React.FC<{ data: ITeacher }> = ({ data }) => {
  const { t } = useTranslation();
  const user = useAuthUser() as TUser;
  const { handleDeleteUser, handleEditUser } = useTeacherProfileFeatures();

  return (
    <Card className='relative h-fit px-6 py-8 flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 md:gap-8'>
      {/* Profile Photo */}
      <div className='center w-[150px] min-w-[150px] h-[150px] min-h-[150px] lg:w-[200px] lg:min-w-[200px] lg:h-[200px] lg:min-h-[200px] rounded-full overflow-hidden'>
        <img
          src={data?.profilePhoto || "default-photo-url.jpg"}
          alt='Admin profile'
          loading='lazy'
          className='w-full h-full object-cover'
        />
      </div>

      {user?.role === "admin" || user?.role === 'super-admin' && (
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
          {data?.fullName || "No Name Available"}
        </h3>
        <p className='text-sm font-normal text-center lg:text-left mt-2 max-w-[90%] mx-auto lg:mx-0'>
          {data?.bio?.length
            ? data?.bio
            : t('teachers_list_profile.bio')}
        </p>

        {/* Info List */}
        <ul className='mt-4 space-y-3 text-gray-600'>
          <li className='flex items-center gap-3'>
            <RollerCoaster className='text-blue-500' />
            <span className='uppercase'>{data?.role ? t(`teachers_list_profile.${data?.role}`) : "Teacher"}</span>
          </li>
          <li className='flex items-center gap-3'>
            <MessageCircle className='text-blue-500' />
            <span>@{data?.username || "teacher"}</span>
          </li>
          <li className='flex items-center gap-3'>
            <Phone className='text-blue-500' />
            <span>{data?.phoneNumber || "admin"}</span>
          </li>
          <li className='flex items-center gap-3'>
            <PersonStanding className='text-blue-500' />
            <span className='uppercase'>{data?.gender ? t(`teachers_list_profile.${data?.gender}`) : "Other"}</span>
          </li>
          <li className='flex items-center gap-3'>
            <Calendar className='text-blue-500' />
            <span>
              {data?.birthday
                ? format(new Date(data?.birthday), "MMMM dd, yyyy")
                : "Not Provided"}
            </span>
          </li>
          <li className='flex items-center gap-3'>
            <Map className='text-blue-500' />
            <span>{data?.address || "Address Not Provided"}</span>
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default UserInfo;
