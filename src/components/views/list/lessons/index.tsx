import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useLessonService } from "@/services/lessons";

const LessonsPageView: React.FC = () => {
  const { t } = useTranslation();
  const { columns } = useColumns();
  const { getAllLessons } = useLessonService();

  const { data, isLoading } = getAllLessons;

  return (
    <Section id='lesson-page-view' title={t("app_sidebar.lessons")}>
      <DataTable data={data} columns={columns} loading={isLoading} />
    </Section>
  );
};

export default LessonsPageView;
