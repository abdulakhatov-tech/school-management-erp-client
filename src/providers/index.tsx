import { Provider } from "react-redux";
import React, { useEffect } from "react";
import AuthProvider from "react-auth-kit";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/i18n";
import { store } from "@/store";
import { authStore } from "@/configs/auth";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/components/constants/theme/provider";

interface PropsI {
  children: React.ReactNode;
}

// Create a client
const queryClient = new QueryClient();

const AppProviders: React.FC<PropsI> = ({ children }) => {
  useEffect(() => {
    localStorage.setItem("i18nextLng", "en");
  }, []);

  return (
    <AuthProvider store={authStore}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider>
            {children} 
            <Toaster />
            <ReactQueryDevtools />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default AppProviders;
