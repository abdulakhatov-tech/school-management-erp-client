import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { toast } from "@/hooks/use-toast";
import { IClass } from "@/interfaces/class";
import { ITeacher } from "@/interfaces/user";
import { ISubject } from "@/interfaces/subject";
import { useAppSelector } from "@/hooks/useRedux";
import { useClassService } from "@/services/classes";
import { useLessonService } from "@/services/lessons";
import { useSubjectService } from "@/services/subjects";
import { useTeacherService } from "@/services/users/teachers";
import { handleValidationError } from "@/helpers/validation-error";
import useLessonFormModalFeatures from "@/components/modals/customs/LessonFormModal/features";

interface IInitialValues {
  name: string;
  class: string;
  teacher: string;
  subject: string;
  day: string;
  startTime: string;
  endTime: string;
  //   videos: string[];
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
}

const initialLessonValues: IInitialValues = {
  name: "",
  class: "",
  teacher: "",
  subject: "",
  day: "",
  startTime: "",
  endTime: "",
  status: "scheduled",
};

const useLessonFormFeatures = () => {
  const { t } = useTranslation();

  const { getAllClasssUnpaginated } = useClassService();
  const { getAllTeachersUnpaginated } = useTeacherService();
  const { getAllSubjectsUnpaginated } = useSubjectService();
  const { createLesson, updateLesson, getLessonById } = useLessonService();

  const { handleCloseLessonModal } = useLessonFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.lessonFormModal
  );

  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });
  const [initialValues, setInitialValues] =
    useState<IInitialValues>(initialLessonValues);

  const { data: lessonData, isLoading: isLessonDataLoading } = getLessonById;

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    if (lessonData && !isLessonDataLoading) {
      setInitialValues({
        name: lessonData.name || "",
        class: lessonData.class._id || "",
        teacher: lessonData.teacher._id || "",
        subject: lessonData.subject._id || "",
        day: lessonData.day || "",
        startTime: lessonData.startTime || "",
        endTime: lessonData.endTime || "",
        status: lessonData.status || "scheduled",
      });
    } else {
      setInitialValues(initialLessonValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, [lessonData, isLessonDataLoading]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      const payload = { ...values };

      if (modalType === "lesson") {
        const mutation = actionType === "add" ? createLesson : updateLesson;
        await mutation.mutateAsync(payload);
      }

      // Reset form and close modal
      resetForm();
      handleCloseLessonModal();
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

  // Fetch class
  const { data: classData, isLoading: isClassDataLoading } =
    getAllClasssUnpaginated;

  const classOptions = classData?.map((item: IClass) => ({
    value: item._id,
    label: item.name,
  }));

  // Fetch teacher
  const { data: teacherData, isLoading: isTeacherDataLoading } =
    getAllTeachersUnpaginated;

  const teacherOptions = teacherData?.map((item: ITeacher) => ({
    value: item._id,
    label: item.fullName,
  }));

  // Fetch subject
  const { data: subjectData, isLoading: isSubjectDataLoading } =
    getAllSubjectsUnpaginated;

  const subjectOptions = subjectData?.map((item: ISubject) => ({
    value: item._id,
    label: t(`subjects.${item.name}`, item.name),
  }));

  return {
    loading: state.loading,
    error: state.error,
    handleFormSubmit,
    initialValues,
    isFormChanged,
    classOptions,
    isClassDataLoading,
    teacherOptions,
    isTeacherDataLoading,
    subjectOptions,
    isSubjectDataLoading,
    isLessonDataLoading,
  };
};

export default useLessonFormFeatures;
