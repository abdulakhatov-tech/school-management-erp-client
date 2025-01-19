import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

export const useResultService = () => {
  const param = useParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const resultId = searchParams.get("resultId") || param?.resultId;

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

  const getType = useCallback(() => {
    return searchParams.get("type") || "all";
  }, [searchParams]);

  const getClass = useCallback(() => {
    return searchParams.get("class") || "all";
  }, [searchParams]);

  const getStartDate = useCallback(() => {
    return searchParams.get("startDate") || "";
  }, [searchParams]);

  const getDueDate = useCallback(() => {
    return searchParams.get("dueDate") || "";
  }, [searchParams]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    const limit = getLimit();
    if (parseInt(searchParams.get("limit") || "10", 10) !== limit) {
      newSearchParams.set("limit", limit.toString());
      setSearchParams(newSearchParams);
    }
  }, [searchParams, setSearchParams, getLimit]);

  const params: {
    limit?: number;
    page?: number;
    search?: string;
    class?: string;
    startDate?: string;
    dueDate?: string;
    type?: string;
  } = {
    limit: getLimit(),
    page: getPage(),
  };

  const search = getSearch();
  if (search) {
    params.search = search;
  }

  const classId = getClass();
  if (classId) {
    params.class = classId;
  }

  const type = getType();
  if (type) {
    params.type = type;
  }

  const startDate = getStartDate();
  if (startDate) {
    params.startDate = startDate;
  }

  const dueDate = getDueDate();
  if (dueDate) {
    params.dueDate = dueDate;
  }

  const getAllResults = useQueryHandler({
    queryKey: ["results", params],
    queryFn: async () => {
      const response = await $axios.get("/results", { params });

      return response?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("result_form.failed_to_fetch_results"),
      });
    },
  });

  const getResultById = useQueryHandler({
    queryKey: ["results", resultId],
    queryFn: async () => {
      if (!resultId) return null;

      const response = await $axios.get(`/results/${resultId}`);
      return response?.data?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("result_form.failed_to_fetch_result"),
      });
    },
  });

  const createResult = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.post("/results/create", body);
      return response?.data?.data;
    },
    onSuccess: () => {
      toast({
        title: t("result_form.result_created_successfully"),
      });

      queryClient.invalidateQueries({
        queryKey: ["results"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("result_form.failed_to_create_result"),
      });
    },
  });

  const updateResult = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.put(`/results/${resultId}`, body);
      return response?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["results"],
      });

      toast({
        title: t("result_form.result_updated_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("result_form.failed_to_update_result"),
      });
    },
  });

  const deleteResult = useMutation({
    mutationFn: async () => {
      const response = await $axios.delete(`/results/${resultId}`);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["results"],
      });

      toast({
        title: t("result_form.result_deleted_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("result_form.failed_to_delete_result"),
      });
    },
  });

  return {
    getAllResults,
    getResultById,
    createResult,
    updateResult,
    deleteResult,
  };
};
