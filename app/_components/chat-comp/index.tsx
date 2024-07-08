"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useTabsStore } from "@/app/_store/tabsStore";

export const ChatComp = ({
  isLoadingSummary,
  markdownContent,
  error,
}: {
  isLoadingSummary: boolean;
  markdownContent: string;
  error: string;
}) => {
  const { activeTab } = useTabsStore();

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
