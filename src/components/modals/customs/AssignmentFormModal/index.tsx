import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeleteAssignment } from "./customs";
import { useAppSelector } from "@/hooks/useRedux";
import useAssignmentFormModalFeatures from "./features";
import { AssignmentForm } from "@/components/views/list/assignments/customs";

const AssignmentFormModal: React.FC = () => {
  const { t } = useTranslation();
  const { handleCloseAssignmentModal } = useAssignmentFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.assignmentFormModal
  );

  return (
    <Dialog open={!!modalType} onOpenChange={handleCloseAssignmentModal}>
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
            {t(`assignment_form.${actionType}-assignment`)}
          </DialogTitle>
        </DialogHeader>

        {actionType === "delete" ? <DeleteAssignment /> : <AssignmentForm />}
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentFormModal;
