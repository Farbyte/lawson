"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CornerRightUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import { useTabsStore } from "@/app/_store/tabsStore";
import { Doc } from "../navbar-comp/NavSidebar";

export const ChatComp = ({ currentDoc }: { currentDoc: Doc }) => {
  const pathname = usePathname();
  const { activeTab } = useTabsStore();

  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [error, setError] = useState("");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const fetchSummary = async (
    type: "large" | "small" | "custom",
    prompt: string,
  ) => {
    setIsLoadingSummary(true);
    try {
      const response = await fetch(`/api/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileUrl: "your-pdf-url", // Replace with your actual PDF URL
          type: type,
          prompt: prompt,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setMarkdownContent(data.result);
      } else {
        setError("Failed to fetch summary");
      }
    } catch (e) {
      setError("Failed to fetch summary");
    } finally {
      setIsLoadingSummary(false);
    }
  };

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
