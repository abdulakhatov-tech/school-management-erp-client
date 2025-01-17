import { configureStore } from "@reduxjs/toolkit";
import {
  theme,
  userFormModal,
  classFormModal,
  lessonFormModal,
  subjectFormModal,
  examFormModal,
} from "./slices";

export const store = configureStore({
  reducer: {
    theme,
    userFormModal,
    examFormModal,
    classFormModal,
    lessonFormModal,
    subjectFormModal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
