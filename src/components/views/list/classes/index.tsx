import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useClassService } from "@/services/classes";

const ClassesPageView: React.FC = () => {
  const { t } = useTranslation();
  const { columns } = useColumns();
  const { getAllClasses } = useClassService();

  const { data, isLoading } = getAllClasses;

  return (
    <Section id='classes-page-view' title={t("app_sidebar.classes")}>
      <DataTable columns={columns} data={data} loading={isLoading} />
    </Section>
  );
};

export default ClassesPageView;
