import { isEqual } from "lodash";
import { useEffect, useState } from "react";

import { ILesson } from "@/interfaces/lesson";
import { useAppSelector } from "@/hooks/useRedux";
import { useExamService } from "@/services/exams";
import { useLessonService } from "@/services/lessons";
import useExamFormModalFeatures from "@/components/modals/customs/ExamFormModal/features";
import { handleValidationError } from "@/helpers/validation-error";
import { toast } from "@/hooks/use-toast";

interface IInitialValues {
  name: string;
  lesson: string;
  startTime: string;
  endTime: string;
}

const initialExamValues: IInitialValues = {
  name: "",
  lesson: "",
  startTime: "",
  endTime: "",
};

const useExamFormFeatures = () => {
  const { getAllLessonsUnpaginated } = useLessonService();
  const { createExam, updateExam, getExamById } = useExamService();

  const { handleCloseExamModal } = useExamFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.examFormModal
  );

  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });
  const [initialValues, setInitialValues] =
    useState<IInitialValues>(initialExamValues);

  const { data: examData, isLoading: isExamDataLoading } = getExamById;

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    if (examData && !isExamDataLoading) {
      setInitialValues({
        name: examData.name || "",
        lesson: examData.lesson._id || "",
        startTime: examData.startTime || "",
        endTime: examData.endTime || "",
      });
    } else {
      setInitialValues(initialExamValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, [examData, isExamDataLoading]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      const payload = { ...values };

      if (modalType === "exam") {
        const mutation = actionType === "add" ? createExam : updateExam;
        await mutation.mutateAsync(payload);
      }

      // Reset form and close modal
      resetForm();
      handleCloseExamModal();
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
    isExamDataLoading,
  };
};

export default useExamFormFeatures;
