import React from "react";

import {
  UserFormModal,
  ExamFormModal,
  ClassFormModal,
  LessonFormModal,
  ResultFormModal,
  SubjectFormModal,
  AssignmentFormModal,
  AnnouncementFormModal,
  EventFormModal,
} from "./customs";

const ModalVisibility: React.FC = () => {
  return (
    <>
      <UserFormModal />
      <ExamFormModal />
      <EventFormModal />
      <ClassFormModal />
      <ResultFormModal />
      <LessonFormModal />
      <SubjectFormModal />
      <AssignmentFormModal />
      <AnnouncementFormModal />
    </>
  );
};

export default ModalVisibility;
