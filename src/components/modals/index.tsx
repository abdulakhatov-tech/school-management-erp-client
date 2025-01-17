import React from "react";

import {
  UserFormModal,
  ExamFormModal,
  ClassFormModal,
  LessonFormModal,
  SubjectFormModal,
  AssignmentFormModal,
} from "./customs";

const ModalVisibility: React.FC = () => {
  return (
    <>
      <UserFormModal />
      <ExamFormModal />
      <ClassFormModal />
      <LessonFormModal />
      <SubjectFormModal />
      <AssignmentFormModal />
    </>
  );
};

export default ModalVisibility;
