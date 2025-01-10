import { isEqual } from "lodash";
import { useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { IStudent } from "@/interfaces/user";
import { useAppSelector } from "@/hooks/useRedux";
import { useParentsService } from "@/services/users/parents";
import { useStudentService } from "@/services/users/students";
import { handleValidationError } from "@/helpers/validation-error";
import useUserFormModalFeatures from "@/components/modals/customs/UserFormModal/features";

interface IInitialValues {
  fullName: string;
  username: string;
  password: string;
  phoneNumber: string;
  email?: string;
  status: string;
  children: string[];
}

const initialParentValues: IInitialValues = {
  fullName: "",
  username: "",
  password: "",
  phoneNumber: "",
  email: "",
  status: "active",
  children: [],
};

const useStudentsFormFeatures = () => {
  const { getAllStudentsUnpaginated } = useStudentService();
  const { createParent, getParentById, updateParent } = useParentsService();
  const { handleCloseUserModal } = useUserFormModalFeatures();
  const { modalType, actionType, dataId } = useAppSelector(
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
    useState<IInitialValues>(initialParentValues);

  const { data: parentData, isLoading: isParentDataLoading } = getParentById;

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    if (parentData && !isParentDataLoading) {
      setInitialValues({
        fullName: parentData.fullName || "",
        username: parentData.username || "",
        password: parentData.password || "",
        phoneNumber: parentData.phoneNumber || "",
        email: parentData.email || "",
        status: parentData.status || "active",
        children: parentData.children || [],
      });
    } else {
      setInitialValues(initialParentValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, [parentData, isParentDataLoading]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      const payload = { ...values };
      if (!values.email) delete payload.email; // Exclude email if empty

      if (values.email) payload.email = values.email;

      if (modalType === "parent") {
        const mutation = actionType === "add" ? createParent : updateParent;
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

  const { data: studentsData, isLoading: isStudentsDataLoading } =
    getAllStudentsUnpaginated;

  const studentOptions = studentsData
    ?.filter((item: IStudent) => {
      if (actionType === "add") {
        // Exclude students who already have a parent
        return !item.parent?._id;
      } else if (actionType === "edit") {
        // Include students matching the dataId or those without a parent
        return item?.parent?._id === dataId || !item?.parent?._id;
      }
      return false;
    })
    ?.map(({ _id, fullName }: IStudent) => ({
      value: _id,
      label: fullName,
    }));

  return {
    loading: state.loading,
    error: state.error,
    isParentDataLoading,
    handleFormSubmit,
    initialValues,
    isFormChanged,
    studentOptions,
    isStudentsDataLoading,
  };
};

export default useStudentsFormFeatures;
