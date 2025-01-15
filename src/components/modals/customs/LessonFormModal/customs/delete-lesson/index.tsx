import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import useDeleteLessonFeatures from "./features";
import { Skeleton } from "@/components/ui/skeleton";
import { useLessonService } from "@/services/lessons";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

const DeleteLesson: React.FC = () => {
  const { t } = useTranslation();
  const { getLessonById } = useLessonService();
  const { handleCloseLessonModal, handleDeleteLesson } = useDeleteLessonFeatures();

  const { data, isLoading } = getLessonById;

  return (
    <div className='flex flex-col gap-4'>
      <div className='text-center'>
        <h4 className='text-[16px] font-bold capitalize'>{isLoading ? <Skeleton className="w-[220px] h-8 mx-auto" /> : data?.name }</h4>
      </div>

      <DialogDescription className={classNames("max-w-[400px] text-center")}>
        {t("admin_form.delete_description")}
      </DialogDescription>

      <DialogFooter className='flex flex-col md:flex-row gap-2 md:gap-0'>
        <Button variant='outline' onClick={handleCloseLessonModal}>
          {t("button.cancel")}
        </Button>
        <Button
          variant='destructive'
          onClick={handleDeleteLesson}
          disabled={isLoading}
        >
          {t("button.delete")}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default DeleteLesson;
