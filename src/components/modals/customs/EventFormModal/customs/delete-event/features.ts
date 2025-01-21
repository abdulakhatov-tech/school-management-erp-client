import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/hooks/useRedux";
import { useEventsService } from "@/services/events";
import useEventFormModalFeatures from "../../features";

const useDeleteEventFeatures = () => {
  const navigate = useNavigate();
  const { modalType, actionType, dataId } = useAppSelector(
    (state) => state.eventFormModal
  );
  const { handleCloseEventModal } = useEventFormModalFeatures();

  const { deleteEvent } = useEventsService();

  const handleDeleteEvent = async () => {
    if (!dataId || actionType !== "delete" || !modalType) return;

    await deleteEvent.mutateAsync();
    navigate(`/list/events`);
    handleCloseEventModal();
  };

  return { handleDeleteEvent, handleCloseEventModal };
};

export default useDeleteEventFeatures;
