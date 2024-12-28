import { useTranslation } from "react-i18next";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { IPaginationParams } from "@/interfaces/pagination";

export const useAdminService = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get limit and page from search params
  const getLimit = useCallback(() => {
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    return [10, 20, 50, 100].includes(limit) ? limit : 10;
  }, [searchParams]);

  const getPage = useCallback(() => {
    return parseInt(searchParams.get("page") || "1", 10);
  }, [searchParams]);

  const getSearch = useCallback(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const getStatus = useCallback(() => {
    return searchParams.get("status") || "";
  }, [searchParams]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    const limit = getLimit();
    if (parseInt(searchParams.get("limit") || "10", 10) !== limit) {
      newSearchParams.set("limit", limit.toString());
      setSearchParams(newSearchParams);
    }
  }, [searchParams, setSearchParams, getLimit]);

  const params: IPaginationParams = {
    limit: getLimit(),
    page: getPage(),
  };

  const search = getSearch();
  if (search) {
    params.search = search;
  }

  const status = getStatus();
  if (status) {
    params.status = status;
  }

  const getAllAdmins = useQueryHandler({
    queryKey: ["admins", params],
    queryFn: async () => {
      const response = await $axios.get("/admins", { params });

      return response?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("admin_form.failed_to_fetch_admin"),
      });
    },
  });

  return {
    getAllAdmins,
  };
};
