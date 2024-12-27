import React from "react";

import { SearchForm } from "../search-form";
import Logo from "@/components/constants/logo";
import { SidebarHeader } from "@/components/ui/sidebar";

const SidebarHeaderComponent: React.FC = () => {
  return (
    <SidebarHeader>
      <div className='flex items-center gap-3'>
        <Logo size='small' />
        <h4 className='font-bold text-xl capitalize'>
          {/* {user?.role ? t(`role.${user?.role}`) : "CRM"} */}
          ERP
        </h4>
      </div>
      <SearchForm />
    </SidebarHeader>
  );
};

export default SidebarHeaderComponent;
