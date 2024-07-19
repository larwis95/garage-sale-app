"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Auth from "@/app/libs/auth/frontend";

interface INavLink {
  href: string;
  loggedInOnly?: boolean;
  loggedOutOnly?: boolean;
  text: string;
}

export default function HamburgerMenuLink({ href, loggedInOnly, loggedOutOnly, text }: INavLink) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    setLoggedIn(Auth.loggedIn());
  }, []);
  const pathname = usePathname();

  return (
    <>
      {loggedInOnly && loggedIn && (
        <Link href={href} className={`${pathname === href ? "pointer-events-none border-yellow-300 text-yellow-300" : "border-white hover:scale-105 hover:border-yellow-300 hover:text-yellow-300"} rounded-lg border-b transition duration-500 hover:border-r`}>
          {text}
        </Link>
      )}

      {loggedOutOnly && !loggedIn && (
        <Link href={href} className={`${pathname === href ? "pointer-events-none border-yellow-300 text-yellow-300" : "border-white hover:scale-105 hover:border-yellow-300 hover:text-yellow-300"} rounded-lg border-b transition duration-500 hover:border-r`}>
          {text}
        </Link>
      )}
      {loggedInOnly === undefined && loggedOutOnly === undefined && (
        <Link href={href} className={`${pathname === href ? "pointer-events-none border-yellow-300 text-yellow-300" : "border-white hover:scale-105 hover:border-yellow-300 hover:text-yellow-300"} rounded-lg border-b transition duration-500 hover:border-r`}>
          {text}
        </Link>
      )}
    </>
  );
}
