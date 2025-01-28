import { isEqual } from "lodash";
import { useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks/useRedux";
import { useTeacherService } from "@/services/users/teachers";
import { handleValidationError } from "@/helpers/validation-error";
import useUserFormModalFeatures from "@/components/modals/customs/UserFormModal/features";
import { useClassService } from "@/services/classes";
import { IClass } from "@/interfaces/class";
import { useSubjectService } from "@/services/subjects";
import { ISubject } from "@/interfaces/subject";

interface IInitialValues {
  fullName: string;
  username: string;
  password: string;
  phoneNumber: string;
  gender: "male" | "female" | "";
  birthday: Date | null;
  address: string;
  profilePhoto: string;
  email?: string;
  status: string;
  primaryClass: string;
  subjects: string[];
  assignedClasses: string[];
}

const initialTeacherValues: IInitialValues = {
  fullName: "",
  username: "",
  password: "",
  phoneNumber: "",
  gender: "",
  birthday: null,
  address: "",
  profilePhoto: "",
  email: "",
  status: "pending",
  primaryClass: "",
  subjects: [],
  assignedClasses: [],
};

const useTeachersFormFeatures = () => {
  const { getAllClasssUnpaginated } = useClassService();
  const { getAllSubjectsUnpaginated } = useSubjectService();
  const { createTeacher, getTeacherById, updateTeacher } = useTeacherService();
  const { handleCloseUserModal } = useUserFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.userFormModal
  );

  // state
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });
  const [initialValues, setInitialValues] =
    useState<IInitialValues>(initialTeacherValues);

  const { data: teacherData, isLoading: isTeacherDataLoading } = getTeacherById;

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    if (teacherData && !isTeacherDataLoading) {
      setInitialValues({
        fullName: teacherData.fullName || "",
        username: teacherData.username || "",
        password: teacherData.password || "",
        phoneNumber: teacherData.phoneNumber || "",
        gender: teacherData.gender || "",
        birthday: teacherData.birthday || null,
        address: teacherData.address || "",
        profilePhoto: teacherData.profilePhoto || "",
        email: teacherData.email || "",
        status: teacherData.status || "pending",
        primaryClass: teacherData.primaryClass || "",
        subjects: teacherData.subjects || [],
        assignedClasses: teacherData.assignedClasses || [],
      });
    } else {
      setInitialValues(initialTeacherValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, [teacherData, isTeacherDataLoading]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      const payload = { ...values };
      if (!values.email) delete payload.email; // Exclude email if empty

      if (values.email) payload.email = values.email;

      if (modalType === "teacher") {
        const mutation = actionType === "add" ? createTeacher : updateTeacher;
        await mutation.mutateAsync(payload);
      }

      // Reset form and close modal
      resetForm();
      handleCloseUserModal();
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

  const { data: classesData, isLoading: isClassesDataLoading } =
    getAllClasssUnpaginated;

  const classOptions = classesData?.map((item: IClass) => ({
    value: item._id,
    label: item.name,
  }));

  const { data: subjectsData, isLoading: isSubjectsDataLoading } =
    getAllSubjectsUnpaginated;

  const subjectOptions = subjectsData?.map((item: ISubject) => ({
    value: item._id,
    label: item.name,
  }));

  return {
    loading: state.loading,
    error: state.error,
    isTeacherDataLoading,
    handleFormSubmit,
    initialValues,
    isFormChanged,
    classOptions,
    isClassesDataLoading,
    subjectOptions,
    isSubjectsDataLoading,
  };
};

export default useTeachersFormFeatures;
