import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { DeleteResult } from "./customs";
import { useAppSelector } from "@/hooks/useRedux";
import useResultFormModalFeatures from "./features";
import { ResultForm } from "@/components/views/list/results/customs";

const ResultFormModal: React.FC = () => {
  const { t } = useTranslation();
  const { handleCloseResultModal } = useResultFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.resultFormModal
  );

  return (
    <Dialog open={!!modalType} onOpenChange={handleCloseResultModal}>
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
            {t(`result_form.${actionType}-result`)}
          </DialogTitle>
        </DialogHeader>

        {actionType === "delete" ? <DeleteResult /> : <ResultForm />}
      </DialogContent>
    </Dialog>
  );
};

export default ResultFormModal;
