import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { TUser } from "@/interfaces/user";
import { ISidebarItem } from "@/interfaces/sidebar";

const ListItem: React.FC<ISidebarItem> = (item) => {
  const user = useAuthUser<TUser>() as TUser;

  if (!item.visible.includes(user.role)) {
    return;
  }

  return (
    <NavLink
      key={item._id}
      to={item.href}
      className={({ isActive }) =>
        classNames(
          "flex items-center lg:justify-start gap-2 w-full h-[34px] px-2 rounded-md hover:text-white hover:bg-primary hover:dark:bg-background hover:border hover:scale-[0.93] transition-all duration-100 ease-in-out hover:font-medium",
          {
            "bg-primary text-white dark:bg-background font-medium border": isActive,
            "text-gray-500": !isActive,
          }
        )
      }
    >
      <item.icon className='text-[20px]' />
      {item.label}
    </NavLink>
  );
};

export default ListItem;
