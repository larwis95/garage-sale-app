import HamburgerMenuLink from "./HamburgerMenuLink";
import HamburgerMenuLogout from "./HamburgerMenuLogout";

export default function HamburgerMenu({ ref }: any) {
  return (
    <div className={`h-50svh w-50svw hamburger-menu absolute flex flex-col justify-start gap-2 rounded-r-lg border-b border-r border-t border-red-700 bg-slate-700 bg-opacity-65 p-2 align-middle backdrop-blur-sm`} ref={ref}>
      <ul className="mt-12 flex flex-col">
        <HamburgerMenuLink href="/" text="Home" />
        <HamburgerMenuLink href="/sales" text="Sales" />
        <HamburgerMenuLink href="/profile" text="Profile" loggedInOnly />
        <HamburgerMenuLink href="/login" text="Login" loggedOutOnly />
        <HamburgerMenuLink href="/signup" text="Signup" loggedOutOnly />
        <HamburgerMenuLogout />
      </ul>
    </div>
  );
}
