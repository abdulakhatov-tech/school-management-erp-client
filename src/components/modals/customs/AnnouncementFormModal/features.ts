import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useRedux";
import { resetAnnouncementFormModal } from "@/store/slices/announcement-form-modal";

const useAnnouncementFormModalFeatures = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseAnnouncementModal = () => {
    dispatch(resetAnnouncementFormModal());

    searchParams.delete("announcementId");
    setSearchParams(searchParams);
  };

  return {
    handleCloseAnnouncementModal,
  };
};

export default useAnnouncementFormModalFeatures;
