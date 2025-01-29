import React from "react";
import { Section } from "@/components/layout";
import { DataTable, useColumns } from "./customs";
import { useClassService } from "@/services/classes";

const ClassAttendancePageView: React.FC = () => {
  const { columns } = useColumns();
  const { getClassById } = useClassService();

  const { data, isLoading } = getClassById

  console.log(data, 'data')

  return (
    <Section id='class-attendance-page-view' title={"1 A Class"}>
      <DataTable
        columns={columns}
        data={data?.students}
        loading={isLoading}
      />
    </Section>
  );
};

export default ClassAttendancePageView;
