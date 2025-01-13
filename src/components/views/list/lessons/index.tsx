import React from "react";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/layout";

const LessonsPageView:React.FC = () => {
    const { t } = useTranslation();

  return <Section id='lesson-page-view' title={t('app_sidebar.lessons')}>LessonsPageView</Section>;
};

export default LessonsPageView;
