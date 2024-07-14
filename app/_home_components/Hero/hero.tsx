import { BorderBeam } from "@/components/ui/border-beam";
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
            <code className="dark:text-red-400">
              "Judgements"
            </code>{" "}
            pdf and chat with it in seconds.
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
        <div className="mx-auto max-w-7xl">
          <div className="relative mt-32 rounded-xl before:absolute before:top-0 before:left-0 before:w-full before:h-[20%] before:content-[''] before:bg-gradient-to-b before:from-[rgba(136,19,55,0.8)] before:via-[rgba(136,19,55,0.8)] before:to-transparent before:blur-[70px] before:opacity-100 before:pointer-events-none after:absolute after:bottom-0 after:left-0 after:w-full after:h-[25%] after:content-[''] after:bg-gradient-to-t after:from-black after:via-black/50 after:to-transparent after:opacity-100 after:pointer-events-none after:z-20" style={{perspective: "2000px"}}>
            <Image
              src="/landing-page.png"
              width={1000}
              height={500}
              alt="landing page"
              className="block w-full h-auto rounded-xl object-contain relative z-2 glow-image"
            />
            <BorderBeam className="z-10" size={250} duration={12} delay={9} />
          </div>
        </div>
      </div>
    </>
  );
}
