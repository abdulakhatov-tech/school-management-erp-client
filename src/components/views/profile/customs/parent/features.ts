import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { TUser } from "@/interfaces/user";
import { toast } from "@/hooks/use-toast";
import { useParentsService } from "@/services/users/parents";
import { handleValidationError } from "@/helpers/validation-error";

interface IInitialValues {
  fullName: string;
  username: string;
  password: string;
  phoneNumber: string;
  profilePhoto: string;
  email?: string;
  status: string;
  children: any[];
}

const initialParentValues: IInitialValues = {
  fullName: "",
  username: "",
  password: "",
  phoneNumber: "",
  profilePhoto: "",
  email: "",
  status: "pending",
  children: [],
};

const useProfilePageFeatures = () => {
  const user = useAuthUser() as TUser;
  const [searchParams, setSearchParams] = useSearchParams();
  const { getParentById, updateParent } = useParentsService();

  // state
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });
  const [initialValues, setInitialValues] =
    useState<IInitialValues>(initialParentValues);

  const { data: parentData, isLoading: isParentDataLoading } = getParentById;

  useEffect(() => {
    searchParams.set(`parentId`, user?._id);
    setSearchParams(searchParams);

    setState((prev) => ({ ...prev, loading: true }));
    if (parentData && !isParentDataLoading) {
      setInitialValues({
        fullName: parentData.fullName || "",
        username: parentData.username || "",
        password: parentData.password || "",
        phoneNumber: parentData.phoneNumber || "",
        profilePhoto: parentData.profilePhoto || "",
        email: parentData.email || "",
        status: parentData.status || "pending",
        children: parentData.children || [],
      });
    } else {
      setInitialValues(initialParentValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentData, isParentDataLoading, user?._id]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      const payload = {
        ...values,
        children: values?.children?.map((item) => item?._id),
      };
      if (!values.email) delete payload.email; // Exclude email if empty

      if (values.email) payload.email = values.email;

      if (user.role === "parent") {
        await updateParent.mutateAsync(payload);
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
    isParentDataLoading,
    handleFormSubmit,
    initialValues,
    isFormChanged,
    handleCancel,
  };
};

export default useProfilePageFeatures;
