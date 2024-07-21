import Logo from "@/components/ui/logo";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="px-8 text-[0.65rem]">
      <div className="mx-auto mt-36 grid max-w-7xl grid-cols-1 gap-8 border-t py-12 dark:border-white/[0.2] lg:grid-cols-5 lg:gap-4">
        <div className="col-span-3 flex flex-col justify-between space-y-2">
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Link className="text-foreground" href="/">
                  <Logo type="iconAndText" colorTheme="light" />
                </Link>
              </div>
              <div>
                <div className="focus:ring-ring text-foreground mb-2 ml-2 inline-flex items-center rounded-md border-[0.5px] px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-white/[0.2]">
                  <div className="relative mr-2 flex items-center justify-center">
                    <div className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400"></div>
                    <div className="relative h-2 w-2 rounded-full bg-emerald-500"></div>
                  </div>
                  Status: Operational
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">Made by Farbyte.</p>
          </div>
          <div>
            <p className="text-muted-foreground mt-2 text-xs">
              Lawson can make mistakes. Check the important information.
            </p>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <h4 className="text-md font-semibold">Product</h4>
            <ul className="space-y-1 text-sm leading-7">
              <li className="">
                <a href="/docs">User Manual</a>
              </li>
              <li className="">
                <a href="/faq">FAQ</a>
              </li>
              <li className="">
                <a href="/setting-up-locally">Setting Up</a>
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h4 className="text-md font-semibold">Made By</h4>
            <ul className="space-y-1 text-sm leading-7">
              <li className="white-sp text-muted-foreground flex flex-col">
                <a
                  href="https://github.com/Farbyte"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Farbyte
                </a>
                <a
                  href="https://github.com/AvaterClasher"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <div className="flex gap-1">
                    Soumyadip<div className="hidden md:block"> Moni</div>
                  </div>
                </a>
                <a
                  href="https://github.com/FaYMan2"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Svarn Vats
                </a>
                <a
                  href="https://github.com/Krushna-sahoo"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Krushna Sahoo
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h4 className="text-md font-semibold">Developers</h4>
            <ul className="space-y-1 text-sm leading-7">
              <li className="">
                <a
                  href="https://github.com/Farbyte/lawson"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
