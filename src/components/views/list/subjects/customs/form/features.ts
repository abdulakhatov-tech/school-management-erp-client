import useSubjectFormModalFeatures from "@/components/modals/customs/SubjectFormModal/features";
import { handleValidationError } from "@/helpers/validation-error";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks/useRedux";
import { useSubjectService } from "@/services/subjects";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";

interface IInitialValues {
  name: string;
  imgUrl: string;
  description: string;
  status: "active" | "inactive" | "pending";
}

const initialSubjectValues: IInitialValues = {
  name: "",
  imgUrl: "",
  description: "",
  status: "pending",
};

const useSubjectFormFeatures = () => {
  const { createSubject, updateSubject, getSubjectById } = useSubjectService();

  const { handleCloseSubjectModal } = useSubjectFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.subjectFormModal
  );

  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });
  const [initialValues, setInitialValues] =
    useState<IInitialValues>(initialSubjectValues);

  const { data: subjectData, isLoading: isSubjectDataLoading } = getSubjectById;

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    if (subjectData && !isSubjectDataLoading) {
      setInitialValues({
        name: subjectData.name || "",
        imgUrl: subjectData.imgUrl || "",
        description: subjectData.description || "",
        status: subjectData.status || "pending",
      });
    } else {
      setInitialValues(initialSubjectValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, [subjectData, isSubjectDataLoading]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      const payload = { ...values };

      if (modalType === "subject") {
        const mutation = actionType === "add" ? createSubject : updateSubject;
        await mutation.mutateAsync(payload);
      }

      // Reset form and close modal
      resetForm();
      handleCloseSubjectModal();
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

  return {
    loading: state.loading,
    isSubjectDataLoading,
    error: state.error,
    handleFormSubmit,
    initialValues,
    isFormChanged,
  };
};

export default useSubjectFormFeatures;
