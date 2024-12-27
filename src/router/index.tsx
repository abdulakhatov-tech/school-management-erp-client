import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage from "@/pages/auth";
import RequireAuth from "./require-auth";
import PrivateRoute from "./private-route";
import DashboardLayout from "@/layouts/dashboard-layout";

const NotFoundPage = lazy(() => import("@/pages/not-found"));
const ErrorsPage = lazy(() => import("@/pages/errors"));
const LogoutPage = lazy(() => import("@/pages/logout"));

const AppRouter: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth fallbackPath={'/auth/sign-in'}>
          <PrivateRoute
            allowedRoles={[
              "super-admin",
              "admin",
              "teacher",
              "student",
              "parent",
            ]}
          >
            <DashboardLayout />
          </PrivateRoute>
        </RequireAuth>
      ),
      children: [
        {
          path: "/logout",
          element: (
            <PrivateRoute
              allowedRoles={["super-admin" ,"admin", "teacher", "student", "parent"]}
            >
              <LogoutPage />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/auth/sign-in",
      element: <AuthPage />,
    },
    {
      path: "/not-found",
      element: <NotFoundPage />,
    },
    {
      path: "/errors",
      element: <ErrorsPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />, // Fallback for unmatched routes
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
