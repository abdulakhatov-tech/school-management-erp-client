import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useRedux";
import { resetClassFormModal } from "@/store/slices/class-form-modal";

const useClassFormModalFeatures = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseClassModal = () => {
    dispatch(resetClassFormModal());

    searchParams.delete("classId");
    setSearchParams(searchParams);
  };

  return {
    handleCloseClassModal,
  };
};

export default useClassFormModalFeatures;
