import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PropsI {
  children: React.ReactNode;
  title: string;
}

const CustomTooltip: React.FC<PropsI> = ({ children, title }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="center">{children}</TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
