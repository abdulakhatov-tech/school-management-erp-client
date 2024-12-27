import React from "react";
import { Locale, Theme } from "@/components/constants";

import { GrAnnounce } from "react-icons/gr";
import {
  IoChatbubbleEllipsesOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { UserInfo } from "./customs";

const NavActions: React.FC = () => {
  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center gap-3 mr-2'>
        <IoNotificationsOutline className='w-[26px] h-[26px]' />
        <IoChatbubbleEllipsesOutline className='w-[26px] h-[26px]' />
        <GrAnnounce className='w-[26px] h-[26px]' />
      </div>
      <div className='hidden md:flex items-center gap-2'>
        <Locale />
        <Theme />
      </div>
      <UserInfo />
    </div>
  );
};

export default NavActions;
