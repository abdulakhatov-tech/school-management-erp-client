import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/hooks/useRedux";
import { useAssignmentService } from "@/services/assignments";
import useAssignmentFormModalFeatures from "../../features";

const useDeleteAssignmentFeatures = () => {
  const navigate = useNavigate();
  const { modalType, actionType, dataId } = useAppSelector(
    (state) => state.assignmentFormModal
  );
  const { handleCloseAssignmentModal } = useAssignmentFormModalFeatures();

  const { deleteAssignment } = useAssignmentService();

  const handleDeleteAssignment = async () => {
    if (!dataId || actionType !== "delete" || !modalType) return;

    await deleteAssignment.mutateAsync();
    navigate(`/list/assignments`);
    handleCloseAssignmentModal();
  };

  return { handleDeleteAssignment, handleCloseAssignmentModal };
};

export default useDeleteAssignmentFeatures;
