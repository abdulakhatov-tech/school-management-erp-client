import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteEvent } from "./customs";
import { useAppSelector } from "@/hooks/useRedux";
import useEventFormModalFeatures from "./features";
import { EventForm } from "@/components/views/list/events/customs";

const AssignmentFormModal: React.FC = () => {
  const { t } = useTranslation();
  const { handleCloseEventModal } = useEventFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.eventFormModal
  );

  return (
    <Dialog open={!!modalType} onOpenChange={handleCloseEventModal}>
      <DialogContent
        className={classNames(
          "overflow-y-auto max-h-screen sm:h-auto rounded-lg",
          {
            "md:min-w-[600px]": actionType !== "delete",
            "w-[90%] max-w-[500px] md:w-fit": actionType === "delete",
          }
        )}
      >
        <DialogHeader>
          <DialogTitle className='capitalize text-xl'>
            {t(`event_form.${actionType}-event`)}
          </DialogTitle>
        </DialogHeader>

        {actionType === "delete" ? <DeleteEvent /> : <EventForm />}
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentFormModal;
