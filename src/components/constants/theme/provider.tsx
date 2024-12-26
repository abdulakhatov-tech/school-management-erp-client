import React, { useEffect } from "react";
import { useAppSelector } from "@/hooks/useRedux";

interface PropsI {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<PropsI> = ({ children }) => {
  const themeMode = useAppSelector((state) => state.theme.themeMode);

  useEffect(() => {
    // Set the initial theme based on the Redux state
    if (themeMode === "light") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [themeMode]);

  return <>{children}</>;
};

export default ThemeProvider;
