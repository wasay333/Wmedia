import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import StudioUploadModal from "../studio-upload-modal";
import { ModeToggle } from "@/components/theme-changer";
export const StudioNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-background flex items-center px-2 pr-5 z-50 border-b shadow-md">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center flex-shrink-0 gap-3">
          <SidebarTrigger />
          <Link prefetch href={"/studio"} className="hidden md:block">
            <div className="p-4 flex items-center gap-1">
              <Image src={"/logo.svg"} height={36} width={36} alt="logo" />
              <p className="logo-text text-2xl font-medium tracking-tight leading-none relative top-1">
                Studio
              </p>
            </div>
          </Link>
        </div>
        {/* spacer */}
        <div className="flex-1" />
        <div className="flex-shrink-0 items-center flex gap-4">
          <StudioUploadModal />
          <AuthButton />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
