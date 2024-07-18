"use client";
import Auth from "@/app/libs/auth/frontend";
import { useState } from "react";

export default function HamburgerMenuLogout() {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(Auth.loggedIn());

  return (
    <>
      {loggedIn && (
        <a onClick={Auth.logout} className="cursor-pointer rounded-lg border-b border-white text-white transition duration-500 hover:scale-110 hover:border-r hover:border-red-700 hover:text-red-500">
          Logout
        </a>
      )}
    </>
  );
}
