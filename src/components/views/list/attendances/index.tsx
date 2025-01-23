import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useAttendancesService } from "@/services/attendances";


const AttendancesPageView:React.FC = () => {
    const { t } = useTranslation();
    const { columns } = useColumns();
    const { getAllAttendances } = useAttendancesService();
  
    const { data, isLoading } = getAllAttendances;
  
    return <Section id='attendance-page-view' title={t('app_sidebar.attendance')}>
      <DataTable data={data} columns={columns} loading={isLoading} />
    </Section>;
};

export default AttendancesPageView;
