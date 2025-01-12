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

  const parent_status_options = [
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
      label: t("data-table.status_options.blocked"),
      value: "blocked",
    },
  ];

  const class_status_options = [
    {
      _id: "2",
      label: t("data-table.status_options.active"),
      value: "active",
    },
    {
      _id: "3",
      label: t("data-table.status_options.completed"),
      value: "completed",
    },
    {
      _id: "4",
      label: t("data-table.status_options.cancelled"),
      value: "cancelled",
    },
    {
      _id: "5",
      label: t("data-table.status_options.paused"),
      value: "paused",
    },
    {
      _id: "6",
      label: t("data-table.status_options.archived"),
      value: "archived",
    },
    {
      _id: "1",
      label: t("data-table.status_options.pending"),
      value: "pending",
    },
  ];

  const grade_options = [
    {
      _id: "1-1",
      label: t("class_form.grades.1-a"),
      value: "1-a",
    },
    {
      _id: "1-2",
      label: t("class_form.grades.1-b"),
      value: "1-b",
    },
    {
      _id: "1-3",
      label: t("class_form.grades.1-c"),
      value: "1-c",
    },
    {
      _id: "2-1",
      label: t("class_form.grades.2-a"),
      value: "2-a",
    },
    {
      _id: "2-2",
      label: t("class_form.grades.2-b"),
      value: "2-b",
    },
    {
      _id: "2-3",
      label: t("class_form.grades.2-c"),
      value: "2-c",
    },
    {
      _id: "3-1",
      label: t("class_form.grades.3-a"),
      value: "3-a",
    },
    {
      _id: "3-2",
      label: t("class_form.grades.3-b"),
      value: "3-b",
    },
    {
      _id: "3-3",
      label: t("class_form.grades.3-c"),
      value: "3-c",
    },
    {
      _id: "4-1",
      label: t("class_form.grades.4-a"),
      value: "4-a",
    },
    {
      _id: "4-2",
      label: t("class_form.grades.4-b"),
      value: "4-b",
    },
    {
      _id: "4-3",
      label: t("class_form.grades.4-c"),
      value: "4-c",
    },
    {
      _id: "5-1",
      label: t("class_form.grades.5-a"),
      value: "5-a",
    },
    {
      _id: "5-2",
      label: t("class_form.grades.5-b"),
      value: "5-b",
    },
    {
      _id: "5-3",
      label: t("class_form.grades.5-c"),
      value: "5-c",
    },
    {
      _id: "6-1",
      label: t("class_form.grades.6-a"),
      value: "6-a",
    },
    {
      _id: "6-2",
      label: t("class_form.grades.6-b"),
      value: "6-b",
    },
    {
      _id: "6-3",
      label: t("class_form.grades.6-c"),
      value: "6-c",
    },
    {
      _id: "7-1",
      label: t("class_form.grades.7-a"),
      value: "7-a",
    },
    {
      _id: "7-2",
      label: t("class_form.grades.7-b"),
      value: "7-b",
    },
    {
      _id: "7-3",
      label: t("class_form.grades.7-c"),
      value: "7-c",
    },
    {
      _id: "8-1",
      label: t("class_form.grades.8-a"),
      value: "8-a",
    },
    {
      _id: "8-2",
      label: t("class_form.grades.8-b"),
      value: "8-b",
    },
    {
      _id: "8-3",
      label: t("class_form.grades.8-c"),
      value: "8-c",
    },
    {
      _id: "9-1",
      label: t("class_form.grades.9-a"),
      value: "9-a",
    },
    {
      _id: "9-2",
      label: t("class_form.grades.9-b"),
      value: "9-b",
    },
    {
      _id: "9-3",
      label: t("class_form.grades.9-c"),
      value: "9-c",
    },
    {
      _id: "10-1",
      label: t("class_form.grades.10-a"),
      value: "10-a",
    },
    {
      _id: "10-2",
      label: t("class_form.grades.10-b"),
      value: "10-b",
    },
    {
      _id: "10-3",
      label: t("class_form.grades.10-c"),
      value: "10-c",
    },
    {
      _id: "11-1",
      label: t("class_form.grades.11-a"),
      value: "11-a",
    },
    {
      _id: "11-2",
      label: t("class_form.grades.11-b"),
      value: "11-b",
    },
    {
      _id: "11-3",
      label: t("class_form.grades.11-c"),
      value: "11-c",
    },
  ];

  return {
    admin_status_options,
    student_status_option,
    parent_status_options,
    class_status_options,
    grade_options,
  };
};

export default useMockData;
