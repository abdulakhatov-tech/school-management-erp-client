import React from "react";
import { useTranslation } from "react-i18next";
import useAdminProfileFeatures from "../../features";
import { Card, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Announcements: React.FC = () => {
  const { t } = useTranslation();
  const { announcements } = useAdminProfileFeatures();

  return (
    <Card className='relative p-4'>
      <CardTitle className='mb-2 text-lg'>
        {t("teachers_list_profile.announcements")}
      </CardTitle>

      <ScrollArea className="max-h-[300px] overflow-y-auto">
      <div className='flex flex-col gap-4'>
        {announcements?.length === 0 ? (
          <p>{t("admin_dashboard.no_data_available")}</p>
        ) : (
          announcements?.map(({ _id, name, description, bg }) => (
            <Card
              key={_id}
              className={`p-4 ${bg} hover:scale-[0.98] transition-all`}
            >
              <h5 className='text-md font-semibold underline mb-2'>{name}</h5>
              <p className={`text-sm text-[#A1ADB4] line-clamp-1`}>
                {description}
              </p>
            </Card>
          ))
        )}
      </div>
      </ScrollArea>
    </Card>
  );
};

export default Announcements;
