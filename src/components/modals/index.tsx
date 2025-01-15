import React from "react";
import { ClassFormModal, LessonFormModal, UserFormModal } from "./customs";

const ModalVisibility: React.FC = () => {
  return (
    <>
      <UserFormModal />
      <ClassFormModal />
      <LessonFormModal />
    </>
  );
};

export default ModalVisibility;
