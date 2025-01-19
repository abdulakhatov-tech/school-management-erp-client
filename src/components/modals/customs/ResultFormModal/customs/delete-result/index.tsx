import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import useDeleteResultFeatures from "./features";
import { useResultService } from "@/services/results";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const DeleteResult: React.FC = () => {
  const { t } = useTranslation();
  const { getResultById } = useResultService();
  const { handleCloseResultModal, handleDeleteResult } =
  useDeleteResultFeatures();

  const { data, isLoading } = getResultById;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col items-center gap-4'>
        <div className='text-center'>
          {
            isLoading ? <Skeleton className='w-[200px] h-8' /> : <h4 className='text-[16px] font-bold capitalize'>{data?.assignment ? data?.assignment.name : data?.exam ? data?.exam?.name : ''}</h4>
          }
          
        </div>
      </div>
      <DialogDescription className={classNames("max-w-[400px] text-center")}>
        {t("admin_form.delete_description")}
      </DialogDescription>

      <DialogFooter className='flex flex-col md:flex-row gap-2 md:gap-0'>
        <Button variant='outline' onClick={handleCloseResultModal}>
          {t("button.cancel")}
        </Button>
        <Button
          variant='destructive'
          onClick={handleDeleteResult}
          disabled={isLoading}
        >
          {t("button.delete")}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default DeleteResult;
