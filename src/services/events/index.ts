import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxiosInstance from "@/api";
import { useToast } from "@/hooks/use-toast";
import useQueryHandler from "@/hooks/useQueryHandler";

export const useEventsService = () => {
  const param = useParams();
  const { toast } = useToast();
  const { t } = useTranslation();
  const $axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const eventId = searchParams.get("eventId") || param?.eventId;

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

  const getAllEvents = useQueryHandler({
    queryKey: ["events", params],
    queryFn: async () => {
      const response = await $axios.get("/events", { params });

      return response?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("event_form.failed_to_fetch_events"),
      });
    },
  });

  const getEventById = useQueryHandler({
    queryKey: ["events", eventId],
    queryFn: async () => {
      if (!eventId) return null;

      const response = await $axios.get(`/events/${eventId}`);
      return response?.data?.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: t("event_form.failed_to_fetch_event"),
      });
    },
  });

  const createEvent = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.post("/events/create", body);
      return response?.data?.data;
    },
    onSuccess: () => {
      toast({
        title: t("event_form.event_created_successfully"),
      });

      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("event_form.failed_to_create_event"),
      });
    },
  });

  const updateEvent = useMutation({
    mutationFn: async (body: object) => {
      const response = await $axios.put(`/events/${eventId}`, body);
      return response?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      toast({
        title: t("event_form.event_updated_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("event_form.failed_to_edit_event"),
      });
    },
  });

  const deleteEvent = useMutation({
    mutationFn: async () => {
      const response = await $axios.delete(`/events/${eventId}`);
      return response?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });

      toast({
        title: t("event_form.event_deleted_successfully"),
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message ||
          t("event_form.failed_to_delete_event"),
      });
    },
  });

  return {
    getEventById,
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
