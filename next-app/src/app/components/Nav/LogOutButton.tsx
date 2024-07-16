import Auth from "@/app/libs/auth/frontend";
import { useState, useEffect } from "react";

export default function LogOutButton() {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    setLoggedIn(Auth.loggedIn());
  }, [loggedIn]);

  return (
    <>
      {loggedIn && (
        <a onClick={Auth.logout} className="text-white cursor-pointer bg-black p-2 hover:text-red-500 hover:bg-slate-700 hover:border-red-700 hover:scale-105 transition duration-500 rounded-lg border border-white">
          Logout
        </a>
      )}
    </>
  );
}
