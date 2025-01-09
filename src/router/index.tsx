import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage from "@/pages/auth";
import RequireAuth from "./require-auth";
import PrivateRoute from "./private-route";
import DashboardLayout from "@/layouts/dashboard-layout";

// list
const AdminsPage = lazy(() => import("@/pages/list/admins"));
const AdminProfilePage = lazy(() => import("@/pages/list/admins/profile"));

const TeachersPage = lazy(() => import("@/pages/list/teachers"));
const TeacherProfilePage = lazy(() => import("@/pages/list/teachers/profile"));

const NotFoundPage = lazy(() => import("@/pages/not-found"));
const ErrorsPage = lazy(() => import("@/pages/errors"));
const LogoutPage = lazy(() => import("@/pages/logout"));

const AppRouter: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RequireAuth fallbackPath={"/auth/sign-in"}>
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
          path: "/list/admins",
          element: (
            <PrivateRoute allowedRoles={["admin", "super-admin"]}>
              <AdminsPage />
            </PrivateRoute>
          ),
          children: [
            {
              path: ":adminId",
              element: (
                <PrivateRoute allowedRoles={["admin", "super-admin"]}>
                  <AdminProfilePage />
                </PrivateRoute>
              ),
            },
          ],
        },
        {
          path: "/list/teachers",
          element: (
            <PrivateRoute
              allowedRoles={[
                "admin",
                "super-admin",
                "teacher",
                "student",
                "parent",
              ]}
            >
              <TeachersPage />
            </PrivateRoute>
          ),
          children: [
            {
              path: ":teacherId",
              element: (
                <PrivateRoute
                  allowedRoles={[
                    "admin",
                    "super-admin",
                    "teacher",
                    "student",
                    "parent",
                  ]}
                >
                  <TeacherProfilePage />
                </PrivateRoute>
              ),
            },
          ],
        },
        {
          path: "/logout",
          element: (
            <PrivateRoute
              allowedRoles={[
                "super-admin",
                "admin",
                "teacher",
                "student",
                "parent",
              ]}
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
