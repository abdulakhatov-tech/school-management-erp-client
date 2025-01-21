import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useStudentService = () => {
  const param = useParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const studentId = searchParams.get("studentId") || param?.studentId;

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
    return searchParams.get("status") || "enrolled";
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
    status?: string;
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

  const classId = getClass();
  if (classId) {
    params.class = classId;
  }

  const startDate = getStartDate();
  if (startDate) {
    params.startDate = startDate;
  }

  const dueDate = getDueDate();
  if (dueDate) {
    params.dueDate = dueDate;
  }

  const getAllStudents = useQueryHandler({
    queryKey: ["students", params],
    queryFn: async () => {
      const response = await $axios.get("/students", { params });

      return response?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("student_form.failed_to_fetch_student"),
      });
    },
  });

  const getAllStudentsUnpaginated = useQueryHandler({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await $axios.get("/students", { params: { search } });

      return response?.data?.data || [];
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("student.failed_to_fetch_students"),
      });
    },
  });

  const getStudentById = useQueryHandler({
    queryKey: ["students", studentId],
    queryFn: async () => {
      if (!studentId) return null;

      const response = await $axios.get(`/students/${studentId}`);
      return response?.data?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("student_form.failed_to_fetch_student"),
      });
    },
  });

  const createStudent = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.post("/students/create", body);
      return response?.data?.data;
    },
    onSuccess: () => {
      toast({
        title: t("student_form.student_created_successfully"),
      });

      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("student_form.failed_to_create_student"),
      });
    },
  });

  const updateStudent = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.put(`/students/${studentId}`, body);
      return response?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });

      toast({
        title: t("student_form.student_updated_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("student_form.failed_to_update_student"),
      });
    },
  });

  const deleteStudent = useMutation({
    mutationFn: async () => {
      const response = await $axios.delete(`/students/${studentId}`);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });

      toast({
        title: t("student_form.student_deleted_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("student_form.failed_to_delete_student"),
      });
    },
  });

  return {
    createStudent,
    updateStudent,
    getAllStudents,
    getStudentById,
    deleteStudent,
    getAllStudentsUnpaginated,
  };
};
