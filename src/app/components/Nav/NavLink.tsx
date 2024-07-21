"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Auth from "@/app/libs/auth/frontend";
import { useState, useEffect } from "react";

interface INavLink {
  href: string;
  loggedInOnly?: boolean;
  loggedOutOnly?: boolean;
  text: string;
}

export default function NavLink({ href, loggedInOnly, loggedOutOnly, text }: INavLink) {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(false);
  const pathname = usePathname();
  useEffect(() => {
    setLoggedIn(Auth.loggedIn());
  }, []);

  return (
    <>
      {loggedInOnly && loggedIn && (
        <Link href={href} className={`${pathname === href ? "pointer-events-none bg-black text-yellow-300" : "bg-black text-white"} rounded-lg border border-white p-2 transition duration-500 hover:scale-105 hover:border-yellow-300 hover:bg-slate-700 hover:text-yellow-300`}>
          {text}
        </Link>
      )}

      {loggedOutOnly && !loggedIn && (
        <Link href={href} className={`${pathname === href ? "pointer-events-none bg-black text-yellow-300" : "bg-black text-white"} rounded-lg border border-white p-2 transition duration-500 hover:scale-105 hover:border-yellow-300 hover:bg-slate-700 hover:text-yellow-300`}>
          {text}
        </Link>
      )}
      {loggedInOnly === undefined && loggedOutOnly === undefined && (
        <Link href={href} className={`${pathname === href ? "pointer-events-none bg-black text-yellow-300" : "bg-black text-white"} rounded-lg border border-white p-2 transition duration-500 hover:scale-105 hover:border-yellow-300 hover:bg-slate-700 hover:text-yellow-300`}>
          {text}
        </Link>
      )}
    </>
  );
}
