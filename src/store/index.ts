import { configureStore } from "@reduxjs/toolkit";
import { theme, userFormModal } from "./slices";

export const store = configureStore({
  reducer: {
    theme,
    userFormModal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
