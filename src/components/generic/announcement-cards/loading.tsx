import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading: React.FC<{ textRows: number }> = ({ textRows = 2 }) => {
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({ length: 5 })?.map((_, idx) => (
        <Card
          key={idx}
          className={`p-4 border-t-[5px] border-t-[rgba(195,235,250,0.3)] hover:scale-95 transition-all flex flex-col gap-3`}
        >
          <div className='grid grid-cols-[1fr_70px] gap-4'>
            <Skeleton className='w-full h-5' />
            <Skeleton className='w-full h-5' />
          </div>
          <div className='flex flex-col gap-2'>
            {Array.from({ length: textRows }).map((_, idx) => {
              const widthPercentage = 100 - idx * 10;
              return (
                <Skeleton
                  key={idx}
                  className='h-3'
                  style={{
                    width: `${widthPercentage > 0 ? widthPercentage : 10}%`,
                  }}
                />
              );
            })}
          </div>
          <div className='flex justify-between gap-4'>
            <Skeleton className='w-[120px] h-4' />
            <Skeleton className='w-[120px] h-4' />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Loading;
