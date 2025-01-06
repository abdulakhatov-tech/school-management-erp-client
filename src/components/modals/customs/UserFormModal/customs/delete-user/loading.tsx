import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading: React.FC = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <Skeleton className='rounded-full w-[120px] md:w-[140px] h-[120px] md:h-[140px]' />
      <div className='flex flex-col items-center gap-2'>
        <Skeleton className='w-[160px] h-[24px]' />
        <Skeleton className='w-[100px] h-[20px]' />
      </div>
    </div>
  );
};

export default Loading;
