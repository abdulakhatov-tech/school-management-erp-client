import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import {
  UserModalType,
  setUserFormModal,
} from "@/store/slices/user-form-modal";
import { useAppDispatch } from "@/hooks/useRedux";

type TPath =
  | "/list/admins"
  | "/list/teachers"
  | "/list/students"
  | "/list/parents";

const pathToModalType: Record<TPath, UserModalType> = {
  "/list/admins": "admin",
  "/list/teachers": "teacher",
  "/list/students": "student",
  "/list/parents": "parent",
};

const useDataTableRowActionsFeatures = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAction = (dataId: string, actionType: "edit" | "delete") => {
    const modalType = pathToModalType[location.pathname as TPath];

    if (modalType && actionType) {
      searchParams.set(`${modalType}Id`, dataId);
      setSearchParams(searchParams);

      dispatch(
        setUserFormModal({
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

  const handleView = (userId: string) => {
    alert(userId);
    const modalType = pathToModalType[location.pathname as TPath];

    navigate(`/list/${modalType}s/${userId}`);
  };

  return {
    handleView,
    handleAction,
    isDropdownOpen,
    setIsDropdownOpen,
    handleDropdownToggle,
  };
};

export default useDataTableRowActionsFeatures;
