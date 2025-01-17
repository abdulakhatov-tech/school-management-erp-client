import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import { IPaginationParams } from "@/interfaces/pagination";

export const useSubjectService = () => {
  const param = useParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const subjectId = searchParams.get("subjectId") || param?.subjectId;

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

  const getAllSubjects = useQueryHandler({
    queryKey: ["subjects", params],
    queryFn: async () => {
      const response = await $axios.get("/subjects", { params });

      return response?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("subject_form.failed_to_fetch_subjects"),
      });
    },
  });

  const getAllSubjectsUnpaginated = useQueryHandler({
    queryKey: ["subjects"],
    queryFn: async () => {
      const response = await $axios.get("/subjects", { params: { search } });

      return response?.data?.data || [];
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("subject_form.failed_to_fetch_subjects"),
      });
    },
  });

  const getSubjectById = useQueryHandler({
    queryKey: ["subjects", subjectId],
    queryFn: async () => {
      if (!subjectId) return null;

      const response = await $axios.get(`/subjects/${subjectId}`);
      return response?.data?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("subject_form.failed_to_fetch_subject"),
      });
    },
  });

  const createSubject = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.post("/subjects/create", body);
      return response?.data?.data;
    },
    onSuccess: () => {
      toast({
        title: t("subject_form.subject_created_successfully"),
      });

      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("subject_form.failed_to_create_subject"),
      });
    },
  });

  const updateSubject = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.put(`/subjects/${subjectId}`, body);
      return response?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });

      toast({
        title: t("subject_form.subject_updated_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("subject_form.failed_to_update_subject"),
      });
    },
  });

  const deleteSubject = useMutation({
    mutationFn: async () => {
      const response = await $axios.delete(`/subjects/${subjectId}`);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subjects"],
      });

      toast({
        title: t("subject_form.subject_deleted_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("subject_form.failed_to_delete_subject"),
      });
    },
  });

  return {
    updateSubject,
    deleteSubject,
    createSubject,
    getAllSubjects,
    getSubjectById,
    getAllSubjectsUnpaginated,
  };
};
