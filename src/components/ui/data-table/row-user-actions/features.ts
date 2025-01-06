import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import {
  UserModalType,
  setUserFormModal,
} from "@/store/slices/user-form-modal";
import { TUser } from "@/interfaces/user";
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
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAuthUser() as TUser;
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
    const modalType = pathToModalType[location.pathname as TPath];

    navigate(`/list/${modalType}s/${userId}`);
  };

  const isSuperAdmin = user?.role === "super-admin";
  const isAdmin = user?.role === "admin";

  // Check if the pathname matches and role is allowed to view edit action
  const canModify =
    (location.pathname === "/list/admins" && isSuperAdmin) ||
    (["/list/teachers", "/list/students", "/list/parents"].includes(
      location.pathname
    ) &&
      (isSuperAdmin || isAdmin));

  return {
    canModify,
    handleView,
    handleAction,
    isDropdownOpen,
    setIsDropdownOpen,
    handleDropdownToggle,
  };
};

export default useDataTableRowActionsFeatures;
