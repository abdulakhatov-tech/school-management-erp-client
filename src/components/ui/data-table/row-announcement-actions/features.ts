import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import {
  AnnouncementModalType,
  setAnnouncementFormModal,
} from "@/store/slices/announcement-form-modal";
import { useAppDispatch } from "@/hooks/useRedux";

type TPath = "/list/announcements";

const pathToModalType: Record<TPath, AnnouncementModalType> = {
  "/list/announcements": "announcement",
};

const useDataTableRowActionsFeatures = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAction = (dataId: string, actionType: "edit" | "delete") => {
    const modalType = pathToModalType[location.pathname as TPath]; // Get modal config for the current path

    if (modalType && actionType) {
      searchParams.set(`${modalType}Id`, dataId);
      setSearchParams(searchParams);

      dispatch(
        setAnnouncementFormModal({
          modalType,
          actionType, // Resolve modal type based on the action
          dataId,
        })
      );

      setIsDropdownOpen(false);
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return {
    handleAction,
    handleDropdownToggle,
    isDropdownOpen,
    setIsDropdownOpen,
  };
};

export default useDataTableRowActionsFeatures;
