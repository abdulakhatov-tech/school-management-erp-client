import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/hooks/useRedux";
import { useResultService } from "@/services/results";
import useResultFormModalFeatures from "../../features";

const useDeleteResultFeatures = () => {
  const navigate = useNavigate();
  const { modalType, actionType, dataId } = useAppSelector(
    (state) => state.resultFormModal
  );
  const { handleCloseResultModal } = useResultFormModalFeatures();

  const { deleteResult } = useResultService();

  const handleDeleteResult = async () => {
    if (!dataId || actionType !== "delete" || !modalType) return;

    await deleteResult.mutateAsync();
    navigate(`/list/results`);
    handleCloseResultModal();
  };

  return { handleDeleteResult, handleCloseResultModal };
};

export default useDeleteResultFeatures;
