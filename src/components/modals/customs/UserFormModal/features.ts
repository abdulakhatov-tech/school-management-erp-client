import { useSearchParams } from "react-router-dom";

import { useAppDispatch } from "@/hooks/useRedux";
import { resetUserFormModal } from "@/store/slices/user-form-modal";

const useUserFormModalFeatures = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseUserModal = () => {
    dispatch(resetUserFormModal());

    searchParams.delete("adminId");
    searchParams.delete("teacherId");
    searchParams.delete("studentId");
    searchParams.delete("parentId");
    setSearchParams(searchParams);
  };

  return { handleCloseUserModal };
};

export default useUserFormModalFeatures;
