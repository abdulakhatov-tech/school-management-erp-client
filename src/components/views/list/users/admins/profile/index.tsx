import React from "react";

import Loading from "./loading";
import { Section } from "@/components/layout";
import { Announcements, Details } from "./customs";
import { useAdminService } from "@/services/users/admins";

const AdminProfileView: React.FC = () => {
  const { getAdminById } = useAdminService();

  const { data: adminData, isLoading } = getAdminById;

  return (
    <Section id='admin-profile-page'>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-1 gap-6 w-full'>
          {/* Profile Card */}
          <Details adminData={adminData} />

          {/* Announcements Section */}
          <Announcements />
        </div>
      )}
    </Section>
  );
};

export default AdminProfileView;
