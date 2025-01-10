import {
  Edit,
  User,
  Phone,
  Trash2,
  RollerCoaster,
  MessageCircle,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import Loading from "./loading";
import { TUser } from "@/interfaces/user";
import { Announcements } from "./customs";
import { Card } from "@/components/ui/card";
import noUser from "@/assets/icons/no-user.svg";
import useParentProfileFeatures from "./features";
import Section from "@/components/layout/section";
import { useParentsService } from "@/services/users/parents";

const ParentProfileView: React.FC = () => {
  const { t } = useTranslation()
  const user = useAuthUser() as TUser;
  const { getParentById } = useParentsService();

  const { handleEditUser, handleDeleteUser } = useParentProfileFeatures();

  const { data: parentData, isLoading } = getParentById;

  return (
    <Section id='parent-profile-page'>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-1 gap-6 w-full'>
          {/* Profile Card */}
          <Card className='relative px-6 py-8 flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 md:gap-8 shadow-lg'>
            {/* Profile Photo */}
            <div className='center w-[150px] min-w-[150px] h-[150px] min-h-[150px] lg:w-[200px] lg:min-w-[200px] lg:h-[200px] lg:min-h-[200px] rounded-full overflow-hidden'>
              <img
                src={parentData?.profilePhoto || noUser}
                alt='Parent profile'
                loading='lazy'
                className='w-full h-full object-cover'
              />
            </div>

            {(user?.role === "admin" || user?.role === "super-admin") && (
              <div className='absolute right-5 top-5 active:scale-[0.97] flex items-center gap-3'>
                <Edit
                  onClick={handleEditUser}
                  className='w-6 hover:text-blue-500'
                />
                <Trash2
                  onClick={handleDeleteUser}
                  className='w-6 hover:text-[crimson]'
                />
              </div>
            )}

            {/* Profile Details */}
            <div className='flex-grow'>
              <h3 className='text-2xl font-bold text-center lg:text-left'>
                {parentData?.fullName || "No Name Available"}
              </h3>
              <p className='text-sm font-normal text-center lg:text-left mt-2 max-w-[90%] mx-auto lg:mx-0'>
                {parentData?.bio?.length
                  ? parentData?.bio
                  : t('parents_list_profile.bio')
                }
              </p>

              {/* Info List */}
              <ul className='mt-4 space-y-3 text-gray-600'>
                <li className='flex items-center gap-3'>
                  <RollerCoaster className='text-blue-500' />
                  <span className='uppercase'>
                    {t(`parents_list_profile.${parentData?.role}`) || "Parent"}
                  </span>
                </li>
                <li className='flex items-center gap-3'>
                  <MessageCircle className='text-blue-500' />
                  <span>@{parentData?.username || "No Username"}</span>
                </li>
                <li className='flex items-center gap-3'>
                  <Phone className='text-blue-500' />
                  <span>{parentData?.phoneNumber || "No Phone Number"}</span>
                </li>
                <li className='flex items-center gap-2'>
                  <User className='text-blue-500' />
                  {t('parents_list_profile.children')}:
                  {parentData?.children
                    ? parentData?.children?.map(
                        (
                          child: { _id: string; fullName: string },
                          index: number
                        ) => (
                          <div>
                            <Link
                              to={`/list/students/${child?._id}`}
                              className='hover:underline hover:text-blue-500'
                            >
                              {child?.fullName}
                            </Link>
                            {index !== parentData?.children?.length - 1 && ","}
                          </div>
                        )
                      )
                    : 0}
                </li>
              </ul>
            </div>
          </Card>

          {/* Announcements Section */}
          <Announcements />
        </div>
      )}
    </Section>
  );
};

export default ParentProfileView;
