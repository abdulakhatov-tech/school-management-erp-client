import { configureStore } from "@reduxjs/toolkit";
import {
  theme,
  userFormModal,
  examFormModal,
  classFormModal,
  lessonFormModal,
  resultFormModal,
  subjectFormModal,
  assignmentFormModal,
} from "./slices";

export const store = configureStore({
  reducer: {
    theme,
    userFormModal,
    examFormModal,
    classFormModal,
    lessonFormModal,
    resultFormModal,
    subjectFormModal,
    assignmentFormModal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
