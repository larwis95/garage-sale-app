"use client";
import Auth from "@/app/libs/auth/frontend";
import { useState, useEffect } from "react";

export default function LogOutButton() {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(false);
  useEffect(() => {
    setLoggedIn(Auth.loggedIn());
  }, []);

  return (
    <>
      {loggedIn && (
        <a onClick={Auth.logout} className="cursor-pointer rounded-lg border border-white bg-black p-2 text-white transition duration-500 hover:scale-110 hover:border-yellow-300 hover:bg-slate-700 hover:text-yellow-300">
          Logout
        </a>
      )}
    </>
  );
}
