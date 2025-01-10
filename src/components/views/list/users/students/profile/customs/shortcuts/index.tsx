import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Shortcuts: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Card className="relative p-4">
      <CardTitle className="mb-2 text-lg">{t('students_list_profile.shortcuts')}</CardTitle>
      <div className="flex flex-col gap-2">
        <Link
          to="/list/groups"
          className="text-white hover:underline rounded-md text-sm font-semibold p-2 
          bg-[rgba(195,235,250,0.7)] dark:bg-[rgba(75,170,200,0.3)] 
          hover:bg-[rgba(195,235,250,0.9)] dark:hover:bg-[rgba(75,170,200,0.5)]"
        >
          {t('app_sidebar.classes')}
        </Link>

        <Link
          to="/list/assignments"
          className="text-white hover:underline rounded-md text-sm font-semibold p-2 
          bg-[rgba(127,199,155,0.7)] dark:bg-[rgba(75,150,100,0.3)] 
          hover:bg-[rgba(127,199,155,0.9)] dark:hover:bg-[rgba(75,150,100,0.5)]"
        >
       {t('app_sidebar.assignments')}
        </Link>
      </div>
    </Card>
  );
};

export default Shortcuts;
