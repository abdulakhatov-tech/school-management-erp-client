import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteExam } from "./customs";
import { useAppSelector } from "@/hooks/useRedux";
import useExamFormModalFeatures from "./features";
import { ExamForm } from "@/components/views/list/exams/customs";

const ExamFormModal: React.FC = () => {
  const { t } = useTranslation();
  const { handleCloseExamModal } = useExamFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.examFormModal
  );

  return (
    <Dialog open={!!modalType} onOpenChange={handleCloseExamModal}>
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
            {t(`exam_form.${actionType}-exam`)}
          </DialogTitle>
        </DialogHeader>

        {actionType === "delete" ? <DeleteExam /> : <ExamForm />}
      </DialogContent>
    </Dialog>
  );
};

export default ExamFormModal;
