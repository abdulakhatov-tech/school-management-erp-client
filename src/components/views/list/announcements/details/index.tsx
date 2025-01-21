import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Loading from "./loading";
import { Card } from "@/components/ui/card";
import announcementImage from "@/assets/images/image.png";
import { useAnnouncementsService } from "@/services/announcements";

const AnnouncementDetailsPageView: React.FC = () => {
  const { t } = useTranslation();
  const { getAnnouncementById } = useAnnouncementsService();
  const { data, isLoading } = getAnnouncementById;

  return (
    <Card className='p-6 mx-auto h-full'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className='text-3xl font-bold mb-6'>{data?.name}</h1>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <p className=''>
                <span className='font-medium text-gray-700 mr-2'>
                  {t("data-table.columns.status")}:
                </span>{" "}
                {t(`data-table.status_options.${data?.status}`)}
              </p>
              <p>
                <span className='font-medium text-gray-700 mr-2'>
                  {t("data-table.columns.class")}:
                </span>{" "}
                {data?.class ? (
                  <Link
                    to={`/list/classes/${data?.class?._id}`}
                    className='text-blue-600 hover:underline'
                  >
                    {data?.class?.name} {t(`data-table.columns.class`)}
                  </Link>
                ) : (
                  t("data-table.general")
                )}
              </p>
              <p className='text-gray-700'>
                <span className='font-medium  mr-2'>
                  {t("data-table.columns.createdBy")}:
                </span>{" "}
                <Link
                  to={`/list/admins/${data?.createdBy?._id}`}
                  className='text-blue-600 hover:underline'
                >
                  {data?.createdBy?.fullName}
                </Link>
              </p>
            </div>
            <div>
              <p>
                <span className='font-medium text-gray-700 mr-2'>
                  {t("data-table.columns.date")}:
                </span>{" "}
                {new Date(data?.date).toLocaleDateString()}
              </p>
              <p className=''>
                <span className='font-medium text-gray-700 mr-2'>
                  {t("data-table.columns.createdAt")}:
                </span>{" "}
                {new Date(data?.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className='mt-8'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
              {t("data-table.columns.description")}
            </h2>
            <p>{data?.description}</p>
          </div>
        </>
      )}

      <img
        className='w-full max-w-xl  mx-auto mt-6 rounded-lg shadow-md object-cover'
        src={announcementImage}
        alt='Announcement'
      />
    </Card>
  );
};

export default AnnouncementDetailsPageView;
