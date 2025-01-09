import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useTeacherService } from "@/services/users/teachers";

const TeachersPageView: React.FC = () => {
  const { t } = useTranslation();
  const { columns } = useColumns();
  const { getAllTeachers } = useTeacherService();

  const { data, isLoading } = getAllTeachers;

  return (
    <Section id='teachers-page-view' title={t("app_sidebar.teachers")}>
      <DataTable columns={columns} data={data} loading={isLoading} />
    </Section>
  );
};

export default TeachersPageView;
