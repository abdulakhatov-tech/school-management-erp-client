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
      label: `1 A ${t("user_form.class")}`,
      value: "1 A",
    },
    {
      _id: "1-2",
      label: `1 B ${t("user_form.class")}`,
      value: "1 B",
    },
    {
      _id: "2-1",
      label: `2 A ${t("user_form.class")}`,
      value: "2 A",
    },
    {
      _id: "2-2",
      label: `2 B ${t("user_form.class")}`,
      value: "2 B",
    },
    {
      _id: "3-1",
      label: `3 A ${t("user_form.class")}`,
      value: "3 A",
    },
    {
      _id: "3-2",
      label: `3 B ${t("user_form.class")}`,
      value: "3 B",
    },
    {
      _id: "4-1",
      label: `4 A ${t("user_form.class")}`,
      value: "4 A",
    },
    {
      _id: "4-2",
      label: `4 B ${t("user_form.class")}`,
      value: "4 B",
    },
    {
      _id: "5-1",
      label: `5 A ${t("user_form.class")}`,
      value: "5 A",
    },
    {
      _id: "5-2",
      label: `5 B ${t("user_form.class")}`,
      value: "5 B",
    },
    {
      _id: "6-1",
      label: `6 A ${t("user_form.class")}`,
      value: "6 A",
    },
    {
      _id: "6-2",
      label: `6 B ${t("user_form.class")}`,
      value: "6 B",
    },
    {
      _id: "7-1",
      label: `7 A ${t("user_form.class")}`,
      value: "7 A",
    },
    {
      _id: "7-2",
      label: `7 B ${t("user_form.class")}`,
      value: "7 B",
    },
    {
      _id: "8-1",
      label: `8 A ${t("user_form.class")}`,
      value: "8 A",
    },
    {
      _id: "8-2",
      label: `8 B ${t("user_form.class")}`,
      value: "8 B",
    },
    {
      _id: "9-1",
      label: `9 A ${t("user_form.class")}`,
      value: "9 A",
    },
    {
      _id: "9-2",
      label: `9 B ${t("user_form.class")}`,
      value: "9 B",
    },
    {
      _id: "10-1",
      label: `10 A ${t("user_form.class")}`,
      value: "10 A",
    },
    {
      _id: "10-2",
      label: `10 B ${t("user_form.class")}`,
      value: "10 B",
    },
    {
      _id: "11-1",
      label: `11 A ${t("user_form.class")}`,
      value: "11 A",
    },
    {
      _id: "11-2",
      label: `11 B ${t("user_form.class")}`,
      value: "11 B",
    },
  ];

  const lesson_status_options = [
    {
      _id: "1",
      label: t("lesson_form.scheduled"),
      value: "scheduled",
    },
    {
      _id: "2",
      label: t("lesson_form.ongoing"),
      value: "ongoing",
    },
    {
      _id: "3",
      label: t("lesson_form.completed"),
      value: "completed",
    },
    {
      _id: "4",
      label: t("lesson_form.cancelled"),
      value: "cancelled",
    },
  ];

  const week_days = [
    { value: "MONDAY", label: t("week_days.monday") },
    { value: "TUESDAY", label: t("week_days.tuesday") },
    { value: "WEDNESDAY", label: t("week_days.wednesday") },
    { value: "THURSDAY", label: t("week_days.thursday") },
    { value: "FRIDAY", label: t("week_days.friday") },
  ];

  const subject_status_options = [
    {
      _id: "1",
      label: t("subject_form.active"),
      value: "active",
    },
    {
      _id: "2",
      label: t("subject_form.inactive"),
      value: "inactive",
    },
    {
      _id: "3",
      label: t("subject_form.pending"),
      value: "pending",
    },
  ];

  const announcement_status_options = [
    {
      _id: "1",
      label: t("data-table.status_options.approved"),
      value: "approved",
    },
    {
      _id: "2",
      label: t("data-table.status_options.pending"),
      value: "pending",
    },
    {
      _id: "3",
      label: t("data-table.status_options.rejected"),
      value: "rejected",
    },
    {
      _id: "4",
      label: t("data-table.status_options.finished"),
      value: "finished",
    },
  ];

  return {
    announcement_status_options,
    subject_status_options,
    student_status_option,
    parent_status_options,
    lesson_status_options,
    admin_status_options,
    class_status_options,
    grade_options,
    week_days,
  };
};

export default useMockData;
