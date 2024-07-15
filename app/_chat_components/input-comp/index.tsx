"use client";

import { Textarea } from "@/components/ui/textarea";
import { CornerRightUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTabsStore } from "@/app/_store/tabsStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

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

  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  function extractId(url: string): string {
    const check = url.substring(0, 14);
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
            className="relative m-auto flex items-center gap-5 overflow-y-auto rounded-[26px] bg-[#F4F4F4] px-3 text-base dark:bg-[#2F2F2F] md:px-5 lg:px-1 xl:px-5"
            onSubmit={(e) => handleSub(e)}
          >
            <Textarea
              className="min-w-0 flex-1 resize-none overflow-y-auto bg-[#F4F4F4] p-2 text-black outline-none focus:ring-0 dark:bg-[#2F2F2F] dark:text-white"
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
              className="flex rounded-sm border-none bg-transparent text-black transition duration-300 ease-in-out dark:text-white"
            >
              <CornerRightUp className="h-6 w-6" />
            </button>
          </form>
        ) : (
          <div className="relative flex min-w-0 max-w-2xl items-center justify-center gap-1 rounded-[26px] text-base">
            <Button
              onClick={() => handlefetchSummary("large", "")}
              className="bg-slate-100"
            >
              Large Summary
            </Button>
            <Button
              onClick={() => handlefetchSummary("small", "")}
              className="bg-slate-100"
            >
              Small Summary
            </Button> 
            <Sheet key="bottom">
              <SheetTrigger asChild>
                <Button className="bg-slate-100">Custom Prompt</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Custom Prompt</SheetTitle>
                  <SheetDescription>
                    Add custom prompt here to pass on to the AI while evaluating
                    your document.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Textarea
                    className="dark:bg-[#212121] bg-gray-200 text-black outline-none focus:ring-0 dark:text-white "
                    rows={5}
                    value={textareaValue}
                    onChange={handleTextareaChange}
                  />
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button
                      type="submit"
                      onClick={() => {
                        handlefetchSummary("custom", textareaValue);
                      }}
                    >
                      Save changes
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        )}
        <p className="mt-4 text-center text-xs text-gray-700 dark:text-[#838E94]">
          Doc ID : {extractId(pathname)}
        </p>
      </div>
    </div>
  );
};
