import { StudioLayout as ImportedStudioLayout } from "@/modules/studio/ui/layouts/studio-layout";
import React from "react";
interface StudioProps {
  children: React.ReactNode;
}
const HomeLayout = ({ children }: StudioProps) => {
  return <ImportedStudioLayout>{children}</ImportedStudioLayout>;
};

export default HomeLayout;
