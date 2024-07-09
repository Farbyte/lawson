"use client";

import { useEffect, useRef, useState } from "react";
import { InputComp } from "@/app/_components/input-comp";
import { Doc } from "@/app/_components/navbar-comp/NavSidebar";
import { Typebar } from "@/app/_components/typebar";
import { ChatComp } from "@/app/_components/chat-comp";
import { useTabsStore } from "@/app/_store/tabsStore";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import { useUser } from "@clerk/nextjs";

export default function ChatClient({ currentDoc }: { currentDoc: Doc }) {
  const { activeTab } = useTabsStore();
  const router = useRouter();
  const user = useUser();

  const [sourcesForMessages, setSourcesForMessages] = useState<Record<string, any>>({});
  const [error, setError] = useState("");

  const chatId = currentDoc.id;
  const pdfUrl = currentDoc.fileUrl;
  const userProfilePic = user.user?.imageUrl || "";

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    onResponse(response) {
      const sourcesHeader = response.headers.get("x-sources");

      const sources = sourcesHeader ? JSON.parse(atob(sourcesHeader)) : [];

      const messageIndexHeader = response.headers.get("x-message-index");
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages((prevSources) => ({
          ...prevSources,
          [messageIndexHeader]: sources,
        }));
      }
    },
    onError: (e) => {
      setError(e.message);
    },
    onFinish() {
      // Any additional actions on finish can be handled here
    },
  });

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleEnter = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit(e);
      }
    }
  };

  useEffect(() => {
    if (activeTab === "summary") {
      router.push(`/chat/summary/${currentDoc.id}`);
    }
  }, [activeTab, currentDoc.id, router]);

  return (
    <>
      <Typebar />
      <ChatComp
        isLoading={isLoading}
        messages={messages}
        sourcesForMessages={sourcesForMessages}
        userProfilePic={userProfilePic}
        messageListRef={messageListRef}
      />
      <InputComp
        handleSub={handleSubmit}
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        handleEnter={handleEnter}
        textAreaRef={textAreaRef}
        error={error}
      />
    </>
  );
}
