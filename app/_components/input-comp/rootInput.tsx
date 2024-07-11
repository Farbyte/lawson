"use client";

import { Textarea } from "@/components/ui/textarea";
import { CornerRightUp } from "lucide-react";
import { usePathname } from "next/navigation";

export const RootInput = () => {
  const pathname = usePathname();

  function extractId(url: string): string {
    const id = url.substring(14);
    return id !== "" ? id : "Not Loaded";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed bottom-2 w-full max-w-2xl">
        <form className="relative m-auto flex items-center gap-5 overflow-y-auto rounded-[26px] bg-[#2F2F2F] px-3 text-base md:px-5 lg:px-1 xl:px-5">
          <Textarea
            className="min-w-0 flex-1 resize-none overflow-y-auto bg-[#2F2F2F] p-2 text-white placeholder-white outline-none focus:ring-0"
            placeholder="Ask me anything..."
            rows={1}
            disabled={true}
          />
          <button
            type="submit"
            className="flex rounded-sm border-none bg-transparent text-white transition duration-300 ease-in-out"
            disabled={true}
          >
            <CornerRightUp className="h-6 w-6" />
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-[#838E94]">
          Doc ID : {extractId(pathname)}
        </p>
      </div>
    </div>
  );
};
