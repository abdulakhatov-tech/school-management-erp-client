import React from "react";
import { CirclePlus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CustomTooltip } from "@/tools";
import { useAppDispatch } from "@/hooks/useRedux";
import { UserModalType, setUserFormModal } from "@/store/slices/user-form-modal";
import { Skeleton } from "@/components/ui/skeleton";

type TPath = "/list/admins";

const pathToModalType: Record<TPath, string> = {
  "/list/admins": "admin",
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

  if(loading) {
    return <Skeleton className="w-9 h-9 rounded-full" />
  }

  return (
    <CustomTooltip title={t('admin_form.add-admin')}>
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
