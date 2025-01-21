import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

export const useAnnouncementsService = () => {
  const param = useParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const announcementId =
    searchParams.get("announcementId") || param?.announcementId;

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
    return searchParams.get("status") || "approved";
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

  const getAllAnnouncements = useQueryHandler({
    queryKey: ["announcements", params],
    queryFn: async () => {
      const response = await $axios.get("/announcements", { params });

      return response?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("announcement_form.failed_to_fetch_announcements"),
      });
    },
  });

  const getAnnouncementById = useQueryHandler({
    queryKey: ["announcements", announcementId],
    queryFn: async () => {
      if (!announcementId) return null;

      const response = await $axios.get(`/announcements/${announcementId}`);
      return response?.data?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("announcement_form.failed_to_fetch_announcement"),
      });
    },
  });

  const createAnnouncement = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.post("/announcements/create", body);
      return response?.data?.data;
    },
    onSuccess: () => {
      toast({
        title: t("announcement_form.announcement_created_successfully"),
      });

      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("announcement_form.failed_to_create_announcement"),
      });
    },
  });

  const updateAnnouncement = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.put(
        `/announcements/${announcementId}`,
        body
      );
      return response?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });

      toast({
        title: t("announcement_form.announcement_updated_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("announcement_form.failed_to_update_announcement"),
      });
    },
  });

  const deleteAnnouncement = useMutation({
    mutationFn: async () => {
      const response = await $axios.delete(`/announcements/${announcementId}`);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });

      toast({
        title: t("announcement_form.announcement_deleted_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("announcement_form.failed_to_delete_announcement"),
      });
    },
  });

  const changeStatusById = useMutation({
    mutationFn: async (body: { status: string }) => {
      const response = await $axios.post(
        `/announcements/${announcementId}/status`,
        body
      );

      return response?.data?.data;
    },
    onSuccess: () => {
      toast({
        title: t("announcement_form.status_changed"),
      });

      queryClient.invalidateQueries({
        queryKey: ["announcements"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("announcement_form.failed_to_change_status"),
      });
    },
  });

  return {
    getAnnouncementById,
    getAllAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    changeStatusById,
  };
};
