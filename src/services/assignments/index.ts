import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

export const useAssignmentService = () => {
  const param = useParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const assignmentId = searchParams.get("assignmentId") || param?.assignmentId;

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
    lesson?: string;
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

  const lesson = getLesson();
  if (lesson) {
    params.lesson = lesson;
  }

  const startDate = getStartDate();
  if (startDate) {
    params.startDate = startDate;
  }

  const dueDate = getDueDate();
  if (dueDate) {
    params.dueDate = dueDate;
  }

  const getAllAssignments = useQueryHandler({
    queryKey: ["assignments", params],
    queryFn: async () => {
      const response = await $axios.get("/assignments", { params });

      return response?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("assignment_form.failed_to_fetch_assignments"),
      });
    },
  });

  const getAllAssignmentsUnpaginated = useQueryHandler({
    queryKey: ["assignments"],
    queryFn: async () => {
      const response = await $axios.get("/assignments", { params: { search } });

      return response?.data?.data || [];
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("assignment_form.failed_to_fetch_assignments"),
      });
    },
  });

  const getAssignmentById = useQueryHandler({
    queryKey: ["assignments", assignmentId],
    queryFn: async () => {
      if (!assignmentId) return null;

      const response = await $axios.get(`/assignments/${assignmentId}`);
      return response?.data?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("assignment_form.failed_to_fetch_assignment"),
      });
    },
  });

  const createAssignment = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.post("/assignments/create", body);
      return response?.data?.data;
    },
    onSuccess: () => {
      toast({
        title: t("assignment_form.assignment_created_successfully"),
      });

      queryClient.invalidateQueries({
        queryKey: ["assignments"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("assignment_form.failed_to_create_assignment"),
      });
    },
  });

  const updateAssignment = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.put(`/assignments/${assignmentId}`, body);
      return response?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assignments"],
      });

      toast({
        title: t("assignment_form.assignment_updated_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("assignment_form.failed_to_update_assignment"),
      });
    },
  });

  const deleteAssignment = useMutation({
    mutationFn: async () => {
      const response = await $axios.delete(`/assignments/${assignmentId}`);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assignments"],
      });

      toast({
        title: t("assignment_form.assignment_deleted_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("assignment_form.failed_to_delete_assignment"),
      });
    },
  });

  return {
    updateAssignment,
    deleteAssignment,
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    getAllAssignmentsUnpaginated,
  };
};
