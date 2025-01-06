import React from "react";
import { Outlet, useOutlet } from "react-router-dom";

import { SuspenseWrapper } from "@/tools";
import DashboardPage from "@/pages/dashboard";
import ModalVisibility from "@/components/modals";
import { AppSidebar, Navbar } from "@/components/layout";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const DashboardLayout: React.FC = () => {
  const hasOutlet = useOutlet();

  return (
    <SidebarProvider>
      <AppSidebar />
      <ModalVisibility />
      <SidebarInset>
        <Navbar />
        <main className='flex flex-1 flex-col gap-4 p-5 bg-slate-50 dark:bg-[#000]'>
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
