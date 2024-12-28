import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading: React.FC = () => {
  return (
    <div className='grid lg:grid-cols-[1fr_auto] gap-4'>
      {/* LEFT SIDE */}
      <div className='flex flex-col gap-4'>
        {Array.from({ length: 2 }, (_, idx) => (
          <Skeleton
            key={idx}
            className='w-full min-h-[400px] md:min-h-[900px]'
          />
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className='flex flex-col md:flex-col gap-4 min-w-[280px] lg:max-w-[280px]'>
        {/* ANNOUNCEMENTS */}
        <div className='flex flex-col gap-4'>
          {Array.from({ length: 5 }, (_, idx) => (
            <Skeleton key={idx} className='w-full h-[160px]' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
