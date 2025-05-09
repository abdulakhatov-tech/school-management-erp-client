import React from "react";
import { CirclePlus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  SubjectModalType,
  setSubjectFormModal,
} from "@/store/slices/subject-form-modal";
import { CustomTooltip } from "@/tools";
import { useAppDispatch } from "@/hooks/useRedux";

type TPath = "/list/subjects";

const pathToModalType: Record<TPath, string> = {
  "/list/subjects": "subject",
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
        setSubjectFormModal({
          modalType: modalType as SubjectModalType,
          actionType: "add",
        })
      );
    }
  };

  return (
    <CustomTooltip title={t("subject_form.add-lesson")}>
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
