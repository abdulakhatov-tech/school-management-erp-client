import {
  Calendar,
  Map,
  MessageCircle,
  PersonStanding,
  Phone,
  RollerCoaster,
} from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import Section from "@/components/layout/section";
import { Skeleton } from "@/components/ui/skeleton";
import singleClassIcon from "@/assets/images/singleClass.png";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import singleAttendanceIcon from "@/assets/images/singleAttendance.png";
// import singleLessonIcon from "@/assets/images/singleLesson.png";

const Loading: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Section id='admin-profile-page'>
      <div className='grid 2xl:grid-cols-[4fr_1fr] gap-4'>
        <div className='flex flex-col gap-4'>
          {/* User Info */}
          <Card className='relative h-fit px-6 py-8 flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 md:gap-8'>
            <Skeleton className='w-[150px] min-w-[150px] h-[150px] min-h-[150px] lg:w-[200px] lg:min-w-[200px] lg:h-[200px] lg:min-h-[200px] rounded-full' />

            <div className='flex-grow'>
              <Skeleton className='h-9 w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] mb-4' />
              <Skeleton className='h-4 w-full mb-2' />
              <Skeleton className='h-4 w-[90%] mb-2' />
              <Skeleton className='h-4 w-[80%]' />

              <ul className='mt-4 space-y-2'>
                <li className='flex items-center gap-3'>
                  <RollerCoaster className='text-blue-500' />
                  <Skeleton className='h-5 w-[250px]' />
                </li>
                <li className='flex items-center gap-3'>
                  <MessageCircle className='text-blue-500' />
                  <Skeleton className='h-5 w-[230px]' />
                </li>
                <li className='flex items-center gap-3'>
                  <Phone className='text-blue-500' />
                  <Skeleton className='h-5 w-[210px]' />
                </li>
                <li className='flex items-center gap-3'>
                  <PersonStanding className='text-blue-500' />
                  <Skeleton className='h-5 w-[100px]' />
                </li>
                <li className='flex items-center gap-3'>
                  <Calendar className='text-blue-500' />
                  <Skeleton className='h-5 w-[180px]' />
                </li>
                <li className='flex items-center gap-3'>
                  <Map className='text-blue-500' />
                  <Skeleton className='h-5 w-[240px]' />
                </li>
              </ul>
            </div>
          </Card>

          {/* Teacher's Schedule */}
          {/* <Schedule type='teacherId' id={"123"} /> */}
          <Card className='relative py-4 px-6 gap-4'>
            <CardTitle className='mb-2 text-lg'>Teacher's Schedule</CardTitle>
            <Skeleton className='w-full h-[350px] md:h-[410px]' />
          </Card>
        </div>
        <div className='flex flex-col gap-4'>
          {/* Info Cards */}
          <div className='grid md:grid-cols-3 2xl:grid-cols-1 gap-4'>
            <Card className='relative py-4 px-6 flex items-center gap-4'>
              <img
                src={singleAttendanceIcon}
                alt='attendance-icon'
                className='w-8'
              />
              <div className='flex flex-col'>
                <Skeleton className='w-[60px] h-8' />
                <CardDescription className='mt-2 text-base'>
                  {t("app_sidebar.attendance")}
                </CardDescription>
              </div>
            </Card>

            <Card className='relative py-4 px-6 flex items-center gap-4'>
              <img
                src={singleClassIcon}
                alt='attendance-icon'
                className='w-8'
              />
              <div className='flex flex-col'>
                <Skeleton className='w-[60px] h-8' />
                <CardDescription className='mt-2 text-base'>
                  {t("app_sidebar.groups")}
                </CardDescription>
              </div>
            </Card>
          </div>

          {/* Shortcuts */}
          <Card className='relative p-4'>
            <CardTitle className='mb-2 text-lg'>Shortcuts</CardTitle>
            <div className='flex gap-2 flex-wrap'>
              <Skeleton className='h-6 w-full' />
              <Skeleton className='h-6 w-full' />
            </div>
          </Card>

          {/* Performance Section */}
          {/* <Performance /> */}
          <Card className='relative p-4'>
            <CardTitle className='mb-2 text-lg'>Performance</CardTitle>
            <Skeleton className='h-[150px] w-full' />
          </Card>

          {/* Announcements Section */}
          {/* <Announcements /> */}
          <Card className='relative p-4'>
            <CardTitle className='mb-2 text-lg'>Announcements</CardTitle>
            <div className='flex  flex-col gap-2'>
              <Skeleton className='h-11 w-full' />
              <Skeleton className='h-11 w-full' />
              <Skeleton className='h-11 w-full' />
              <Skeleton className='h-11 w-full' />
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default Loading;
