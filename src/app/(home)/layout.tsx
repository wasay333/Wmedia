import { HomeLayout as ImportedHomeLayout } from "@/modules/home/ui/layouts/home-layout";
import React from "react";
interface HomeProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeProps) => {
  return <ImportedHomeLayout>{children}</ImportedHomeLayout>;
};

export default HomeLayout;
