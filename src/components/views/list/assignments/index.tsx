import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useAssignmentService } from "@/services/assignments";

const AssignmentsPageView: React.FC = () => {
  const { t } = useTranslation();
  const { columns } = useColumns();
  const { getAllAssignments } = useAssignmentService();

  const { data, isLoading } = getAllAssignments;

  return (
    <Section id='ssignments-page-view' title={t("app_sidebar.assignments")}>
      <DataTable data={data} columns={columns} loading={isLoading} />
    </Section>
  );
};

export default AssignmentsPageView;
