import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useRedux";
import {
  ClassModalType,
  setClassFormModal,
} from "@/store/slices/class-form-modal";

type TPath = "/list/classes";

const pathToModalType: Record<TPath, ClassModalType> = {
  "/list/classes": "class",
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
        setClassFormModal({
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
