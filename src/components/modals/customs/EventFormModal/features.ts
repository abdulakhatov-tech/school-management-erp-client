import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useRedux";
import { resetEventFormModal } from "@/store/slices/event-form-modal";

const useEventFormModalFeatures = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseEventModal = () => {
    dispatch(resetEventFormModal());

    searchParams.delete("eventId");
    setSearchParams(searchParams);
  };

  return {
    handleCloseEventModal,
  };
};

export default useEventFormModalFeatures;
