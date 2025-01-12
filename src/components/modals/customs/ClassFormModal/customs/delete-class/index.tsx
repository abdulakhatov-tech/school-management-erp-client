import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import useDeleteClassFeatures from "./features";
import { Button } from "@/components/ui/button";
import { useClassService } from "@/services/classes";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

const DeleteClass: React.FC = () => {
  const { t } = useTranslation();
  const { getClassById } = useClassService();
  const { handleCloseClassModal, handleDeleteClass } = useDeleteClassFeatures();

  const { data, isLoading } = getClassById;

  return (
    <div className='flex flex-col gap-4'>
      <div className='text-center'>
        <h4 className='text-[16px] font-bold capitalize'>{data?.name}</h4>
      </div>

      <DialogDescription className={classNames("max-w-[400px] text-center")}>
        {t("admin_form.delete_description")}
      </DialogDescription>

      <DialogFooter className='flex flex-col md:flex-row gap-2 md:gap-0'>
        <Button variant='outline' onClick={handleCloseClassModal}>
          {t("button.cancel")}
        </Button>
        <Button
          variant='destructive'
          onClick={handleDeleteClass}
          disabled={isLoading}
        >
          {t("button.delete")}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default DeleteClass;
