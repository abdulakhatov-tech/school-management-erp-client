import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { toast } from "@/hooks/use-toast";
import { TUser } from "@/interfaces/user";
import { useStudentService } from "@/services/users/students";
import { handleValidationError } from "@/helpers/validation-error";

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
  class: {
    _id: string;
    name: string;
  };
  bio: string;
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
  status: "pending",
  bio: "",
  class: {
    _id: "",
    name: "",
  },
};

const useProfilePageFeatures = () => {
  const user = useAuthUser() as TUser;
  const [searchParams, setSearchParams] = useSearchParams();
  const { getStudentById, updateStudent } = useStudentService();

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
    searchParams.set(`studentId`, user?._id);
    setSearchParams(searchParams);

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
        bio: studentData.bio || "",
        class: studentData.class || "",
      });
    } else {
      setInitialValues(initialStudentValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentData, isStudentDataLoading, user?._id]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      const payload = { ...values, class: values.class._id };
      if (!values.email) delete payload.email; // Exclude email if empty

      if (values.email) payload.email = values.email;

      if (user.role === "student") {
        await updateStudent.mutateAsync(payload);
      }

      // Reset form and close modal
      resetForm();
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

  const handleCancel = (resetForm: () => void) => {
    // Reset the form to the initial values
    resetForm();

    // Optional: Provide user feedback or navigate
    toast({ title: "Changes discarded", description: "No updates were made." });
  };

  // Compute whether form values are changed
  const isFormChanged = (values: IInitialValues): boolean => {
    return !isEqual(values, initialValues);
  };

  return {
    loading: state.loading,
    error: state.error,
    isStudentDataLoading,
    handleFormSubmit,
    initialValues,
    isFormChanged,
    handleCancel,
  };
};

export default useProfilePageFeatures;
