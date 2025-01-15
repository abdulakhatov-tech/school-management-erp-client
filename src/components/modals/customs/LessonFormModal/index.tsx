import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteLesson } from "./customs";
import { useAppSelector } from "@/hooks/useRedux";
import useLessonFormModalFeatures from "./features";
import { LessonForm } from "@/components/views/list/lessons/customs";

const ClassFormModal: React.FC = () => {
  const { t } = useTranslation();
  const { handleCloseLessonModal } = useLessonFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.lessonFormModal
  );

  return (
    <Dialog open={!!modalType} onOpenChange={handleCloseLessonModal}>
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
            {t(`lesson_form.${actionType}-lesson`)}
          </DialogTitle>
        </DialogHeader>

        {actionType === "delete" ? <DeleteLesson /> : <LessonForm />}
      </DialogContent>
    </Dialog>
  );
};

export default ClassFormModal;
