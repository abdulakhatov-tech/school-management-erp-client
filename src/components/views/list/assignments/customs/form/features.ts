import { isEqual } from "lodash";
import { useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { ILesson } from "@/interfaces/lesson";
import { useAppSelector } from "@/hooks/useRedux";
import { useAssignmentService } from "@/services/assignments";
import { useLessonService } from "@/services/lessons";
import { handleValidationError } from "@/helpers/validation-error";
import useAssignmentFormModalFeatures from "@/components/modals/customs/AssignmentFormModal/features";

interface IInitialValues {
  name: string;
  lesson: string;
  startDate: string;
  dueDate: string;
}

const initialAssignmentValues: IInitialValues = {
  name: "",
  lesson: "",
  startDate: "",
  dueDate: "",
};

const useAssignmentFormFeatures = () => {
  const { getAllLessonsUnpaginated } = useLessonService();
  const { createAssignment, updateAssignment, getAssignmentById } =
    useAssignmentService();

  const { handleCloseAssignmentModal } = useAssignmentFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.assignmentFormModal
  );

  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });
  const [initialValues, setInitialValues] = useState<IInitialValues>(
    initialAssignmentValues
  );

  const { data: assignmentData, isLoading: isAssignmentDataLoading } =
    getAssignmentById;

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    if (assignmentData && !isAssignmentDataLoading) {
      setInitialValues({
        name: assignmentData.name || "",
        lesson: assignmentData.lesson._id || "",
        startDate: assignmentData.startDate || "",
        dueDate: assignmentData.dueDate || "",
      });
    } else {
      setInitialValues(initialAssignmentValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, [assignmentData, isAssignmentDataLoading]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      const payload = { ...values };

      if (modalType === "assignment") {
        const mutation =
          actionType === "add" ? createAssignment : updateAssignment;
        await mutation.mutateAsync(payload);
      }

      // Reset form and close modal
      resetForm();
      handleCloseAssignmentModal();
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

  // fetching lessons data
  const { data: lessonsData, isLoading: isLessonsDataLoading } =
    getAllLessonsUnpaginated;

  const lesson_options = lessonsData?.data?.map((lesson: ILesson) => ({
    label: lesson.name,
    value: lesson._id,
  }));

  return {
    loading: state.loading,
    error: state.error,
    isFormChanged,
    initialValues,
    lesson_options,
    handleFormSubmit,
    isLessonsDataLoading,
    isAssignmentDataLoading,
  };
};

export default useAssignmentFormFeatures;
