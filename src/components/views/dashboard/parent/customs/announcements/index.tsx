import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DropDown from "../dropdown";
import CardTitle from "../card-title";
import { Card } from "@/components/ui/card";
import AnnouncementsFeatures from "./features";

const Announcements: React.FC = () => {
  const { t } = useTranslation();
  const { announcements } = AnnouncementsFeatures();

  return (
    <Card className='relative p-4'>
      <CardTitle className='mb-2'>
        {t("admin_dashboard.announcements")}
      </CardTitle>
      <DropDown url='/list/announcements' />

      <div className='flex flex-col gap-4'>
        {announcements?.length === 0 ? (
          <p>{t("admin_dashboard.no_data_available")}</p>
        ) : (
          announcements?.map(({ _id, name, description, bg }) => (
            <Card
              key={_id}
              className={`p-4 ${bg} hover:scale-95 transition-all`}
            >
              <h5 className='text-md font-semibold underline mb-2'>
                <Link to={`/list/announcements/${_id}`}>{name}</Link>
              </h5>
              <p className={`text-sm text-[#A1ADB4] line-clamp-1`}>
                {description}
              </p>
            </Card>
          ))
        )}
      </div>
    </Card>
  );
};

export default Announcements;
