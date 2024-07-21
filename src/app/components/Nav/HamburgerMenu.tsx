import HamburgerMenuLink from "./HamburgerMenuLink";
import HamburgerMenuLogout from "./HamburgerMenuLogout";
import { motion } from "framer-motion";

export default function HamburgerMenu() {
  return (
    <motion.div className={`h-50svh w-50svw absolute flex flex-col justify-start gap-2 rounded-r-lg border-b border-r border-t border-yellow-300 bg-slate-700 bg-opacity-65 p-2 align-middle backdrop-blur-sm`} initial={{ x: "-100vw" }} animate={{ x: 0 }} exit={{ x: "-100vw" }} transition={{ duration: 0.5 }}>
      <ul className="mt-12 flex flex-col">
        <HamburgerMenuLink href="/" text="Home" />
        <HamburgerMenuLink href="/sales" text="Sales" />
        <HamburgerMenuLink href="/profile" text="Profile" loggedInOnly />
        <HamburgerMenuLink href="/login" text="Login" loggedOutOnly />
        <HamburgerMenuLink href="/signup" text="Signup" loggedOutOnly />
        <HamburgerMenuLogout />
      </ul>
    </motion.div>
  );
}
