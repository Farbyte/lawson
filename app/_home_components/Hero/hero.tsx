import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="px-10">
        <div>
          <p className="mb-4 text-center text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
            ✨ Open source forever
          </p>
          <h1 className="translate-y-[-1rem] text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text pb-2 pt-6 text-center text-5xl font-medium leading-none tracking-tighter text-transparent dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl">
            Read Court
            <br className="hidden md:block" /> Cases Faster.
          </h1>
          <p className="mt-10 text-center text-2xl text-gray-700 dark:text-gray-300">
            Just upload your{" "}
            <code className="text-blue-600 dark:text-orange-300">
              "Court Case"
            </code>{" "}
            pdf's and chat with it in seconds.
            <br /> Get a summary of a 1000 page case in seconds.
          </p>
        </div>
        <div className="mt-[50px] grid items-center justify-center">
          <Link
            href="/chat"
            className="flex transform items-center gap-2 rounded-md bg-white p-2 text-base text-black transition-all duration-150 hover:scale-105"
          >
            Get faster <MoveRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-24">
          <div className="mx-auto max-w-5xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image src="/landing-page.png" width={1000} height={500} alt="landing page" />
          </div>
        </div>
      </div>
    </>
  );
}
