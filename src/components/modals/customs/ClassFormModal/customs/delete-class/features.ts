import { useNavigate } from "react-router-dom";

import useClassFormModalFeatures from "../../features";
import { useClassService } from "@/services/classes";
import { useAppSelector } from "@/hooks/useRedux";

const useDeleteClassFeatures = () => {
  const navigate = useNavigate();
  const { modalType, actionType, dataId } = useAppSelector(
    (state) => state.classFormModal
  );
  const { handleCloseClassModal } = useClassFormModalFeatures();

  const { deleteClass } = useClassService();

  const handleDeleteClass = async () => {
    if (!dataId || actionType !== "delete" || !modalType) return;

    await deleteClass.mutateAsync();
    navigate(`/list/classes`);
    handleCloseClassModal();
  };

  return { handleDeleteClass, handleCloseClassModal };
};

export default useDeleteClassFeatures;
