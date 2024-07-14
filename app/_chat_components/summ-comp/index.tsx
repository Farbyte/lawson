"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useTabsStore } from "@/app/_store/tabsStore";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import LoadingDots from "./loading";

export const SummComp = ({
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
            <LoadingDots />
          </div>
        )}
        {markdownContent && (
          <div className="mt-12 flex flex-col items-start">
            <div className="ml-4 border-b-2">Summary </div>
            <ScrollArea className="h-[80vh] w-[80vw] p-4 pb-[6rem] lg:w-[40vw]">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </ScrollArea>
          </div>
        )}
        {error && toast.error(error, { duration:2000 ,closeButton: true })}
      </div>
    )
  );
};
