import React from "react";
import { useTranslation } from "react-i18next";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import singleAttendanceIcon from "@/assets/images/singleAttendance.png";
// import singleBranchIcon from "@/assets/images/singleBranch.png";
import singleLessonIcon from "@/assets/images/singleLesson.png";
import singleClassIcon from "@/assets/images/singleClass.png";

const InfoCards: React.FC = () => {
    const { t } = useTranslation();

  return (
    <div className='grid md:grid-cols-3 2xl:grid-cols-1 gap-4'>
      <Card className='relative py-4 px-6 flex items-center gap-4'>
        <img src={singleAttendanceIcon} alt='attendance-icon' className='w-8' />
        <div className='flex flex-col'>
          <CardTitle className='mb-2 text-2xl font-bold'>90%</CardTitle>
          <CardDescription className='mb-2 text-base'>
            {t("app_sidebar.attendance")}
          </CardDescription>
        </div>
      </Card>
      <Card className='relative py-4 px-6 flex items-center gap-4'>
        <img src={singleLessonIcon} alt='attendance-icon' className='w-10' />
        <div className='flex flex-col'>
          <CardTitle className='mb-2 text-2xl font-bold'>3</CardTitle>
          <CardDescription className='mb-2 text-base'>
            {t("app_sidebar.lessons")}
          </CardDescription>
        </div>
      </Card>
      <Card className='relative py-4 px-6 flex items-center gap-4'>
        <img src={singleClassIcon} alt='attendance-icon' className='w-9' />
        <div className='flex flex-col'>
          <CardTitle className='mb-2 text-2xl font-bold'>4</CardTitle>
          <CardDescription className='mb-2 text-base'>
            {t("app_sidebar.classes")}
          </CardDescription>
        </div>
      </Card>
    </div>
  );
};

export default InfoCards;
