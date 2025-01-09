import React from "react";
import Performance from "@/components/generic/performance";
import { useTranslation } from "react-i18next";

const ParentComponent: React.FC = () => {
  const { t } = useTranslation();
  const performanceData = [
    { name: "Class A", value: 92, fill: "#C3EBFA" },
    { name: "Class B", value: 8, fill: "#FCD53F" },
  ];

  return (
    <Performance
      title={t('teachers_list_profile.performance')}
      chartData={performanceData}
      centerLabelValue="9.2"
      centerLabelDescription="of 10 max LTS"
      footerText="1st Semester - 2nd Semester"
    />
  );
};

export default ParentComponent;
