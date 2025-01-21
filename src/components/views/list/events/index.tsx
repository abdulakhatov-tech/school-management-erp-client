import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useEventsService } from "@/services/events";

const EventsPageView:React.FC = () => {
  const { t } = useTranslation();
  const { columns } = useColumns();
  const { getAllEvents } = useEventsService();

  const { data, isLoading } = getAllEvents;

  return <Section id='event-page-view' title={t('app_sidebar.events')}>
    <DataTable data={data} columns={columns} loading={isLoading} />
  </Section>;
};

export default EventsPageView;
