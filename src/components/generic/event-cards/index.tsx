import React from "react";
import { formatDate } from "date-fns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Card, CardTitle } from "@/components/ui/card";
import { PropsI } from "./interface";
import DropDown from "./dropdown";
import Loading from "./loading";

const EventCards: React.FC<PropsI> = ({ data, textRows = 2, loading }) => {
  const { t } = useTranslation();

  return (
    <Card className='relative p-4'>
      <CardTitle className='text-lg font-semibold mb-2'>
        {t("admin_dashboard.events")}
      </CardTitle>
      <DropDown url='/list/events' />

      <div className='flex flex-col gap-4 max-h-[400px] overflow-y-auto'>
        {loading ? (
          <Loading textRows={textRows} />
        ) : data?.length === 0 ? (
          <p>{t("admin_dashboard.no_data_available")}</p>
        ) : (
          data?.map(
            ({ _id, name, class: classN, startDate, endDate, description }) => (
              <Card
                key={_id}
                className={`flex flex-col gap-2 p-4 border-t-[5px] border-t-[rgba(195,235,250,0.3)] hover:scale-95 transition-all`}
              >
                <div className='grid grid-cols-[1fr_auto] gap-2'>
                  <h5 className='text-md font-semibold underline line-clamp-1 hover:text-blue-500'>
                    <Link to={`/list/events/${_id}`}>{name}</Link>
                  </h5>
                  <h4 className='text-sm bg-[rgba(195,235,250,0.3)] px-2 rounded-md center'>
                    {classN ? (
                      <Link
                        to={`/list/classes/${classN?._id}`}
                        className='hover:text-blue-500 hover:underline'
                      >
                        {classN.name} {t("data-table.columns.class")}
                      </Link>
                    ) : (
                      t("data-table.general")
                    )}
                  </h4>
                </div>
                <p className={`text-sm text-[#A1ADB4] line-clamp-${textRows}`}>
                  {description}
                </p>
                <div className='flex items-center justify-between'>
                  <time className="text-sm">
                    {formatDate(startDate, "hh:mm")} -{" "}
                    {formatDate(endDate, "hh:mm a")}
                  </time>
                  <time className="text-sm">{formatDate(startDate, "d MMM YYY")}</time>
                </div>
              </Card>
            )
          )
        )}
      </div>
    </Card>
  );
};

export default EventCards;
