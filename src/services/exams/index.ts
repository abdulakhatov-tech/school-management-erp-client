import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import { IPaginationParams } from "@/interfaces/pagination";

export const useExamService = () => {
  const param = useParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const examId = searchParams.get("examId") || param?.examId;

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

  const getLesson = useCallback(() => {
    return searchParams.get("lesson") || "all";
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
    lesson?: string;
  } = {
    limit: getLimit(),
    page: getPage(),
  };

  const search = getSearch();
  if (search) {
    params.search = search;
  }

  const lesson = getLesson();
  if (lesson) {
    params.lesson = lesson;
  }

  const getAllExams = useQueryHandler({
    queryKey: ["exams", params],
    queryFn: async () => {
      const response = await $axios.get("/exams", { params });

      return response?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("exam_form.failed_to_fetch_exams"),
      });
    },
  });

  const getAllExamsUnpaginated = useQueryHandler({
    queryKey: ["exams"],
    queryFn: async () => {
      const response = await $axios.get("/exams", { params: { search } });

      return response?.data?.data || [];
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("exam_form.failed_to_fetch_exams"),
      });
    },
  });

  const getExamById = useQueryHandler({
    queryKey: ["exams", examId],
    queryFn: async () => {
      if (!examId) return null;

      const response = await $axios.get(`/exams/${examId}`);
      return response?.data?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("exam_form.failed_to_fetch_exam"),
      });
    },
  });

  const createExam = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.post("/exams/create", body);
      return response?.data?.data;
    },
    onSuccess: () => {
      toast({
        title: t("exam_form.exam_created_successfully"),
      });

      queryClient.invalidateQueries({
        queryKey: ["exams"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("exam_form.failed_to_create_exam"),
      });
    },
  });

  const updateExam = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.put(`/exams/${examId}`, body);
      return response?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exams"],
      });

      toast({
        title: t("exam_form.exam_updated_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("exam_form.failed_to_update_exam"),
      });
    },
  });

  const deleteExam = useMutation({
    mutationFn: async () => {
      const response = await $axios.delete(`/exams/${examId}`);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exams"],
      });

      toast({
        title: t("exam_form.exam_deleted_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("exam_form.failed_to_delete_exam"),
      });
    },
  });

  return {
    updateExam,
    deleteExam,
    createExam,
    getAllExams,
    getExamById,
    getAllExamsUnpaginated,
  };
};
