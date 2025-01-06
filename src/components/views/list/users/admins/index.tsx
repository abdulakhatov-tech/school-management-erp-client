import React from "react";
import { useTranslation } from "react-i18next";

import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useAdminService } from "@/services/users/admins";

const AdminsPageViews: React.FC = () => {
  const { t } = useTranslation();
  const { columns } = useColumns();
  const { getAllAdmins } = useAdminService();

  const { data, isLoading } = getAllAdmins;

  return (
    <Section id='admin-page-view' title={t('app_sidebar.admins')}>
      <DataTable columns={columns} data={data} loading={isLoading} />
    </Section>
  );
};

export default AdminsPageViews;
