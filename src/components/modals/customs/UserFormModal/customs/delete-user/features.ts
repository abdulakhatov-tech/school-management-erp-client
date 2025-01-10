import noUser from "@/assets/icons/no-user.svg";
import { useAppSelector } from "@/hooks/useRedux";
import useUserFormModalFeatures from "../../features";
import { useAdminService } from "@/services/users/admins";
import { useStudentService } from "@/services/users/students";
import { useParentsService } from "@/services/users/parents";
import { useTeacherService } from "@/services/users/teachers";

const useDeleteUserFeatures = () => {
  const { modalType, actionType, dataId } = useAppSelector(
    (state) => state.userFormModal
  );
  const { handleCloseUserModal } = useUserFormModalFeatures();

  const { deleteAdmin } = useAdminService();
  const { deleteTeacher } = useTeacherService();
  const { deleteStudent } = useStudentService();
  const { deleteParent } = useParentsService();

  // Mapping modalType to delete functions
  const deleteActions: Record<string, (() => Promise<void>) | undefined> = {
    admin: deleteAdmin.mutateAsync,
    teacher: deleteTeacher.mutateAsync,
    student: deleteStudent.mutateAsync,
    parent: deleteParent.mutateAsync,
  };

  const handleClose = () => {
    handleCloseUserModal();
  };

  const handleDeleteUser = async () => {
    if (!dataId || actionType !== "delete" || !modalType) return;

    const deleteAction = deleteActions[modalType];
    if (deleteAction) {
      try {
        await deleteAction();
        handleClose();
      } catch (error) {
        console.error(`Failed to delete ${modalType}:`, error);
      }
    }
  };

  // Handle image error and set fallback icon
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = noUser;
  };

  return {
    modalType,
    handleClose,
    handleDeleteUser,
    handleImageError,
  };
};

export default useDeleteUserFeatures;
