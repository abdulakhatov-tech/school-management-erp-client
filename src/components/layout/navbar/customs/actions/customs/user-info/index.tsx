import React from "react";
import { useTranslation } from "react-i18next";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { FaUser } from "react-icons/fa6";
import { TUser } from "@/interfaces/user";
import noUser from "@/assets/icons/no-user.svg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserInfo: React.FC = () => {
  const { t } = useTranslation();
  const user = useAuthUser() as TUser;

  return (
    <div className='flex items-center gap-2'>
      <div className='flex flex-col min-w-[90px] items-end'>
        <h2 className='text-sm font-bold'>Jack Smith</h2>
        <p className='text-xs'>
          <span className='w-2 h-2 inline-block bg-[#198754] rounded-full mr-[1px]' />{" "}
          {t(`app_sidebar.${user?.role}`)}
        </p>
      </div>
      <Avatar>
        <AvatarImage src={user?.profilePhoto || noUser} onError={
          (e: any) => e.target.src = noUser 
        } />

        <AvatarFallback>
          <FaUser className='w-5 h-5' />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserInfo;
