import { useNavigate } from "react-router-dom";

import noUser from "@/assets/icons/no-user.svg";
import { useAppSelector } from "@/hooks/useRedux";
import useSubjectFormModalFeatures from "../../features";
import { useSubjectService } from "@/services/subjects";

const useDeleteSubjectFeatures = () => {
  const navigate = useNavigate();
  const { modalType, actionType, dataId } = useAppSelector(
    (state) => state.subjectFormModal
  );
  const { handleCloseSubjectModal } = useSubjectFormModalFeatures();

  const { deleteSubject } = useSubjectService();

  const handleDeleteSubject = async () => {
    if (!dataId || actionType !== "delete" || !modalType) return;

    await deleteSubject.mutateAsync();
    navigate(`/list/subjects`);
    handleCloseSubjectModal();
  };

  // Handle image error and set fallback icon
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = noUser;
  };

  return { handleDeleteSubject, handleCloseSubjectModal, handleImageError };
};

export default useDeleteSubjectFeatures;
