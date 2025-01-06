import React from "react";

import {
  Sidebar,
  SidebarMenu,
  SidebarRail,
  SidebarGroup,
  SidebarContent,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import useSidebarMenu from "@/utils/sidebar";
import { SidebarHeaderComponent, ListItem } from "./customs";
import { ISidebarItem, ISidebarItems } from "@/interfaces/sidebar";

const AppSidebar: React.FC = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { items } = useSidebarMenu();

  return (
    <Sidebar {...props}>
      <SidebarHeaderComponent />
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {items.map((item: ISidebarItems) => (
          <SidebarGroup key={item._id}>
            <SidebarGroupLabel className="font-sans text-base font-normal text-gray-600">{item.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className='px-2'>
                {item.items.map((item: ISidebarItem) => (
                  <ListItem key={item._id} {...item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
