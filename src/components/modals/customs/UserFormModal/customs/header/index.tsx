import React from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/hooks/useRedux";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

const UserFormModalHeader: React.FC = () => {
  const { t } = useTranslation();
  const { modalType, actionType } = useAppSelector((state) => state.userFormModal);

  return (
    <DialogHeader>
      <DialogTitle className='capitalize text-xl'>
        {t(`${modalType}_form.${actionType}-${modalType}`)}
      </DialogTitle>
    </DialogHeader>
  );
};

export default UserFormModalHeader;
