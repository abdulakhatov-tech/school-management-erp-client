import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useParentsService } from "@/services/users/parents";

const ParentsPageView: React.FC = () => {
  const { t } = useTranslation();
  const { columns } = useColumns();
    const { getAllParents } = useParentsService();
  
    const { data, isLoading } = getAllParents;

  return (
    <Section id='parents-page-view' title={t("app_sidebar.parents")}>
      <DataTable
        data={data}
        columns={columns}
        loading={isLoading}
      />
    </Section>
  );
};

export default ParentsPageView;
