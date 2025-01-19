import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useRedux";
import { resetResultFormModal } from "@/store/slices/result-form-modal";

const useResultFormModalFeatures = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseResultModal = () => {
    dispatch(resetResultFormModal());

    searchParams.delete("resultId");
    setSearchParams(searchParams);
  };

  return {
    handleCloseResultModal,
  };
};

export default useResultFormModalFeatures;
