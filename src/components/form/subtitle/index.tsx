import React from "react";
import { Separator } from "@/components/ui/separator";

const FormSubtitle: React.FC<{ children: string }> = ({ children }) => {
  return (
    <div className='flex flex-col gap-1'>
      <h3 className='text-base font-sans font-medium'>{children}</h3>
      <Separator />
    </div>
  );
};

export default FormSubtitle;
