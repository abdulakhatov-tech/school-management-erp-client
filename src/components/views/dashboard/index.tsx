import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import AdminDashboard from "./admin";
import ParentDashboard from "./parent";
import TeacherDashboard from "./teacher";
import StudentDashboard from "./student";
import { TUser } from "@/interfaces/user";

const HomePageComponent: React.FC = () => {
  const user = useAuthUser<TUser>();

  return (
    <>
      {user?.role === "admin" && <AdminDashboard />}
      {user?.role === "teacher" && <TeacherDashboard />}
      {user?.role === "student" && <StudentDashboard />}
      {user?.role === "parent" && <ParentDashboard />}
    </>
  );
};

export default HomePageComponent;
