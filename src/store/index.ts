import { configureStore } from "@reduxjs/toolkit";
import {
  theme,
  userFormModal,
  classFormModal,
  lessonFormModal,
} from "./slices";

export const store = configureStore({
  reducer: {
    theme,
    userFormModal,
    classFormModal,
    lessonFormModal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
