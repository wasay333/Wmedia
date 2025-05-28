"use client";
import { Button } from "@/components/ui/button";
import {
  BellIcon,
  ClapperboardIcon,
  UserCircleIcon,
  UserIcon,
} from "lucide-react";
import { UserButton, SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import React from "react";

export const AuthButton = () => {
  //   add defferent auth states
  return (
    <>
      <div className="bg-background">
        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="My Profile"
                href="/users/current"
                labelIcon={<UserIcon className="size-4" />}
              />
              <UserButton.Link
                label="Studio"
                href="/studio"
                labelIcon={<ClapperboardIcon className="size-4" />}
              />
              <UserButton.Link
                label="Notification settings"
                href="/Notification"
                labelIcon={<BellIcon className="size-4" />}
              />
              <UserButton.Action label="manageAccount" />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant={"outline"}
            className="px-4 text-sm font-medium
      text-purple-400 hover:text-purple-500
      border-purple-500/20 rounded-full shadow-none"
          >
            <UserCircleIcon />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
