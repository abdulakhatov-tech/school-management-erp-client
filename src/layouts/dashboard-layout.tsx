import React from "react";
import { Outlet, useOutlet } from "react-router-dom";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar, Navbar } from "@/components/layout";
import { SuspenseWrapper } from "@/tools";
import DashboardPage from "@/pages/dashboard";

const DashboardLayout: React.FC = () => {
  const hasOutlet = useOutlet();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <main className='flex flex-1 flex-col gap-4 p-4'>
          {/* bg-muted/50 */}
          <div className='min-h-[100vh] flex-1 md:min-h-min'>
            <SuspenseWrapper>
              {hasOutlet ? <Outlet /> : <DashboardPage />}
            </SuspenseWrapper>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
