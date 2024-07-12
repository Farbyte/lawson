"use client";

import { use, useEffect, useState } from "react";
import { InputComp } from "@/app/_components/input-comp";
import { Doc } from "@/app/_components/navbar-comp/NavSidebar";
import { Typebar } from "@/app/_components/typebar";
import { SummComp } from "@/app/_components/summ-comp";
import { useTabsStore } from "@/app/_store/tabsStore";
import { useRouter } from "next/navigation";
import { fetchSummary } from "@/app/_hooks/fetchSummary";
import { vectorStore } from "@/app/_hooks/vectorStore";

export default function SummaryClient({ currentDoc }: { currentDoc: Doc }) {
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [error, setError] = useState("");
  const { activeTab } = useTabsStore();
  const router = useRouter();

  useEffect(() => {
    if (activeTab === "chat") {
      console.log("useEffect",currentDoc.fileUrl, currentDoc.id);
       vectorStore(currentDoc.fileUrl, currentDoc.id);
      router.push(`/chat/chatting/${currentDoc.id}`);
    }
  }, [activeTab]);

  const handleFetchSummary = (type: "large" | "small" | "custom", prompt: string) => {
    fetchSummary(type, prompt, setIsLoadingSummary, setMarkdownContent, setError, currentDoc);
  };

  return (
    <>
      <Typebar />
      <SummComp
        isLoadingSummary={isLoadingSummary}
        markdownContent={markdownContent}
        error={error}
      />
      <InputComp handlefetchSummary={handleFetchSummary} />
    </>
  );
}
