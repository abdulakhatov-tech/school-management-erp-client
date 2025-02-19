import { useTranslation } from "react-i18next";
import { useAnalyticsService } from "@/services/analytics";

interface UserCardItem {
  _id: string;
  count: number;
  title: string;
  url: string;
}

const useUserCardsFeatures = () => {
  const { t } = useTranslation();
  const { getAnalytics } = useAnalyticsService();

  const { data } = getAnalytics;

  const items: UserCardItem[] = [
    {
      _id: "1",
      count: data?.adminsCount || 0,
      title: t("admin_dashboard.admins"),
      url: "admins",
    },
    {
      _id: "2",
      count: data?.teachersCount || 0,
      title: t("admin_dashboard.teachers"),
      url: "teachers",
    },
    {
      _id: "3",
      count: data?.studentsCount || 0,
      title: t("admin_dashboard.students"),
      url: "students",
    },
    {
      _id: "4",
      count: data?.parentsCount || 0,
      title: t("app_sidebar.parents"),
      url: "subjects",
    },
  ];

  return { items };
};

export default useUserCardsFeatures;
