import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import { IPaginationParams } from "@/interfaces/pagination";

export const useTeacherService = () => {
  const param = useParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const teacherId = searchParams.get("teacherId") || param?.teacherId;

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

  const getAllTeachers = useQueryHandler({
    queryKey: ["teachers", params],
    queryFn: async () => {
      const response = await $axios.get("/teachers", { params });

      return response?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("teacher_form.failed_to_fetch_teacher"),
      });
    },
  });

  const getAllTeachersUnpaginated = useQueryHandler({
    queryKey: ["teachers"],
    queryFn: async () => {
      const response = await $axios.get("/teachers", { params: { search } });

      return response?.data?.data || [];
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("teacher_form.failed_to_fetch_teachers"),
      });
    },
  });

  const getTeacherById = useQueryHandler({
    queryKey: ["teachers", teacherId],
    queryFn: async () => {
      if (!teacherId) return null;

      const response = await $axios.get(`/teachers/${teacherId}`);
      return response?.data?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("teacher_form.failed_to_fetch_teacher"),
      });
    },
  });

  const createTeacher = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.post("/teachers/create", body);
      return response?.data?.data;
    },
    onSuccess: () => {
      toast({
        title: t("teacher_form.teacher_created_successfully"),
      });

      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("teacher_form.failed_to_create_teacher"),
      });
    },
  });

  const updateTeacher = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.put(`/teachers/${teacherId}`, body);
      return response?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });

      toast({
        title: t("teacher_form.teacher_updated_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("teacher_form.failed_to_update_teacher"),
      });
    },
  });

  const deleteTeacher = useMutation({
    mutationFn: async () => {
      const response = await $axios.delete(`/teachers/${teacherId}`);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });

      toast({
        title: t("teacher_form.teacher_deleted_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("teacher_form.failed_to_delete_teacher"),
      });
    },
  });

  return {
    getAllTeachersUnpaginated,
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher,
  };
};
