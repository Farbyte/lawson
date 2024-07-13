import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 mb-20 shadow-sm dark:bg-black/80">
      <div className="] flex items-center justify-between px-5">
        {/* Logo */}
        <div>
          <div className="block md:hidden">{/* Mobile menu */}</div>
        </div>
        <ul className="hidden space-x-10 py-3 md:flex">
          <Link href="/docs" className="px-1 py-2">
            Docs
          </Link>
          <SignInButton children="Login" />
          <div className="rounded-md bg-[#262626] px-3 py-2 text-white">
            <SignUpButton children="Sign Up" />
          </div>
        </ul>
      </div>
    </nav>
  );
}
