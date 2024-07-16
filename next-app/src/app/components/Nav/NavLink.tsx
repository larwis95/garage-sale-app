import Link from "next/link";
import { usePathname } from "next/navigation";
import Auth from "@/app/libs/auth/frontend";
import { useEffect, useState } from "react";

interface INavLink {
  href: string;
  loggedInOnly?: boolean;
  loggedOutOnly?: boolean;
  text: string;
}

export default function NavLink({ href, loggedInOnly, loggedOutOnly, text }: INavLink) {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  const pathname = usePathname();
  useEffect(() => {
    setLoggedIn(Auth.loggedIn());
  }, [loggedIn]);

  return (
    <>
      {loggedInOnly && loggedIn && (
        <Link href={href} className={`${pathname === href ? "text-red-600 bg-black pointer-events-none" : "text-white bg-black"} p-2 hover:text-red-500 hover:bg-slate-700 hover:border-red-700 hover:scale-105 transition duration-500 rounded-lg border border-white`}>
          {text}
        </Link>
      )}

      {loggedOutOnly && !loggedIn && (
        <Link href={href} className={`${pathname === href ? "text-red-600 bg-black pointer-events-none" : "text-white bg-black"} p-2 hover:text-red-500 hover:bg-slate-700 hover:scale-105 hover:border-red-700 transition duration-500 rounded-lg border border-white`}>
          {text}
        </Link>
      )}
      {loggedInOnly === undefined && loggedOutOnly === undefined && (
        <Link href={href} className={`${pathname === href ? "text-red-600 bg-black pointer-events-none" : "text-white bg-black"} p-2 hover:text-red-500 hover:bg-slate-700 hover:scale-105 hover:border-red-700 transition duration-500 rounded-lg border border-white`}>
          {text}
        </Link>
      )}
    </>
  );
}
