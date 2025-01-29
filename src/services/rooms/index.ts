import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

export const useRoomService = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const [searchParams] = useSearchParams();

  const getSearch = useCallback(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const search = getSearch();

  const getAllRoomsUnpaginated = useQueryHandler({
    queryKey: ["rooms"],
    queryFn: async () => {
      const response = await $axios.get("/rooms", { params: { search } });

      return response?.data?.data || [];
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("room_form.failed_to_fetch_roomes"),
      });
    },
  });

  return {
    getAllRoomsUnpaginated,
  };
};
