import { configureStore } from "@reduxjs/toolkit";
import { classFormModal, theme, userFormModal } from "./slices";

export const store = configureStore({
  reducer: {
    theme,
    userFormModal,
    classFormModal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
