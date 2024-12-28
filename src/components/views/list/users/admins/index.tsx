import React from "react";
import { DataTable, useColumns } from "./customs";
import { useAdminService } from "@/services/users/admins";
import { Section } from "@/components/layout";
import { useTranslation } from "react-i18next";

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
