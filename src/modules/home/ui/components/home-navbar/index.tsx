import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { ModeToggle } from "@/components/theme-changer";
export const HomeNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-background flex items-center px-2 pr-5 z-50 border-b shadow-sm">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and logo */}
        <div className="flex items-center flex-shrink-0 gap-3">
          <SidebarTrigger />
          <Link prefetch href={"/"} className="hidden md:block">
            <div className="p-4 flex items-center gap-1">
              <Image src={"/logo.svg"} height={36} width={36} alt="logo" />
              <p className="logo-text text-2xl font-medium tracking-tight leading-none relative top-1">
                media
              </p>
            </div>
          </Link>
        </div>
        {/* Search bar */}
        <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
          <SearchInput />
        </div>
        <div className="flex-shrink-0 items-center flex gap-4">
          <AuthButton />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
