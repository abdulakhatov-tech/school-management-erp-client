import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useSubjectService } from "@/services/subjects";

const SubjectsPageView:React.FC = () => {
    const { t } = useTranslation();
     const { columns } = useColumns();
      const { getAllSubjects } = useSubjectService();
    
      const { data, isLoading } = getAllSubjects;

  return <Section id='subject-page-view' title={t('app_sidebar.subjects')}>
    <DataTable columns={columns} data={data} loading={isLoading} />
  </Section>;
};

export default SubjectsPageView;
