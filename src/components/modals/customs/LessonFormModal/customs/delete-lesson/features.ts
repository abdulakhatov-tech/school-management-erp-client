import { useNavigate } from "react-router-dom";

import useLessonFormModalFeatures from "../../features";
import { useLessonService } from "@/services/lessons";
import { useAppSelector } from "@/hooks/useRedux";

const useDeleteLessonFeatures = () => {
  const navigate = useNavigate();
  const { modalType, actionType, dataId } = useAppSelector(
    (state) => state.lessonFormModal
  );
  const { handleCloseLessonModal } = useLessonFormModalFeatures();

  const { deleteLesson } = useLessonService();

  const handleDeleteLesson = async () => {
    if (!dataId || actionType !== "delete" || !modalType) return;

    await deleteLesson.mutateAsync();
    navigate(`/list/lessons`);
    handleCloseLessonModal();
  };

  return { handleDeleteLesson, handleCloseLessonModal };
};

export default useDeleteLessonFeatures;
