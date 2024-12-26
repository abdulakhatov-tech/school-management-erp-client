// src/store/themeSlice.ts
import { createSlice } from "@reduxjs/toolkit";

type ThemeT = "dark" | "light";

// Function to get the initial theme from local storage
const getInitialTheme = (): ThemeT => {
  const storedTheme = localStorage.getItem("theme-mode");
  return storedTheme ? JSON.parse(storedTheme) : "light";
};

interface ThemeState {
  themeMode: ThemeT;
}

const initialState: ThemeState = {
  themeMode: getInitialTheme(), // Initialize from local storage
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      // Update the theme mode
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
      // Save the theme mode to local storage
      localStorage.setItem("theme-mode", JSON.stringify(state.themeMode));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
