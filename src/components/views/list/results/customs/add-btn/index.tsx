import React from "react";
import { CirclePlus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  ResultModalType,
  setResultFormModal,
} from "@/store/slices/result-form-modal";
import { CustomTooltip } from "@/tools";
import { useAppDispatch } from "@/hooks/useRedux";
import { Skeleton } from "@/components/ui/skeleton";

type TPath = "/list/results";

const pathToModalType: Record<TPath, string> = {
  "/list/results": "result",
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
        setResultFormModal({
          modalType: modalType as ResultModalType,
          actionType: "add",
        })
      );
    }
  };

  if(loading) {
    return <Skeleton className="w-9 h-9 rounded-full" />
  }

  return (
    <CustomTooltip title={t("result_form.add-result")}>
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
