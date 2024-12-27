import useAxiosInstance from "@/api";
import useQueryHandler from "@/hooks/useQueryHandler";
import { useSearchParams } from "react-router-dom";

export const useAnalyticsService = () => {
  const $axios = useAxiosInstance();
  const [searchParams] = useSearchParams();

  const date = searchParams.get("date") || new Date();

  const getAnalytics = useQueryHandler({
    queryKey: ["analytics", date],
    queryFn: async () => {
      const response = await $axios.get(`/analytics?date=${date}`);
      return response.data?.data;
    },
  });

  return {
    getAnalytics,
  };
};
