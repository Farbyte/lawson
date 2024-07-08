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
        {isLoadingSummary && (
          <div className="flex items-center justify-center">
            <div>Loading...</div>
            {/* <LoadingDots color="#000" style="large" /> */}
          </div>
        )}
        {markdownContent && (
          <div className="flex flex-col items-start mt-12">
            <div className="ml-4 border-b-2">Summary </div>
            <ScrollArea className="h-[80vh] w-[80vw] p-4 pb-[6rem] lg:w-[40vw]">
              {markdownContent}
            </ScrollArea>
          </div>
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
