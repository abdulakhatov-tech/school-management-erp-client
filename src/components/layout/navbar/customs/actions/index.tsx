import React from "react";
import { Locale, Theme } from "@/components/constants";

import { GrAnnounce } from "react-icons/gr";
import {
  IoChatbubbleEllipsesOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { UserInfo } from "./customs";
import { useNavigate } from "react-router-dom";

const NavActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center gap-3 mr-2'>
        <IoNotificationsOutline className='w-[26px] h-[26px]' onClick={() => navigate('/list/events')} />
        <IoChatbubbleEllipsesOutline className='w-[26px] h-[26px]' onClick={() => navigate('/list/messages')} />
        <GrAnnounce className='w-[26px] h-[26px]' onClick={() => navigate('/list/announcements')} />
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
