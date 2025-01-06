import { isEqual } from "lodash";
import { useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks/useRedux";
import { useAdminService } from "@/services/users/admins";
import { handleValidationError } from "@/helpers/validation-error";
import useUserFormModalFeatures from "@/components/modals/customs/UserFormModal/features";

interface IInitialValues {
  fullName: string;
  username: string;
  password: string;
  phoneNumber: string;
  gender: "male" | "female" | "";
  birthday: Date | null;
  address: string;
  profilePhoto: string;
  email: string;
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

const useAdminsFormFeatures = () => {
  const { createAdmin, getAdminById, updateAdmin } = useAdminService();
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
    useState<IInitialValues>(initialAdminValues);

  const { data: adminData, isLoading: isAdminDataLoading } = getAdminById;

  useEffect(() => {
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
  }, [adminData, isAdminDataLoading]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      if (modalType === "admin" && actionType === "add") {
        await createAdmin.mutateAsync(values);
      }
      if (modalType === "admin" && actionType === "edit") {
        await updateAdmin.mutateAsync(values);
      }

      // Reset form and close modal
      resetForm();
      handleCloseUserModal();
    } catch (error: any) {
      // Enhanced error handling
      let errorMessage = "Something went wrong. Please try again later.";
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
    error: state.error,
    isAdminDataLoading,
    handleFormSubmit,
    initialValues,
    isFormChanged,
  };
};

export default useAdminsFormFeatures;
