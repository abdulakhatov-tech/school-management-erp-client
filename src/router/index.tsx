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

const ExamsPage = lazy(() => import("@/pages/list/exams"));

const SubjectsPage = lazy(() => import("@/pages/list/subjects"));

const AssignmentsPage = lazy(() => import("@/pages/list/assignments"));

const ResultsPage = lazy(() => import("@/pages/list/results"));

const AttendancesPage = lazy(() => import("@/pages/list/attendances"));

const AnnouncementsPage = lazy(() => import("@/pages/list/announcements"));
const AnnouncementDetailsPage = lazy(
  () => import("@/pages/list/announcements/details")
);

const EventsPage = lazy(() => import("@/pages/list/events"));
const EventDetailsPage = lazy(() => import("@/pages/list/events/details"));

const MessagesPage = lazy(() => import("@/pages/list/messages"))

const ProfilePage = lazy(() => import("@/pages/profile"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const ErrorsPage = lazy(() => import("@/pages/errors"));
const LogoutPage = lazy(() => import("@/pages/logout"));
const SettingsPage = lazy(() => import("@/pages/settings"));

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
            <PrivateRoute allowedRoles={["admin", "super-admin", "teacher"]}>
              <TeachersPage />
            </PrivateRoute>
          ),
          children: [
            {
              path: ":teacherId",
              element: (
                <PrivateRoute
                  allowedRoles={["admin", "super-admin", "teacher"]}
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
            <PrivateRoute allowedRoles={["admin", "super-admin", "teacher"]}>
              <StudentsPage />
            </PrivateRoute>
          ),
          children: [
            {
              path: ":studentId",
              element: (
                <PrivateRoute
                  allowedRoles={["admin", "super-admin", "teacher"]}
                >
                  <StudentProfilePage />
                </PrivateRoute>
              ),
            },
          ],
        },
        {
          path: "/list/parents",
          element: (
            <PrivateRoute allowedRoles={["admin", "super-admin", "teacher"]}>
              <ParentsPage />
            </PrivateRoute>
          ),
          children: [
            {
              path: ":parentId",
              element: (
                <PrivateRoute
                  allowedRoles={["admin", "super-admin", "teacher"]}
                >
                  <ParentProfilePage />
                </PrivateRoute>
              ),
            },
          ],
        },
        {
          path: "/list/subjects",
          element: (
            <PrivateRoute allowedRoles={["admin", "super-admin"]}>
              <SubjectsPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/list/classes",
          element: (
            <PrivateRoute allowedRoles={["admin", "super-admin", "teacher"]}>
              <ClassesPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/list/lessons",
          element: (
            <PrivateRoute allowedRoles={["admin", "super-admin", "teacher"]}>
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
          ),
        },
        {
          path: "/list/assignments",
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
              <AssignmentsPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/list/results",
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
              <ResultsPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/list/attendances",
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
              <AttendancesPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/list/events",
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
              <EventsPage />
            </PrivateRoute>
          ),
          children: [
            {
              path: ":eventId",
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
                  <EventDetailsPage />
                </PrivateRoute>
              ),
            },
          ],
        },
        {
          path: "/list/announcements",
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
              <AnnouncementsPage />
            </PrivateRoute>
          ),
          children: [
            {
              path: ":announcementId",
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
                  <AnnouncementDetailsPage />
                </PrivateRoute>
              ),
            },
          ],
        },

        {
          path: "/list/messages",
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
              <MessagesPage />
            </PrivateRoute>
          ),
        },

        {
          path: "/profile",
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
              <ProfilePage />
            </PrivateRoute>
          ),
        },
        {
          path: "/settings",
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
              <SettingsPage />
            </PrivateRoute>
          ),
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
