"use client";

import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { useTabsStore } from "@/app/_store/tabsStore";
import { Doc } from "../navbar-comp/NavSidebar";

export const ChatComp = ({
  isLoadingSummary,
  markdownContent,
  error,
}: {
  isLoadingSummary: boolean;
  markdownContent: string;
  error: string;
}) => {
  const pathname = usePathname();
  const { activeTab } = useTabsStore();

  function extractId(url: string): string {
    const id = url.substring(6);
    return id !== "" ? id : "Not Loaded";
  }

  return (
    activeTab === "summary" && (
      <div className="flex flex-col items-center justify-center">
        <div className="fixed bottom-2 w-full max-w-2xl">
          {/* to be done */}
        </div>
        {isLoadingSummary && (
          <div className="flex items-center justify-center">
            <div>Loading...</div>
            {/* <LoadingDots color="#000" style="large" /> */}
          </div>
        )}
        {markdownContent && (
          <ScrollArea className="mt-4 h-full w-full rounded-md border p-4">
            {markdownContent}
          </ScrollArea>
        )}
        {error && (
          <div className="mt-4 rounded-md border border-red-400">
            <p className="text-red-500">{error}</p>
          </div>
        )}
      </div>
    )
  );
};
