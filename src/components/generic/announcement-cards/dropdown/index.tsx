import React from "react";
import { useNavigate } from "react-router-dom";
import { Ellipsis, Eye, ShieldPlus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

interface PropsI {
  url?: string;
}

const DropDown: React.FC<PropsI> = ({ url }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='absolute top-3 right-4'>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className='flex items-center gap-2'>
          <ShieldPlus className='w-5' /> {t('admin_dashboard.crm')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate(url as string)}
          className='flex items-center gap-2'
        >
          <Eye className='min-w-5 min-h-5' /> {t('admin_dashboard.view')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
