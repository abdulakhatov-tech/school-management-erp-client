import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import { IPaginationParams } from "@/interfaces/pagination";

export const useClassService = () => {
  const param = useParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const classId = searchParams.get("classId") || param?.classId;

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
    return searchParams.get("status") || "active";
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

  const getAllClasses = useQueryHandler({
    queryKey: ["classes", params],
    queryFn: async () => {
      const response = await $axios.get("/classes", { params });

      return response?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("class_form.failed_to_fetch_class"),
      });
    },
  });

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

  const getClassById = useQueryHandler({
    queryKey: ["classes", classId],
    queryFn: async () => {
      if (!classId) return null;

      const response = await $axios.get(`/classes/${classId}`);
      return response?.data?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("class_form.failed_to_fetch_class"),
      });
    },
  });

  const createClass = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.post("/classes/create", body);
      return response?.data?.data;
    },
    onSuccess: () => {
      toast({
        title: t("class_form.class_created_successfully"),
      });

      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("class_form.failed_to_create_class"),
      });
    },
  });

  const updateClass = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.put(`/classes/${classId}`, body);
      return response?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });

      toast({
        title: t("class_form.class_updated_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("class_form.failed_to_update_class"),
      });
    },
  });

  const deleteClass = useMutation({
    mutationFn: async () => {
      const response = await $axios.delete(`/classes/${classId}`);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });

      toast({
        title: t("class_form.class_deleted_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("class_form.failed_to_delete_class"),
      });
    },
  });

  return {
    createClass,
    deleteClass,
    updateClass,
    getClassById,
    getAllClasses,
    getAllClasssUnpaginated,
  };
};
