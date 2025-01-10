import React from "react";
import { CirclePlus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CustomTooltip } from "@/tools";
import { useAppDispatch } from "@/hooks/useRedux";
import { UserModalType, setUserFormModal } from "@/store/slices/user-form-modal";

type TPath = "/list/teachers";

const pathToModalType: Record<TPath, string> = {
  "/list/teachers": "teacher",
};

const AddBtn: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    if (location.pathname in pathToModalType) {
      const modalType =
        pathToModalType[location.pathname as keyof typeof pathToModalType];

      dispatch(
        setUserFormModal({
          modalType: modalType as UserModalType,
          actionType: "add",
        })
      );
    }
  };

  return (
    <CustomTooltip title={t('teacher_form.add-teacher')}>
      <button disabled={loading}>
        <CirclePlus
          className='w-7 md:w-8 h-7 md:h-8 active:scale-95 cursor-pointer'
          onClick={handleAdd}
        />
      </button>
    </CustomTooltip>
  );
};

export default AddBtn;
