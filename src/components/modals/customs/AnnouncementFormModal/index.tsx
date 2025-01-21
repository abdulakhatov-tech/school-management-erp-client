import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteAnnouncement } from "./customs";
import { useAppSelector } from "@/hooks/useRedux";
import useAnnouncementFormModalFeatures from "./features";
import { AnnouncementForm } from "@/components/views/list/announcements/customs";

const AssignmentFormModal: React.FC = () => {
  const { t } = useTranslation();
  const { handleCloseAnnouncementModal } = useAnnouncementFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.announcementFormModal
  );

  return (
    <Dialog open={!!modalType} onOpenChange={handleCloseAnnouncementModal}>
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
            {t(`announcement_form.${actionType}-announcement`)}
          </DialogTitle>
        </DialogHeader>

        {actionType === "delete" ? <DeleteAnnouncement /> : <AnnouncementForm />}
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentFormModal;
