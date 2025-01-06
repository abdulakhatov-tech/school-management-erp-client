import React from "react";
import classNames from "classnames";

import { DeleteUser, Header } from "./customs";
import { useAppSelector } from "@/hooks/useRedux";
import useUserFormModalFeatures from "./features";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UserModalType } from "@/store/slices/user-form-modal";
import AdminForm from "@/components/views/list/users/admins/customs/form";

const UserFormModal: React.FC = () => {
  const { handleCloseUserModal } = useUserFormModalFeatures();
  const { modalType, actionType } = useAppSelector(
    (state) => state.userFormModal
  );

  const formComponents: Record<UserModalType, JSX.Element | null> = {
    admin: actionType !== "delete" ? <AdminForm /> : <DeleteUser />,
    teacher: actionType !== "delete" ? <AdminForm /> : <DeleteUser />,
    student: actionType !== "delete" ? <AdminForm /> : <DeleteUser />,
    parent: actionType !== "delete" ? <AdminForm /> : <DeleteUser />,
  };

  // Return early if modalType is invalid
  if (
    !modalType ||
    (actionType !== "delete" && !formComponents[modalType as UserModalType])
  ) {
    return null;
  }

  return (
    <Dialog open={!!modalType} onOpenChange={handleCloseUserModal}>
      <DialogContent
        className={classNames(
          "overflow-y-auto max-h-screen sm:h-auto rounded-lg",
          {
            "md:min-w-[700px]": actionType !== "delete",
            "w-[90%] max-w-[500px] md:w-fit": actionType === "delete",
          }
        )}
      >
        <Header />
        {formComponents[modalType]}
      </DialogContent>
    </Dialog>
  );
};

export default UserFormModal;
