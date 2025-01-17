import React from "react";
import { CirclePlus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CustomTooltip } from "@/tools";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  ExamModalType,
  setExamFormModal,
} from "@/store/slices/exam-form-modal";

type TPath = "/list/exams";

const pathToModalType: Record<TPath, string> = {
  "/list/exams": "exam",
};

const AddBtn: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleCreate = () => {
    if (location.pathname in pathToModalType) {
      const modalType =
        pathToModalType[location.pathname as keyof typeof pathToModalType];

      dispatch(
        setExamFormModal({
          modalType: modalType as ExamModalType,
          actionType: "add",
        })
      );
    }
  };

  return (
    <CustomTooltip title={t("exam_form.add-exam")}>
      <button disabled={loading}>
        <CirclePlus
          className='w-7 md:w-8 h-7 md:h-8 active:scale-95 cursor-pointer'
          onClick={handleCreate}
        />
      </button>
    </CustomTooltip>
  );
};

export default AddBtn;
