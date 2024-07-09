"use client";

import { Textarea } from "@/components/ui/textarea";
import { CornerRightUp, Plus } from "lucide-react";
import { UploadButton } from "../uploadthing";
import { uploadPdf } from "@/app/_hooks/uploadDocs";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { getLatestDocId } from "@/app/_hooks/getLatest";
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
  const user = useUser();

  const router = useRouter();

  const pathname = usePathname();

  const { activeTab } = useTabsStore();

  const Uploadbutton = () => (
    <UploadButton
      className="ut-allowed-content:hidden"
      endpoint="pdfUploader"
      content={{
        button({ ready }) {
          if (ready) return <Plus className="h-5 w-5" />;
          else return <Plus className="h-5 w-5" />;
        },
      }}
      appearance={{ button: "bg-transparent w-6 h-6" }}
      config={{ mode: "auto" }}
      onClientUploadComplete={async (res) => {
        await uploadPdf(res[0].url, res[0].name);
        const userId = await user.user?.id;
        const docId = await getLatestDocId(userId);
        router.push(`/chat/summary/${docId}`);
        console.log("Files: ", res[0].url);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );

  function extractId(url: string): string {
    const id = url.substring(14);
    return id !== "" ? id : "Not Loaded";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="fixed bottom-2 w-full max-w-2xl">
        {activeTab !== "summary" ? (
          <form
            className="relative m-auto flex items-center gap-5 overflow-y-auto rounded-[26px] bg-[#2F2F2F] px-3 text-base md:px-5 lg:px-1 xl:px-5"
            onSubmit={(e) => handleSub(e)}
          >
            <Uploadbutton />
            <Textarea
              className="min-w-0 flex-1 resize-none overflow-y-auto bg-[#2F2F2F] p-2 text-white placeholder-white outline-none focus:ring-0"
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
              className="flex rounded-sm border-none bg-transparent text-white transition duration-300 ease-in-out"
            >
              <CornerRightUp className="h-6 w-6" />
            </button>
          </form>
        ) : (
          <div className="relative flex min-w-0 max-w-2xl items-center justify-center gap-1 rounded-[26px] text-base">
            <Button onClick={() => handlefetchSummary("large", "")}>
              Large Summary
            </Button>
            <Button onClick={() => handlefetchSummary("small", "")}>
              Small Summary
            </Button>
            <Button onClick={() => handlefetchSummary("custom", "Our custom prompt")}>
              Custom Summary
            </Button>
          </div>
        )}
        <p className="mt-4 text-center text-xs text-[#838E94]">
          Doc ID : {extractId(pathname)}
        </p>
      </div>
    </div>
  );
};
