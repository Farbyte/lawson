"use client";

import { Textarea } from "@/components/ui/textarea";
import { CornerRightUp, Plus } from "lucide-react";
import { UploadButton } from "../uploadthing";
import { uploadPdf } from "@/app/_hooks/uploadDocs";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { getLatestDocId } from "@/app/_hooks/getLatest";
import { useTabsStore } from "@/app/_store/tabsStore";

export const InputComp = () => {
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
        router.push(`/chat/${docId}`);
        console.log("Files: ", res[0].url);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );

  function extractId(url: string): string {
    const id = url.substring(6);
    return id !== "" ? id : "Not Loaded";
  }

  return (
    activeTab !== "summary" && (
      <div className="flex flex-col items-center justify-center">
        <div className="fixed bottom-2 w-full max-w-2xl">
          <form className="relative m-auto flex items-center gap-5 overflow-y-auto rounded-[26px] bg-[#2F2F2F] px-3 text-base md:px-5 lg:px-1 xl:px-5">
            <Uploadbutton />
            <Textarea
              className="min-w-0 flex-1 resize-none overflow-y-auto bg-[#2F2F2F] p-2 text-white placeholder-white outline-none focus:ring-0"
              placeholder="Ask me anything..."
              rows={1}
            />
            <button
              type="submit"
              className="flex rounded-sm border-none bg-transparent text-white transition duration-300 ease-in-out"
            >
              <CornerRightUp className="h-6 w-6" />
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-[#838E94]">
            Doc ID : {extractId(pathname)}
          </p>
        </div>
      </div>
    )
  );
};
