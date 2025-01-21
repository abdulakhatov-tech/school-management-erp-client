import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import useAnnouncementFormModalFeatures from "@/components/modals/customs/AnnouncementFormModal/features";
import { handleValidationError } from "@/helpers/validation-error";
import { useAnnouncementsService } from "@/services/announcements";
import { useClassService } from "@/services/classes";
import { useAppSelector } from "@/hooks/useRedux";
import { IClass } from "@/interfaces/class";
import { toast } from "@/hooks/use-toast";
import { TUser } from "@/interfaces/user";

interface IInitialValues {
  name: string;
  description: string;
  date: Date | null;
  class?: string;
  status: string;
}

const initialAnnouncementValues: IInitialValues = {
  name: "",
  description: "",
  date: null,
  class: "",
  status: "pending",
};

const useAnnouncementFormFeatures = () => {
  const { t } = useTranslation();
  const user = useAuthUser() as TUser;
  const { getAllClasssUnpaginated } = useClassService();
  const { createAnnouncement, updateAnnouncement, getAnnouncementById } =
    useAnnouncementsService();

  const { handleCloseAnnouncementModal } = useAnnouncementFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.announcementFormModal
  );

  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });
  const [initialValues, setInitialValues] = useState<IInitialValues>(
    initialAnnouncementValues
  );

  const { data: announcementData, isLoading: isAnnouncementDataLoading } =
    getAnnouncementById;

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    if (announcementData && !isAnnouncementDataLoading) {
      const formattedDate = new Date(announcementData.date);

      setInitialValues({
        name: announcementData.name || "",
        description: announcementData.description || "",
        date: formattedDate || null,
        class: announcementData.class ? announcementData.class?._id : "all",
        status: announcementData.status || "pending",
      });
    } else {
      setInitialValues(initialAnnouncementValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, [announcementData, isAnnouncementDataLoading]);

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

      if (modalType === "announcement") {
        const mutation =
          actionType === "add" ? createAnnouncement : updateAnnouncement;
        await mutation.mutateAsync(payload);
      }

      // Reset form and close modal
      resetForm();
      handleCloseAnnouncementModal();
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
    isAnnouncementDataLoading,
  };
};

export default useAnnouncementFormFeatures;
