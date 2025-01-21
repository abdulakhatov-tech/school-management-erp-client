import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/hooks/useRedux";
import { useAnnouncementsService } from "@/services/announcements";
import useAnnouncementFormModalFeatures from "../../features";

const useDeleteAnnouncementFeatures = () => {
  const navigate = useNavigate();
  const { modalType, actionType, dataId } = useAppSelector(
    (state) => state.announcementFormModal
  );
  const { handleCloseAnnouncementModal } = useAnnouncementFormModalFeatures();

  const { deleteAnnouncement } = useAnnouncementsService();

  const handleDeleteAnnouncement = async () => {
    if (!dataId || actionType !== "delete" || !modalType) return;

    await deleteAnnouncement.mutateAsync();
    navigate(`/list/announcements`);
    handleCloseAnnouncementModal();
  };

  return { handleDeleteAnnouncement, handleCloseAnnouncementModal };
};

export default useDeleteAnnouncementFeatures;
