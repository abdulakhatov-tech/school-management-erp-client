import { useTranslation } from "react-i18next";

const useMockData = () => {
  const { t } = useTranslation();

  const admin_status_options = [
    {
      _id: "1",
      label: t("data-table.status_options.active"),
      value: "active",
    },
    {
      _id: "2",
      label: t("data-table.status_options.inactive"),
      value: "inactive",
    },
    {
      _id: "3",
      label: t("data-table.status_options.on-leave"),
      value: "on-leave",
    },
    {
      _id: "4",
      label: t("data-table.status_options.retired"),
      value: "retired",
    },
    {
      _id: "5",
      label: t("data-table.status_options.resigned"),
      value: "resigned",
    },
    {
      _id: "6",
      label: t("data-table.status_options.pending"),
      value: "pending",
    },
  ];

  const student_status_option = [
    {
      _id: "1",
      label: t("data-table.status_options.enrolled"),
      value: "enrolled",
    },
    {
      _id: "2",
      label: t("data-table.status_options.graduated"),
      value: "graduated",
    },
    {
      _id: "3",
      label: t("data-table.status_options.dropped-out"),
      value: "dropped-out",
    },
    {
      _id: "4",
      label: t("data-table.status_options.expelled"),
      value: "expelled",
    },
    {
      _id: "5",
      label: t("data-table.status_options.on-leave"),
      value: "on-leave",
    },
  ];

  return { admin_status_options, student_status_option };
};

export default useMockData;
