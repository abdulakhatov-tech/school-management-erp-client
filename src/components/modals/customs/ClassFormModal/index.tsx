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
import useClassFormModalFeatures from "./features";
import { ClassForm } from "@/components/views/list/classes/customs";
import { DeleteClass } from "./customs";

const ClassFormModal: React.FC = () => {
  const { t } = useTranslation();
  const { handleCloseClassModal } = useClassFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.classFormModal
  );

  return (
    <Dialog open={!!modalType} onOpenChange={handleCloseClassModal}>
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
            {t(`class_form.${actionType}-class`)}
          </DialogTitle>
        </DialogHeader>

        {actionType === "delete" ? <DeleteClass /> : <ClassForm />}
      </DialogContent>
    </Dialog>
  );
};

export default ClassFormModal;
