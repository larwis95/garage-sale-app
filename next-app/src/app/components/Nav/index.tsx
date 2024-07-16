"use client";
import NavLink from "./NavLink";
import LogOutButton from "./LogOutButton";
import Auth from "@/app/libs/auth/frontend";

const Links = [
  { href: "/", text: "Home" },
  { href: "/sales", text: "Sales" },
  { href: "/profile", text: "Profile", loggedInOnly: true },
  { href: "/login", text: "Login", loggedOutOnly: true },
  { href: "/signup", text: "Signup", loggedOutOnly: true },
];

export default function Nav() {
  return (
    <header className="absolute top-5">
      <nav>
        <ul className="flex flex-row gap-2 justify-center items-center">
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
    </header>
  );
}
