import Logo from "@/components/ui/logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 mb-20 bg-white/90 shadow-sm backdrop-blur-xl dark:bg-black/60">
      <div className="] flex items-center justify-between px-5">
        <Logo type="iconAndText" colorTheme="light"/>
        <div>
          <div className="block md:hidden">{/* Mobile menu */}</div>
        </div>
        <ul className="hidden space-x-10 py-3 md:flex mr-5">
          <Link href="https://github.com/Farbyte/lawson" target="_blank" rel="noreferrer noopener" className="py-2"><Github/></Link>
          <Link href="/docs" className="py-2">
            Docs
          </Link>
          <div className="rounded-md bg-[#262626] px-3 py-2 text-white">
            <SignInButton children="Login" forceRedirectUrl="/chat"/>
          </div>
        </ul>
      </div>
    </nav>
  );
}
