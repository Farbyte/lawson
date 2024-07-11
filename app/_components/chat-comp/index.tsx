"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useTabsStore } from "@/app/_store/tabsStore";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatCompProps {
  isLoading: boolean;
  messages: any[];
  sourcesForMessages: Record<string, any>;
  userProfilePic: string;
  messageListRef: React.RefObject<HTMLDivElement>;
}

export const ChatComp = ({
  isLoading,
  messages,
  sourcesForMessages,
  userProfilePic,
  messageListRef,
}: ChatCompProps) => {
  const { activeTab } = useTabsStore();
  console.log("messages", messages);

  return (
    activeTab === "chat" && (
      <div className="align-center mx-auto flex h-[75vh] w-[80vw] flex-col justify-between pb-[9rem]">
        <div
          className={`bg-background flex h-[77vh] w-full items-center justify-center sm:h-[77vh]`}
        >
          <div
            ref={messageListRef}
            className="mt-4 h-full w-full overflow-y-scroll rounded-md scrollbar-hide"
          >
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center text-xl">
                Ask your first question below !
              </div>
            )}
            <ScrollArea>
              {messages.map((message, index) => {
                const sources = sourcesForMessages[index] || undefined;
                const isLastMessage =
                  !isLoading && index === messages.length - 1;
                const previousMessage = index !== messages.length - 1;
                return (
                  <div key={`chatMessage-${index}`}>
                    <div
                      className={`text-foreground animate p-4 ${
                        message.role === "assistant"
                          ? "bg-background/50"
                          : isLoading && index === messages.length - 1
                            ? "bg-background animate-pulse"
                            : "bg-background"
                      }`}
                    >
                      <div className="flex">
                        <img
                          key={index}
                          src={
                            message.role === "assistant"
                              ? "/bot.png"
                              : userProfilePic
                          }
                          alt="profile image"
                          width={message.role === "assistant" ? 33 : 33}
                          height={30}
                          className="mr-4 h-full rounded-sm"
                        />
                        <ReactMarkdown className="prose">
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  );
};
