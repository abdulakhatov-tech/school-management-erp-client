import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/hooks/useRedux";
import { useExamService } from "@/services/exams";
import useExamFormModalFeatures from "../../features";

const useDeleteExamFeatures = () => {
  const navigate = useNavigate();
  const { modalType, actionType, dataId } = useAppSelector(
    (state) => state.examFormModal
  );
  const { handleCloseExamModal } = useExamFormModalFeatures();

  const { deleteExam } = useExamService();

  const handleDeleteExam = async () => {
    if (!dataId || actionType !== "delete" || !modalType) return;

    await deleteExam.mutateAsync();
    navigate(`/list/exams`);
    handleCloseExamModal();
  };

  return { handleDeleteExam, handleCloseExamModal };
};

export default useDeleteExamFeatures;
