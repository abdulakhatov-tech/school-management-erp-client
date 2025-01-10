import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Map,
  MessageCircle,
  PersonStanding,
  Phone,
  RollerCoaster,
  User,
} from "lucide-react";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div>
      <Card className='relative px-6 py-8 flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 md:gap-8 shadow-lg'>
        {/* Profile Photo */}
        <div className='center w-[150px] min-w-[150px] h-[150px] min-h-[150px] lg:w-[200px] lg:min-w-[200px] lg:h-[200px] lg:min-h-[200px] rounded-full overflow-hidden'>
          <Skeleton className='w-full h-full object-cover' />
        </div>

        {/* Profile Details */}
        <div className='flex-grow'>
          <Skeleton className='h-6 w-[260px] sm:w-[300px] md:w-[400px] mb-4' />
          <Skeleton className='h-3 w-full mb-2' />
          <Skeleton className='h-3 w-[80%] mb-2' />
          <Skeleton className='h-3 w-[60%]' />

          {/* Info List */}
          <ul className='mt-4 space-y-3 text-gray-600'>
            <li className='flex items-center gap-3'>
              <RollerCoaster className='text-blue-500' />
              <Skeleton className='h-4 w-[100px]' />
            </li>
            <li className='flex items-center gap-3'>
              <MessageCircle className='text-blue-500' />
              <Skeleton className='h-4 w-[100px]' />
            </li>
            <li className='flex items-center gap-3'>
              <Phone className='text-blue-500' />
              <Skeleton className='h-4 w-[100px]' />
            </li>
            <li className='flex items-center gap-3'>
              <PersonStanding className='text-blue-500' />
              <Skeleton className='h-4 w-[100px]' />
            </li>
            <li className='flex items-center gap-3'>
              <User className='text-blue-500' />
              <Skeleton className='h-4 w-[100px]' />
            </li>
            <li className='flex items-center gap-3'>
              <Map className='text-blue-500' />
              <Skeleton className='h-4 w-[100px]' />
            </li>
          </ul>
        </div>
      </Card>
      <Card className='relative p-4 mt-4'>
        <Skeleton className='h-6 w-[260px] sm:w-[300px] md:w-[400px] mb-4' />

        <div className='flex flex-col gap-4'>
          {Array.from({ length: 10 })?.map((_: any, idx: number) => (
            <Skeleton key={idx} className='w-full h-[100px]' />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Loading;
