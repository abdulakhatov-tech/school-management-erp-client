import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { TUser } from "@/interfaces/user";
import { toast } from "@/hooks/use-toast";
import { useAdminService } from "@/services/users/admins";
import { handleValidationError } from "@/helpers/validation-error";
import { useSearchParams } from "react-router-dom";

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
}

const initialAdminValues: IInitialValues = {
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
};

const useProfilePageFeatures = () => {
  const user = useAuthUser() as TUser;
  const [searchParams, setSearchParams] = useSearchParams();
  const { getAdminById, updateAdmin } = useAdminService();

  // state
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });
  const [initialValues, setInitialValues] =
    useState<IInitialValues>(initialAdminValues);

  const { data: adminData, isLoading: isAdminDataLoading } = getAdminById;

  useEffect(() => {
    searchParams.set(`adminId`, user?._id);
    setSearchParams(searchParams);

    setState((prev) => ({ ...prev, loading: true }));
    if (adminData && !isAdminDataLoading) {
      setInitialValues({
        fullName: adminData.fullName || "",
        username: adminData.username || "",
        password: adminData.password || "",
        phoneNumber: adminData.phoneNumber || "",
        gender: adminData.gender || "",
        birthday: adminData.birthday || null,
        address: adminData.address || "",
        profilePhoto: adminData.profilePhoto || "",
        email: adminData.email || "",
        status: adminData.status || "pending",
      });
    } else {
      setInitialValues(initialAdminValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminData, isAdminDataLoading, user?._id]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      const payload = { ...values };
      if (!values.email) delete payload.email; // Exclude email if empty

      if (values.email) payload.email = values.email;

      if (user.role === "admin" || user.role === "super-admin") {
        await updateAdmin.mutateAsync(payload);
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
    isAdminDataLoading,
    handleFormSubmit,
    initialValues,
    isFormChanged,
    handleCancel,
  };
};

export default useProfilePageFeatures;
