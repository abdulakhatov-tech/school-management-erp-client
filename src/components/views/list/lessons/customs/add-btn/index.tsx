import React from "react";
import { CirclePlus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  LessonModalType,
  setLessonFormModal,
} from "@/store/slices/lesson-form-modal";
import { CustomTooltip } from "@/tools";
import { useAppDispatch } from "@/hooks/useRedux";

type TPath = "/list/lessons";

const pathToModalType: Record<TPath, string> = {
  "/list/lessons": "lesson",
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
        setLessonFormModal({
          modalType: modalType as LessonModalType,
          actionType: "add",
        })
      );
    }
  };

  return (
    <CustomTooltip title={t("lesson_form.add-lesson")}>
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
