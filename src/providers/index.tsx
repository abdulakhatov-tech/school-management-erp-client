import { Provider } from "react-redux";
import React, { useEffect } from "react";
import AuthProvider from "react-auth-kit";

import "@/i18n";
import { store } from "@/store";
import { authStore } from "@/configs/auth";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/components/constants/theme/provider";

interface PropsI {
  children: React.ReactNode;
}

const AppProviders: React.FC<PropsI> = ({ children }) => {
  useEffect(() => {
    localStorage.setItem("i18nextLng", "en");
  }, []);

  return (
    <AuthProvider store={authStore}>
      <Provider store={store}>
        <ThemeProvider>
          {children} <Toaster />
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  );
};

export default AppProviders;
