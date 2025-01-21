import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import useDeleteAnnouncementFeatures from "./features";
import { useAnnouncementsService } from "@/services/announcements";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

const DeleteAnnouncement: React.FC = () => {
  const { t } = useTranslation();
  const { getAnnouncementById } = useAnnouncementsService();
  const { handleCloseAnnouncementModal, handleDeleteAnnouncement } =
  useDeleteAnnouncementFeatures();

  const { data, isLoading } = getAnnouncementById;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col items-center gap-4'>
        <div className='text-center'>
          <h4 className='text-[16px] font-bold capitalize'>{data?.name}</h4>
        </div>
      </div>
      <DialogDescription className={classNames("max-w-[400px] text-center")}>
        {t("admin_form.delete_description")}
      </DialogDescription>

      <DialogFooter className='flex flex-col md:flex-row gap-2 md:gap-0'>
        <Button variant='outline' onClick={handleCloseAnnouncementModal}>
          {t("button.cancel")}
        </Button>
        <Button
          variant='destructive'
          onClick={handleDeleteAnnouncement}
          disabled={isLoading}
        >
          {t("button.delete")}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default DeleteAnnouncement;
