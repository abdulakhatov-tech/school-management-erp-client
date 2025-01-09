import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useStudentService } from "@/services/users/students";

const StudentsPageView: React.FC = () => {
  const { t } = useTranslation();
  const { columns } = useColumns();
  const { getAllStudents } = useStudentService();

  const { data, isLoading } = getAllStudents;

  return (
    <Section id='students-page-view' title={t("app_sidebar.students")}>
      <DataTable columns={columns} data={data} loading={isLoading} />
    </Section>
  );
};

export default StudentsPageView;
