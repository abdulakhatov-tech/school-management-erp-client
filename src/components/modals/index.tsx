import React from "react";

import {
  UserFormModal,
  ExamFormModal,
  ClassFormModal,
  LessonFormModal,
  SubjectFormModal,
} from "./customs";

const ModalVisibility: React.FC = () => {
  return (
    <>
      <UserFormModal />
      <ExamFormModal />
      <ClassFormModal />
      <LessonFormModal />
      <SubjectFormModal />
    </>
  );
};

export default ModalVisibility;
