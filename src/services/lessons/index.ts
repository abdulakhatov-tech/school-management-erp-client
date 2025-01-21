import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import { IPaginationParams } from "@/interfaces/pagination";

export const useLessonService = () => {
  const param = useParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const lessonId = searchParams.get("lessonId") || param?.lessonId;

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
    return searchParams.get("status") || "scheduled";
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
    limit: number;
    page: number;
    search?: string;
    status?: string;
    startDate?: string;
    dueDate?: string;
  } = {
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

  const startDate = getStartDate();
  if (startDate) {
    params.startDate = startDate;
  }

  const dueDate = getDueDate();
  if (dueDate) {
    params.dueDate = dueDate;
  }

  const getAllLessons = useQueryHandler({
    queryKey: ["lessons", params],
    queryFn: async () => {
      const response = await $axios.get("/lessons", { params });

      return response?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("lesson_form.failed_to_fetch_lesson"),
      });
    },
  });

  const getAllLessonsUnpaginated = useQueryHandler({
    queryKey: ["lessons"],
    queryFn: async () => {
      const response = await $axios.get("/lessons", { params: { search } });

      return response?.data || [];
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("lesson_form.failed_to_fetch_lesson"),
      });
    },
  });

  const getLessonById = useQueryHandler({
    queryKey: ["lessons", lessonId],
    queryFn: async () => {
      if (!lessonId) return null;

      const response = await $axios.get(`/lessons/${lessonId}`);
      return response?.data?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("lesson_form.failed_to_fetch_lesson"),
      });
    },
  });

  const createLesson = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.post("/lessons/create", body);
      return response?.data?.data;
    },
    onSuccess: () => {
      toast({
        title: t("lesson_form.lesson_created_successfully"),
      });

      queryClient.invalidateQueries({
        queryKey: ["lessons"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("lesson_form.failed_to_create_lesson"),
      });
    },
  });

  const updateLesson = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.put(`/lessons/${lessonId}`, body);
      return response?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lessons"],
      });

      toast({
        title: t("lesson_form.lesson_updated_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("lesson_form.failed_to_update_lesson"),
      });
    },
  });

  const deleteLesson = useMutation({
    mutationFn: async () => {
      const response = await $axios.delete(`/lessons/${lessonId}`);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lessons"],
      });

      toast({
        title: t("lesson_form.lesson_deleted_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("lesson_form.failed_to_delete_lesson"),
      });
    },
  });

  return {
    getAllLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
    getAllLessonsUnpaginated,
  };
};
