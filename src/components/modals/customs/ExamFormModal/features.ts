import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useRedux";
import { resetExamFormModal } from "@/store/slices/exam-form-modal";

const useExamFormModalFeatures = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseExamModal = () => {
    dispatch(resetExamFormModal());

    searchParams.delete("examId");
    setSearchParams(searchParams);
  };

  return {
    handleCloseExamModal,
  };
};

export default useExamFormModalFeatures;
