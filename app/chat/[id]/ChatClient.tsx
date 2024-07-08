"use client";

import { useState } from "react";
import { InputComp } from "@/app/_components/input-comp";
import { Doc } from "@/app/_components/navbar-comp/NavSidebar";
import { Typebar } from "@/app/_components/typebar";
import { ChatComp } from "@/app/_components/chat-comp";

export default function ChatClient({ currentDoc }: { currentDoc: Doc }) {
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [markdownContent, setMarkdownContent] = useState("");
  const [error, setError] = useState("");

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
          fileUrl: currentDoc.fileUrl,
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

  return (
    <>
      <Typebar />
      <ChatComp
        isLoadingSummary={isLoadingSummary}
        markdownContent={markdownContent}
        error={error}
      />
      <InputComp fetchSummary={fetchSummary} />
    </>
  );
}
