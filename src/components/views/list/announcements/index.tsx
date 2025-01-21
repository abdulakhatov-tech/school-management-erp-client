import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useAnnouncementsService } from "@/services/announcements";

const AnnouncementsPageView:React.FC = () => {
  const { t } = useTranslation();
  const { columns } = useColumns();
  const { getAllAnnouncements } = useAnnouncementsService();

  const { data, isLoading } = getAllAnnouncements;

  return <Section id='announcement-page-view' title={t('app_sidebar.announcements')}>
    <DataTable data={data} columns={columns} loading={isLoading} />
  </Section>;
};

export default AnnouncementsPageView;
