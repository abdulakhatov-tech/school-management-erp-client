import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useExamService } from "@/services/exams";

const ExamsPageView: React.FC = () => {
  const { t } = useTranslation();
  const { columns } = useColumns();
  const { getAllExams } = useExamService();

  const { data, isLoading } = getAllExams;

  return (
    <Section id='exams-page-view' title={t("app_sidebar.exams")}>
      <DataTable data={data} columns={columns} loading={isLoading} />
    </Section>
  );
};

export default ExamsPageView;
