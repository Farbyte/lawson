"use client";

import { Textarea } from "@/components/ui/textarea";
import { CornerRightUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTabsStore } from "@/app/_store/tabsStore";
import { Button } from "@/components/ui/button";

interface InputCompProps {
  handlefetchSummary?: (
    type: "large" | "small" | "custom",
    prompt: string,
  ) => void;
  handleSub?: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  input?: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  textAreaRef?: React.RefObject<HTMLTextAreaElement>;
  error?: string;
}

export const InputComp = ({
  handlefetchSummary = async () => {},
  handleSub = async () => {},
  isLoading,
  input,
  handleInputChange,
  handleEnter,
  textAreaRef,
  error,
}: InputCompProps) => {
  const pathname = usePathname() ?? "";

  const { activeTab } = useTabsStore();

  function extractId(url: string): string {
    const check = url.substring(0,14);
    if (check === "/chat/summary/") {
      const id = url.substring(14);
      return id !== "" ? id : "Not Loaded";
    } else {
      const id = url.substring(15);
      return id !== "" ? id : "Not Loaded";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed bottom-2 w-full max-w-2xl">
        {activeTab !== "summary" ? (
          <form
            className="relative m-auto flex items-center gap-5 overflow-y-auto rounded-[26px] bg-[#F4F4F4] dark:bg-[#2F2F2F] px-3 text-base md:px-5 lg:px-1 xl:px-5"
            onSubmit={(e) => handleSub(e)}
          >
            <Textarea
              className="min-w-0 flex-1 resize-none overflow-y-auto bg-[#F4F4F4] dark:bg-[#2F2F2F] dark:text-white p-2 text-black outline-none focus:ring-0"
              placeholder={
                isLoading ? "Waiting for response..." : "Ask me anything..."
              }
              ref={textAreaRef}
              autoFocus={false}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleEnter}
              maxLength={512}
              id="userInput"
              name="userInput"
              rows={1}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex rounded-sm border-none bg-transparent text-black dark:text-white transition duration-300 ease-in-out"
            >
              <CornerRightUp className="h-6 w-6" />
            </button>
          </form>
        ) : (
          <div className="relative flex min-w-0 max-w-2xl items-center justify-center gap-1 rounded-[26px] text-base">
            <Button onClick={() => handlefetchSummary("large", "")} className="bg-slate-100">
              Large Summary
            </Button>
            <Button onClick={() => handlefetchSummary("small", "")} className="bg-slate-100">
              Small Summary
            </Button>
            <Button
              onClick={() => handlefetchSummary("custom", "Our custom prompt")}
              className="bg-slate-100"
            >
              Custom Summary
            </Button>
          </div>
        )}
        <p className="mt-4 text-center text-xs text-gray-700 dark:text-[#838E94]">
          Doc ID : {extractId(pathname)}
        </p>
      </div>
    </div>
  );
};
