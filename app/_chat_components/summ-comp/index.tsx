"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useTabsStore } from "@/app/_store/tabsStore";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import LoadingDots from "./loading";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { Clipboard } from "lucide-react";

function downloadPDF(content: string) {
  console.log("creating PDF");
  if (content) {
    const doc = new jsPDF({
      orientation: "portrait",
      format: "a4",
    });
    doc.text(content, 10, 20, {
      maxWidth: 190,
      align: "left",
    });
    doc.loadFile;
    doc.save("summaryPDF");
  }
}

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
          <div className="md:mt-12 mt-2 flex flex-col items-start">
            <div className="flex items-center justify-between w-full pr-16">
              <div className="ml-4 border-b-2 text-lg">Summary </div>
              <button
                className="my-4 dark:bg-[#4e4c4c] bg-gray-200 text-black hover:bg-gray-300 dark:text-white dark:hover:bg-[#2F2F2F] p-2 rounded-md flex items-center gap-1 text-sm"
                onClick={() => downloadPDF(markdownContent)}
              >
                <Clipboard className="w-4 h-4" />
                Get PDF
              </button>
            </div>
            <ScrollArea className="h-[80vh] w-[80vw] p-4 pb-[6rem] lg:w-[60vw]">
              <ReactMarkdown>{markdownContent}</ReactMarkdown>
            </ScrollArea>
          </div>
        )}
        {error && toast.error(error, { duration: 2000, closeButton: true })}
      </div>
    )
  );
};
