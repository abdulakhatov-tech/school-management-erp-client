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
  BookDetailsModal,
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
      <BookDetailsModal />
      <AssignmentFormModal />
      <AnnouncementFormModal />
    </>
  );
};

export default ModalVisibility;
