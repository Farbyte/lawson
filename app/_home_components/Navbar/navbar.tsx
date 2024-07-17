import Logo from "@/components/ui/logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 mb-20 bg-white/90 shadow-sm backdrop-blur-xl dark:bg-black/60">
      <div className="ml-6 flex items-center justify-between px-5">
        <div className="hidden md:block">
          <Logo type="iconAndText" colorTheme="light" />
        </div>
        <div className="block md:hidden">
          <Logo type="icon" colorTheme="light" />
        </div>
        <ul className="mr-5 flex gap-6 py-2 md:space-x-10 md:py-3">
          <Link
            href="https://github.com/Farbyte/lawson"
            target="_blank"
            rel="noreferrer noopener"
            className="py-2"
          >
            <Github />
          </Link>
          <Link href="/faq" className="py-2">
            Faq
          </Link>
          <div className="flex rounded-md bg-[#262626] px-2 text-center text-white md:px-3 py-2">
            <a href="/chat">Login</a>
          </div>
        </ul>
      </div>
    </nav>
  );
}
