import { configureStore } from "@reduxjs/toolkit";
import {
  theme,
  userFormModal,
  examFormModal,
  classFormModal,
  eventFormModal,
  lessonFormModal,
  resultFormModal,
  subjectFormModal,
  assignmentFormModal,
  announcementFormModal,
} from "./slices";

export const store = configureStore({
  reducer: {
    theme,
    userFormModal,
    examFormModal,
    eventFormModal,
    classFormModal,
    lessonFormModal,
    resultFormModal,
    subjectFormModal,
    assignmentFormModal,
    announcementFormModal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
