import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks/useRedux";
import useSubjectFormModalFeatures from "./features";
import { SubjectForm } from "@/components/views/list/subjects/customs";
import { DeleteSubject } from "./customs";

const SubjectFormModal: React.FC = () => {
  const { t } = useTranslation();
  const { handleCloseSubjectModal } = useSubjectFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.subjectFormModal
  );

  return (
    <Dialog open={!!modalType} onOpenChange={handleCloseSubjectModal}>
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
            {t(`subject_form.${actionType}-subject`)}
          </DialogTitle>
        </DialogHeader>

        {actionType === "delete" ? <DeleteSubject /> : <SubjectForm />}
      </DialogContent>
    </Dialog>
  );
};

export default SubjectFormModal;
