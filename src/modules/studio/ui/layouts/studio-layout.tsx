import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { StudioNavbar } from "../components/studio-navbar";
import { StudioSidebar } from "../components/studio-sidebar";
interface StudioProps {
  children: React.ReactNode;
}
export const StudioLayout = ({ children }: StudioProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <StudioNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <StudioSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
