import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import AdminDashboard from "./admin";
import ParentDashboard from "./parent";
import TeacherDashboard from "./teacher";
import StudentDashboard from "./student";
import { TUser } from "@/interfaces/user";
import { Section } from "@/components/layout";

const HomePageComponent: React.FC = () => {
  const user = useAuthUser<TUser>();

  return (
    <Section id='dashboard'>
      {user?.role === "admin" || user?.role === "super-admin" && <AdminDashboard />}
      {user?.role === "teacher" && <TeacherDashboard />}
      {user?.role === "student" && <StudentDashboard />}
      {user?.role === "parent" && <ParentDashboard />}
    </Section>
  );
};

export default HomePageComponent;
