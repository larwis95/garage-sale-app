"use client";
import NavLink from "./NavLink";
import LogOutButton from "./LogOutButton";
import { useState, useEffect, useRef } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { AnimatePresence } from "framer-motion";

const Links = [
  { href: "/", text: "Home" },
  { href: "/sales", text: "Sales" },
  { href: "/profile", text: "Profile", loggedInOnly: true },
  { href: "/login", text: "Login", loggedOutOnly: true },
  { href: "/signup", text: "Signup", loggedOutOnly: true },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const navRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !(navRef.current as HTMLElement).contains(event.target as Node)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 60);
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`${isScrolled ? "fixed top-5" : "absolute left-4"} top-5 z-50`}>
      {!isScrolled && (
        <nav>
          <ul className="flex flex-row items-center justify-center gap-2">
            {Links.map((link, index) => (
              <li key={index}>
                <NavLink href={link.href} loggedInOnly={link.loggedInOnly} loggedOutOnly={link.loggedOutOnly} text={link.text} />
              </li>
            ))}
            <li>
              <LogOutButton />
            </li>
          </ul>
        </nav>
      )}
      {isScrolled && (
        <nav className="relative z-50 flex h-fit w-fit flex-col items-start gap-2" ref={navRef}>
          {!isOpened && (
            <button onClick={() => setIsOpened(!isOpened)} className="ml-3 mt-4 flex h-8 w-8 flex-col items-center justify-center rounded-full border border-white bg-black p-2 text-white transition duration-500 hover:scale-110 hover:border-red-700 hover:bg-slate-700 hover:text-red-500">
              ☰
            </button>
          )}
          {isOpened && (
            <button onClick={() => setIsOpened(!isOpened)} className="z-50 ml-3 mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-black p-2 text-white transition duration-500 hover:scale-110 hover:border-red-700 hover:bg-slate-700 hover:text-red-500">
              X
            </button>
          )}
          <AnimatePresence mode="wait">{isOpened && <HamburgerMenu />}</AnimatePresence>
        </nav>
      )}
    </header>
  );
}
