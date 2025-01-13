import { isEqual } from "lodash";
import { useEffect, useState } from "react";

import { IRoom } from "@/interfaces/room";
import { toast } from "@/hooks/use-toast";
import { ITeacher } from "@/interfaces/user";
import { useAppSelector } from "@/hooks/useRedux";
import { useRoomService } from "@/services/rooms";
import { useClassService } from "@/services/classes";
import { useTeacherService } from "@/services/users/teachers";
import useClassFormModalFeatures from "@/components/modals/customs/ClassFormModal/features";
import { handleValidationError } from "@/helpers/validation-error";

interface IInitialValues {
  name: string;
  status: string;
  teacher: string;
  room: string;
}

const initialClassValues: IInitialValues = {
  name: "",
  status: "pending",
  teacher: "",
  room: "",
};

const useClassFormFeatures = () => {
  const { getAllRoomsUnpaginated } = useRoomService();
  const { getAllTeachersUnpaginated } = useTeacherService();
  const { createClass, updateClass, getClassById } = useClassService();

  const { handleCloseClassModal } = useClassFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.classFormModal
  );

  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });
  const [initialValues, setInitialValues] =
    useState<IInitialValues>(initialClassValues);

  const { data: classData, isLoading: isClassDataLoading } = getClassById;

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    if (classData && !isClassDataLoading) {
      setInitialValues({
        name: classData.name || "",
        status: classData.status || "pending",
        teacher: classData.teacher._id || "",
        room: classData.room._id || "",
      });
    } else {
      setInitialValues(initialClassValues);
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, [classData, isClassDataLoading]);

  const handleFormSubmit = async (
    values: IInitialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setState({ loading: true, error: null });

      const payload = { ...values };

      if (modalType === "class") {
        const mutation = actionType === "add" ? createClass : updateClass;
        await mutation.mutateAsync(payload);
      }

      // Reset form and close modal
      resetForm();
      handleCloseClassModal();
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

  // rooms
  const { data: roomsData, isLoading: isRoomsDataLoading } =
    getAllRoomsUnpaginated;

  const rooms_options = roomsData?.map((room: IRoom) => ({
    label: room.name,
    value: room._id,
  }));

  // teachers
  const { data: teachersData, isLoading: isTeachersDataLoading } =
    getAllTeachersUnpaginated;

  const teachers_options = teachersData?.map((teacher: ITeacher) => ({
    label: teacher.fullName,
    value: teacher._id,
  }));

  return {
    loading: state.loading,
    error: state.error,
    isRoomsDataLoading,
    isClassDataLoading,
    handleFormSubmit,
    initialValues,
    isFormChanged,
    rooms_options,
    teachers_options,
    isTeachersDataLoading,
  };
};

export default useClassFormFeatures;
