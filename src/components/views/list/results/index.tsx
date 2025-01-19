import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useResultService } from "@/services/results";

const ResultsPageView: React.FC = () => {
  const { t } = useTranslation();
  const { columns } = useColumns();
  const { getAllResults } = useResultService();

  const { data, isLoading } = getAllResults;

  return (
    <Section id='results-page-view' title={t("app_sidebar.results")}>
      <DataTable data={data} columns={columns} loading={isLoading} />
    </Section>
  );
};

export default ResultsPageView;
