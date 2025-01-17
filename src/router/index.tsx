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

const StudentsPage = lazy(() => import("@/pages/list/students"));
const StudentProfilePage = lazy(() => import("@/pages/list/students/profile"));

const ParentsPage = lazy(() => import("@/pages/list/parents"));
const ParentProfilePage = lazy(() => import("@/pages/list/parents/profile"));

const ClassesPage = lazy(() => import("@/pages/list/classes"));

const LessonsPage = lazy(() => import("@/pages/list/lessons"));

const ExamsPage = lazy(() => import('@/pages/list/exams'))

const SubjectsPage = lazy(() => import("@/pages/list/subjects"));

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
          path: "/list/students",
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
              <StudentsPage />
            </PrivateRoute>
          ),
          children: [
            {
              path: ":studentId",
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
                  <StudentProfilePage />
                </PrivateRoute>
              ),
            },
          ]
        },
        {
          path: "/list/parents",
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
              <ParentsPage />
            </PrivateRoute>
          ),
          children: [
            {
              path: ":parentId",
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
                  <ParentProfilePage />
                </PrivateRoute>
              ),
            },
          ], 
        },
        {
          path: "/list/classes",
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
              <ClassesPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/list/lessons",
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
              <LessonsPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/list/exams",
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
              <ExamsPage />
            </PrivateRoute>
          )
        },
        {
          path: '/list/subjects',
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
              <SubjectsPage />
            </PrivateRoute>
          )

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
