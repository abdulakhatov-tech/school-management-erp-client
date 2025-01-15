import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useRedux";
import { resetLessonFormModal } from "@/store/slices/lesson-form-modal";

const useLessonFormModalFeatures = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseLessonModal = () => {
    dispatch(resetLessonFormModal());

    searchParams.delete("lessonId");
    setSearchParams(searchParams);
  };

  return {
    handleCloseLessonModal,
  };
};

export default useLessonFormModalFeatures;
