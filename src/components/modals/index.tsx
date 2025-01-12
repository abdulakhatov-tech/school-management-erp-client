import React from "react";
import { ClassFormModal, UserFormModal } from "./customs";

const ModalVisibility: React.FC = () => {
  return (
    <>
      <UserFormModal />
      <ClassFormModal />
      {/* <SubjectFormModal /> */}
    </>
  );
};

export default ModalVisibility;
