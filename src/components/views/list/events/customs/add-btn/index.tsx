import React from "react";
import { CirclePlus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CustomTooltip } from "@/tools";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  EventModalType,
  setEventFormModal,
} from "@/store/slices/event-form-modal";
import { Skeleton } from "@/components/ui/skeleton";

type TPath = "/list/events";

const pathToModalType: Record<TPath, string> = {
  "/list/events": "event",
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
        setEventFormModal({
          modalType: modalType as EventModalType,
          actionType: "add",
        })
      );
    }
  };

  if(loading) {
    return <Skeleton className="w-9 h-9 rounded-full" />
  }

  return (
    <CustomTooltip title={t("event_form.add-event")}>
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
