import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import useDeleteAssignmentFeatures from "./features";
import { useAssignmentService } from "@/services/assignments";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

const DeleteAssignment: React.FC = () => {
  const { t } = useTranslation();
  const { getAssignmentById } = useAssignmentService();
  const { handleCloseAssignmentModal, handleDeleteAssignment } =
  useDeleteAssignmentFeatures();

  const { data, isLoading } = getAssignmentById;

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
        <Button variant='outline' onClick={handleCloseAssignmentModal}>
          {t("button.cancel")}
        </Button>
        <Button
          variant='destructive'
          onClick={handleDeleteAssignment}
          disabled={isLoading}
        >
          {t("button.delete")}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default DeleteAssignment;
