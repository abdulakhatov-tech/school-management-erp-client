import React from "react";
import { useTranslation } from "react-i18next";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { TUser } from "@/interfaces/user";
import { Section } from "@/components/layout";
import { Admin, Parent, Student, Teacher } from "./customs";

const ProfilePageView: React.FC = () => {
  const { t } = useTranslation();
  const user = useAuthUser() as TUser;

  return (
    <Section id='profile-page-view' title={t("app_sidebar.profile")}>
      {(user.role === "admin" || user.role === "super-admin") && <Admin />}
      {user.role === 'teacher' && <Teacher />}
      {user.role === 'student' && <Student />}
      {user.role === 'parent' && <Parent />}
    </Section>
  );
};

export default ProfilePageView;
