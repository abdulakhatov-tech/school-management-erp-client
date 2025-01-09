import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

export const useClassService = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearch = useCallback(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const search = getSearch();

  const getAllClasssUnpaginated = useQueryHandler({
    queryKey: ["classes"],
    queryFn: async () => {
      const response = await $axios.get("/classes", { params: { search } });

      return response?.data?.data || [];
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("class_form.failed_to_fetch_classes"),
      });
    },
  });

  return {
    getAllClasssUnpaginated,
  };
};
