import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import useEventFormModalFeatures from "@/components/modals/customs/EventFormModal/features";
import { handleValidationError } from "@/helpers/validation-error";
import { useEventsService } from "@/services/events";
import { useClassService } from "@/services/classes";
import { useAppSelector } from "@/hooks/useRedux";
import { IClass } from "@/interfaces/class";
import { toast } from "@/hooks/use-toast";
import { TUser } from "@/interfaces/user";

interface IInitialValues {
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  class?: string;
  status: string;
}

const initialEventValues: IInitialValues = {
  name: "",
  description: "",
  startDate: null,
  endDate: null,
  class: "",
  status: "pending",
};

const useEventFormFeatures = () => {
  const { t } = useTranslation();
  const user = useAuthUser() as TUser;
  const { getAllClasssUnpaginated } = useClassService();
  const { createEvent, updateEvent, getEventById } = useEventsService();

  const { handleCloseEventModal } = useEventFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.eventFormModal
  );

  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });
  const [initialValues, setInitialValues] =
    useState<IInitialValues>(initialEventValues);

  const { data: eventData, isLoading: isEventDataLoading } = getEventById;

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    if (eventData && !isEventDataLoading) {
      const formattedStartDate = new Date(eventData.startDate);
      const formattedEndDate = new Date(eventData.endDate);

      setInitialValues({
        name: eventData.name || "",
        description: eventData.description || "",
        startDate: formattedStartDate || null,
        endDate: formattedEndDate || null,
        class: eventData.class ? eventData.class?._id : "all",
        status: eventData.status || "pending",
      });
    } else {
      setInitialValues(initialEventValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, [eventData, isEventDataLoading]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      const payload = {
        ...values,
        createdBy: user?._id,
        createdByModel: user?.role,
      };

      if (values.class === "all") {
        delete payload.class;
      }

      if (modalType === "event") {
        const mutation = actionType === "add" ? createEvent : updateEvent;
        await mutation.mutateAsync(payload);
      }

      // Reset form and close modal
      resetForm();
      handleCloseEventModal();
    } catch (error: any) {
      // Enhanced error handling
      let errorMessage = "Something went wrong. Please try again later!";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && "response" in error && error.response?.data?.errors) {
        errorMessage = error.response.data.errors;
      }

      setState({ loading: false, error: errorMessage });
      handleValidationError(error);
      toast({ title: errorMessage });
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  // Compute whether form values are changed
  const isFormChanged = (values: IInitialValues): boolean => {
    return !isEqual(values, initialValues);
  };

  const { data: classData, isLoading: isClassDataLoading } =
    getAllClasssUnpaginated;

  const classOptions = [
    {
      value: "all",
      label: t("data-table.general"),
    },
    ...(classData?.map(({ _id, name }: IClass) => ({
      value: _id,
      label: `${name} ${t("data-table.columns.class")}`,
    })) || []),
  ];

  return {
    loading: state.loading,
    error: state.error,
    isFormChanged,
    initialValues,
    handleFormSubmit,
    isClassDataLoading,
    classOptions,
    isEventDataLoading,
  };
};

export default useEventFormFeatures;
