import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DropDown from "../dropdown";
import CardTitle from "../card-title";
import EventsFeatures from "./features";
import { Card } from "@/components/ui/card";

const Events: React.FC = () => {
  const { t } = useTranslation();
  const { events } = EventsFeatures();

  return (
    <Card className='relative p-4'>
      <CardTitle className="mb-2">{t('admin_dashboard.events')}</CardTitle>
      <DropDown url='/list/events' />

      <div className='flex flex-col gap-4'>
        {events?.length === 0 ? (
          <p>{t('admin_dashboard.no_data_available')}</p>
        ) : (
          events?.map(({ _id, name, description, border_color }) => (
            <Card
              key={_id}
              className={`p-4 border-t-[5px] ${border_color} hover:scale-95 transition-all`}
            >
              <h5 className='text-md font-semibold underline mb-2'>
                <Link to={`/list/events/${_id}`}>{name}</Link>
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

export default Events;
