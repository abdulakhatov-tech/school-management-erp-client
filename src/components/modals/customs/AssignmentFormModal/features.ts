import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useRedux";
import { resetAssignmentFormModal } from "@/store/slices/assignment-form-modal";

const useAssignmentFormModalFeatures = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseAssignmentModal = () => {
    dispatch(resetAssignmentFormModal());

    searchParams.delete("assignmentId");
    setSearchParams(searchParams);
  };

  return {
    handleCloseAssignmentModal,
  };
};

export default useAssignmentFormModalFeatures;
