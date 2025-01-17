import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useRedux";
import { resetSubjectFormModal } from "@/store/slices/subject-form-modal";

const useSubjectFormModalFeatures = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseSubjectModal = () => {
    dispatch(resetSubjectFormModal());

    searchParams.delete("subjectId");
    setSearchParams(searchParams);
  };

  return {
    handleCloseSubjectModal,
  };
};

export default useSubjectFormModalFeatures;
