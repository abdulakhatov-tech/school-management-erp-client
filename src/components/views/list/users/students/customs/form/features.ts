import { isEqual } from "lodash";
import { useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks/useRedux";
import { useStudentService } from "@/services/users/students";
import { useClassService } from "@/services/classes";
import { handleValidationError } from "@/helpers/validation-error";
import useUserFormModalFeatures from "@/components/modals/customs/UserFormModal/features";
import { IClass } from "@/interfaces/class";

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
  class: string;
}

const initialStudentValues: IInitialValues = {
  fullName: "",
  username: "",
  password: "",
  phoneNumber: "",
  gender: "",
  birthday: null,
  address: "",
  profilePhoto: "",
  email: "",
  status: "enrolled",
  class: "",
};

const useStudentsFormFeatures = () => {
  const { getAllClasssUnpaginated } = useClassService();
  const { createStudent, getStudentById, updateStudent } = useStudentService();
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
    useState<IInitialValues>(initialStudentValues);

  const { data: studentData, isLoading: isStudentDataLoading } = getStudentById;

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    if (studentData && !isStudentDataLoading) {
      setInitialValues({
        fullName: studentData.fullName || "",
        username: studentData.username || "",
        password: studentData.password || "",
        phoneNumber: studentData.phoneNumber || "",
        gender: studentData.gender || "",
        birthday: studentData.birthday || null,
        address: studentData.address || "",
        profilePhoto: studentData.profilePhoto || "",
        email: studentData.email || "",
        status: studentData.status || "pending",
        class: studentData.class?.toString() || "",
      });
    } else {
      setInitialValues(initialStudentValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, [studentData, isStudentDataLoading]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      const payload = { ...values };
      if (!values.email) delete payload.email; // Exclude email if empty

      if (values.email) payload.email = values.email;

      if (modalType === "student") {
        const mutation = actionType === "add" ? createStudent : updateStudent;
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

  const classOptions = classesData?.map(({ _id, name }: IClass) => ({
    value: _id,
    label: name,
  }));

  return {
    loading: state.loading,
    error: state.error,
    isStudentDataLoading,
    handleFormSubmit,
    initialValues,
    isFormChanged,
    classOptions,
    isClassesDataLoading,
  };
};

export default useStudentsFormFeatures;
