import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading: React.FC = () => {
  return (
    <div className='grid lg:grid-cols-[1fr_auto] gap-4'>
      {/* LEFT SIDE */}
      <div className='flex flex-col gap-4'>
        {/* USER CARDS */}
        <div className='grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4'>
          {Array.from({ length: 4 }, (_, idx) => (
            <Skeleton key={idx} className='w-full aspect-video max-h-[160px]' />
          ))}
        </div>

        {/* MIDDLE CHARTS */}
        <div className='grid 2xl:grid-cols-[320px_1fr] gap-4'>
          {Array.from({ length: 2 }, (_, idx) => (
            <Skeleton key={idx} className='w-full min-h-[360px]' />
          ))}
        </div>

        {/* FINANCE CHART */}
        <Skeleton className='w-full aspect-video max-h-[360px]' />
      </div>

      {/* RIGHT SIDE */}
      <div className='flex flex-col sm:flex-row md:flex-col gap-4 min-w-[270px] lg:max-w-[270px]'>
        {/* CALENDAR */}
        <Skeleton className='w-full aspect-video h-[300px]' />

        {/* ANNOUNCEMENTS */}
        <div className='flex flex-col gap-4'>
          {Array.from({ length: 4 }, (_, idx) => (
            <Skeleton key={idx} className='w-full h-[160px]' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
