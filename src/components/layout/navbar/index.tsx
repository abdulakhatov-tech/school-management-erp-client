import React from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { NavActions, Navigation } from "./customs";

const Header: React.FC = () => {
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4'>
      <div className='flex items-center'>
        {/* Sidebar Toggler */}
        <SidebarTrigger className='-ml-1' />

        <Separator orientation='vertical' className='mr-2 h-4' />

        {/* Navigation */}
        <Navigation />
      </div>

      {/* Nav Actions */}
      <NavActions />
    </header>
  );
};

export default Header;
